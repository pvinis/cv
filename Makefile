.PHONY: all

CC = xelatex

all: cv

cv: cv.tex cv/*.tex
	$(CC) $<
	mv cv.pdf Pavlos-Vinieratos-CV.pdf

coverletter: coverletter.tex
	$(CC) $<
	mv coverletter.pdf Pavlos-Vinieratos-CoverLetter.pdf

clean:
	rm -rf *.aux *.lof *.log *.lot *.fls *.out *.toc
