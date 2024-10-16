import {
  renderBody,
  type RenderOptions,
} from "@http/jsx-stream";
import { prependDocType } from "internal/route-handlers/component/prepend-doctype.ts"

const DEFAULT_DEFERRED_TIMEOUT = 0

export function render<Props extends JSX.IntrinsicAttributes>(
    Component: JSX.Element,
    init?: ResponseInit,
    options: RenderOptions = { streamDelay: DEFAULT_DEFERRED_TIMEOUT },
): Response {
    return html(renderBody(Component, options), init)
}

render.withDocType = function (
    Component: JSX.Element,
    init?: ResponseInit,
    options: RenderOptions = { streamDelay: DEFAULT_DEFERRED_TIMEOUT },
) {
    return html(prependDocType(renderBody(Component, options)), init)
}

function html(body: BodyInit, init?: ResponseInit): Response {
    const headers = new Headers(init?.headers)
    headers.set("Content-Type", "text/html")
    return new Response(body, {
        status: init?.status ?? 200,
        statusText: init?.statusText ?? "OK",
        headers,
    })
}
