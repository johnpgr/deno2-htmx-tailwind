import type { Children } from "@http/jsx-stream/types"
import { HeaderBar } from "components/header.tsx"

export function Page(props: {
    req: Request
    title: string
    children: Children
}) {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="stylesheet" href="/global.css" />
                <script src="https://unpkg.com/htmx.org@2.0.3" />
                <script src="https://unpkg.com/htmx-ext-response-targets@2.0.0/response-targets.js" />
                <script defer src="/lucide.js" />
                <script defer src="/auto-refresh.js" />
                <title>{props.title}</title>
            </head>
            <body>
                <HeaderBar req={props.req} />
                {props.children}
            </body>
        </html>
    )
}
