import { byMethod } from "@http/route/by-method"
import { render } from "internal/route-handlers/component/render.ts"
import type { ComponentRoute } from "./types.ts"

/**
 * Basic GET request handler that renders a HTML full page component,/
 * passing the request and URL pattern match result as properties.
 */
export function handlePage(
    Component: ComponentRoute,
    init?: ResponseInit,
) {
    return byMethod({
        GET: renderPage(Component, init),
    })
}

export function renderPage(
    Component: ComponentRoute,
    init?: ResponseInit,
) {
    return (req: Request, match: URLPatternResult) => {
        const res = Component({ req, match })
        if (res instanceof Response) {
            return res
        }

        return render(res, init)
    }
}
