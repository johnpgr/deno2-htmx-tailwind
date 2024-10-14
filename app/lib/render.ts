import { renderBody } from "@http/jsx-stream/serialize"
import type { Node, RenderOptions } from "@http/jsx-stream"
import { prependDocType } from "lib/prepend-doctype.ts"

const DEFAULT_DEFERRED_TIMEOUT = 10

export const render = (
    Component: Node,
    init?: ResponseInit,
    options: RenderOptions = { deferredTimeout: DEFAULT_DEFERRED_TIMEOUT },
) => html(prependDocType(renderBody(Component, options)), init)

export const renderPartial = (
    Component: Node,
    init?: ResponseInit,
    options: RenderOptions = { deferredTimeout: DEFAULT_DEFERRED_TIMEOUT },
) => html(renderBody(Component, options), init)

function html(body: BodyInit, init?: ResponseInit): Response {
    const headers = new Headers(init?.headers)
    headers.set("Content-Type", "text/html")
    return new Response(body, {
        status: init?.status ?? 200,
        statusText: init?.statusText ?? "OK",
        headers,
    })
}
