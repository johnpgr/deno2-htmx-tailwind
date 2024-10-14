// Source: https://github.com/jollytoad/home/blob/main/app/lib/handle_route_browser_dir.ts
import { bundle } from "@deno/emit"

/**
 * Experimental on the fly transpilation of TS modules for the browser.
 *
 * Has yet to be rigorously tested with module graphs.
 */
export async function GET(_req: Request, match: URLPatternResult) {
    const fileUrl = getFileUrl(match)

    try {
        const emitted = await bundle(fileUrl)
        const { code } = emitted

        return new Response(code, {
            headers: {
                "Content-Type": "text/javascript",
            },
        })
    } catch (e: unknown) {
        if (e instanceof Error && e.message.includes("Module not found")) {
            return null
        } else {
            console.error(e)
            return new Response(
                `Failed to transpile: ${fileUrl}\n\n` + String(e),
                { status: 500, statusText: "Internal Server Error" },
            )
        }
    }
}

function getFileUrl(match: URLPatternResult): string {
    const pre = match.pathname.groups.pre ?? ""
    const path = match.pathname.groups.path ?? ""
    return import.meta.resolve(`../../app/routes${pre}browser/${path}.ts`)
}
