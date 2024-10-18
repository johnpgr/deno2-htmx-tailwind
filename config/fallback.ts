import { renderBody } from "@http/jsx-stream/serialize"

export function fallbackHandler() {
    const defaultNotFound = new Response("Not Found", { status: 404 })

    return async () => {
        try {
            return new Response(
                renderBody(
                    (await import("../app/routes/_404.tsx")).default,
                ),
                {
                    status: 500,
                },
            )
        } catch (_error) {
            return defaultNotFound
        }
    }
}
