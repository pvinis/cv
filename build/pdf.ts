/**
 * Builds the PDF from cv.md.
 *
 * cv.md is the single source. The web version is served by md.quad.codes; this
 * renders the same markdown through build/print.css and prints it with headless
 * Chrome, so the PDF keeps real selectable text and live hyperlinks.
 *
 *   bun run build/pdf.ts                 # render cv.md -> Pavlos-Vinieratos-CV.pdf
 *   bun run build/pdf.ts --strict        # ...and fail if any ‹fill: ...› remains
 *   bun run build/pdf.ts --from-url      # print the live md.quad.codes page instead
 */

import { chromium } from "playwright"
import MarkdownIt from "markdown-it"
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const repo = resolve(here, "..")

const args = process.argv.slice(2)
const flag = (name: string) => args.includes(`--${name}`)
const value = (name: string, fallback: string) =>
	args.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=") ?? fallback

const strict = flag("strict")
/** Emit GitHub Actions warning annotations for unfilled placeholders. */
const annotate = flag("annotate")
const fromUrl = flag("from-url")
const liveUrl = value("url", "https://md.quad.codes/cv")
const out = resolve(repo, value("out", fromUrl ? "build/out/from-url.pdf" : "Pavlos-Vinieratos-CV.pdf"))

/** Strips the YAML frontmatter md.quad.codes uses for page metadata. */
const splitFrontmatter = (raw: string) => {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
	if (!match) return { meta: {} as Record<string, string>, body: raw }
	const meta: Record<string, string> = {}
	for (const line of match[1].split(/\r?\n/)) {
		const kv = line.match(/^([\w-]+):\s*(.*)$/)
		if (kv) meta[kv[1]] = kv[2].trim()
	}
	return { meta, body: raw.slice(match[0].length) }
}

/** `‹fill: something›` markers left in the draft. */
const PLACEHOLDER = /‹fill:\s*([^›]*)›/g

const buildHtml = () => {
	const raw = readFileSync(resolve(repo, "cv.md"), "utf8")
	const { meta, body } = splitFrontmatter(raw)

	const found = [...body.matchAll(PLACEHOLDER)].map((m) => m[1].trim())
	if (found.length) {
		console.warn(`\n  ${found.length} unfilled placeholder${found.length === 1 ? "" : "s"} in cv.md:`)
		for (const f of found) console.warn(`    ‹fill: ${f}›`)
		if (annotate) {
			for (const f of found) {
				console.log(`::warning file=cv.md::Unfilled placeholder: ${f}`)
			}
		}
		if (strict) {
			console.error("\n  --strict: refusing to build a PDF with placeholders in it.\n")
			process.exit(1)
		}
		console.warn("  Rendering them highlighted. Run with --strict to make this fatal.\n")
	}

	const md = new MarkdownIt({ html: true, linkify: true, typographer: true })
	let rendered = md.render(body)

	// Highlight the markers, and honour `<!-- pagebreak -->` as a hard page break.
	rendered = rendered
		.replace(PLACEHOLDER, (_, text) => `<span class="placeholder">${text}</span>`)
		.replace(/<!--\s*pagebreak\s*-->/g, '<div class="pagebreak"></div>')

	const css = readFileSync(resolve(here, "print.css"), "utf8")

	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${meta.title ?? "CV"}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body>
${rendered}
</body>
</html>
`
}

const browser = await chromium.launch()
const page = await browser.newPage()

if (fromUrl) {
	console.log(`  printing live page: ${liveUrl}`)
	await page.goto(liveUrl, { waitUntil: "networkidle" })
	// The viewer renders client-side; wait for real content, not just the shell.
	await page.waitForSelector("h1", { timeout: 20_000 })
} else {
	const html = buildHtml()
	if (flag("html")) writeFileSync(resolve(repo, "build/out/cv.html"), html)
	await page.setContent(html, { waitUntil: "networkidle" })
	await page.evaluate(() => document.fonts.ready)

	// The webfont comes from Google Fonts. If it ever fails to load, Chrome
	// silently falls back and the PDF reflows — better to stop than to publish it.
	const fontLoaded = await page.evaluate(() => document.fonts.check('600 1rem "Source Sans 3"'))
	if (!fontLoaded) {
		console.error("\n  Source Sans 3 did not load; refusing to build with a fallback font.\n")
		process.exit(1)
	}
}

await page.pdf({
	path: out,
	format: "A4",
	printBackground: true,
	preferCSSPageSize: !fromUrl,
	// The live page has no @page rule of its own, so give it sane paper margins.
	margin: fromUrl ? { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" } : undefined,
})

await browser.close()

const pages = readFileSync(out).toString("latin1").match(/\/Type\s*\/Page[^s]/g)?.length ?? 0
console.log(`  wrote ${out.replace(repo + "/", "")} (${pages} page${pages === 1 ? "" : "s"})`)
