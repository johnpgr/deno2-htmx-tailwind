import { renderBody } from "@http/jsx-stream/serialize"
import type { Node, RenderOptions } from "@http/jsx-stream"

const DOCTYPE = "<!DOCTYPE html>\n"
const ENCODED_DOCTYPE = new TextEncoder().encode(DOCTYPE)
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

export function redirect(url: string, init?: ResponseInit) {
    const headers = new Headers(init?.headers)
    headers.set("HX-Location", url)

    return new Response(undefined, {
        ...init,
        status: init?.status ?? 302,
        headers,
    })
}

export function html(body: BodyInit, init?: ResponseInit): Response {
    const headers = new Headers(init?.headers)
    headers.set("Content-Type", "text/html")
    return new Response(body, {
        status: init?.status ?? 200,
        statusText: init?.statusText ?? "OK",
        headers,
    })
}

/**
 * Original source: https://github.com/jollytoad/deno_http_fns/blob/main/packages/response/prepend_doctype.ts
 * Prepend `<!DOCTYPE html>` to the given response body, retaining the
 * original streaming capability of the body.
 *
 * A body of FormData or URLSearchParams is passed through unchanged.
 *
 * @param bodyInit A body of HTML content (without a doctype)
 * @returns A similar body with the standard HTML doctype prepended
 */
export function prependDocType(bodyInit: BodyInit): BodyInit {
    if (isData(bodyInit)) {
        return bodyInit
    } else if (isStream(bodyInit)) {
        return stream(bodyInit.values())
    } else if (isAsyncIterable(bodyInit)) {
        return stream(bodyInit[Symbol.asyncIterator]())
    } else {
        return new Blob([DOCTYPE, bodyInit])
    }
}

function isStream(bodyInit: BodyInit): bodyInit is ReadableStream<Uint8Array> {
    return (
        !!bodyInit &&
        typeof bodyInit === "object" &&
        "getReader" in bodyInit &&
        typeof bodyInit.getReader === "function"
    )
}

function isAsyncIterable(
    bodyInit: BodyInit | AsyncIterable<Uint8Array>,
): bodyInit is AsyncIterable<Uint8Array> {
    return (
        !!bodyInit &&
        typeof bodyInit === "object" &&
        Symbol.asyncIterator in bodyInit &&
        typeof bodyInit[Symbol.asyncIterator] === "function"
    )
}

function isData(bodyInit: BodyInit): bodyInit is FormData | URLSearchParams {
    return bodyInit instanceof FormData || bodyInit instanceof URLSearchParams
}

function stream(iterator: AsyncIterator<Uint8Array>) {
    return new ReadableStream<Uint8Array>({
        start(controller) {
            controller.enqueue(ENCODED_DOCTYPE)
        },
        async pull(controller) {
            const { value, done } = await iterator.next()
            if (done) {
                controller.close()
            } else {
                controller.enqueue(value)
            }
        },
    })
}
