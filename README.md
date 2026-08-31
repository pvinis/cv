# CV

[![CV](https://img.shields.io/badge/CV-pdf-green.svg)](https://github.com/pvinis/cv/raw/main/Pavlos-Vinieratos-CV.pdf)

[`cv.md`](cv.md) is the source. Everything else is generated from it.

- **Web** — served by [md.quad.codes](https://md.quad.codes/cv).
- **PDF** — [Pavlos-Vinieratos-CV.pdf](https://github.com/pvinis/cv/raw/main/Pavlos-Vinieratos-CV.pdf), rebuilt by CI on every change to `cv.md`.

## Building the PDF

```sh
bun install
bunx playwright install chromium
bun run pdf
```

`cv.md` is rendered to HTML with [`build/print.css`](build/print.css) and printed by headless
Chrome, so the PDF keeps selectable text and working hyperlinks.

| command | does |
| --- | --- |
| `bun run pdf` | build the PDF |
| `bun run pdf:strict` | build, but fail if any `‹fill: …›` placeholder is left in `cv.md` |
| `bun run pdf:from-url` | print the live md.quad.codes page instead, for comparison |

Run `pdf:strict` before sending the CV anywhere — placeholders render as loud red boxes
rather than silently shipping.

Page breaks are handled in `build/print.css`. To force one, put `<!-- pagebreak -->` in `cv.md`.
