import { html } from "./utils.ts";

export const Layout = (children: string) => html`
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            >
            <link rel="icon" type="image/svg+xml" href="/logo.svg">
            <link rel="stylesheet" href="/styles.css">
            <script src="https://unpkg.com/htmx.org@2.0.3"></script>
            <title>Index page</title>
        </head>
        <body>
            ${children}
        </body>
    </html>
`;
