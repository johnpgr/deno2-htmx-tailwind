.PHONY: all http tailwind

all: http tailwind

http:
	deno run --watch -A ./src/main.ts

# Run Tailwind CSS
tailwind:
	tailwindcss -i ./styles.css -o ./public/styles.css --watch

