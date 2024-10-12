/*
MIT License

Copyright (c) 2023 Mark Gibson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

//src: https://github.com/jollytoad/deno_http_fns/blob/51793b11933c08be369a2bb8ad4f364cf94f9979/packages/response/prepend_doctype.ts

const DOCTYPE = "<!DOCTYPE html>\n";
const ENCODED_DOCTYPE = new TextEncoder().encode(DOCTYPE);

/**
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
        return bodyInit;
    } else if (isStream(bodyInit)) {
        return stream(bodyInit.values());
    } else if (isAsyncIterable(bodyInit)) {
        return stream(bodyInit[Symbol.asyncIterator]());
    } else {
        return new Blob([DOCTYPE, bodyInit]);
    }
}

function isStream(bodyInit: BodyInit): bodyInit is ReadableStream<Uint8Array> {
    return (
        !!bodyInit &&
        typeof bodyInit === "object" &&
        "getReader" in bodyInit &&
        typeof bodyInit.getReader === "function"
    );
}

function isAsyncIterable(
    bodyInit: BodyInit | AsyncIterable<Uint8Array>,
): bodyInit is AsyncIterable<Uint8Array> {
    return (
        !!bodyInit &&
        typeof bodyInit === "object" &&
        Symbol.asyncIterator in bodyInit &&
        typeof bodyInit[Symbol.asyncIterator] === "function"
    );
}

function isData(bodyInit: BodyInit): bodyInit is FormData | URLSearchParams {
    return bodyInit instanceof FormData || bodyInit instanceof URLSearchParams;
}

function stream(iterator: AsyncIterator<Uint8Array>) {
    return new ReadableStream<Uint8Array>({
        start(controller) {
            controller.enqueue(ENCODED_DOCTYPE);
        },
        async pull(controller) {
            const { value, done } = await iterator.next();
            if (done) {
                controller.close();
            } else {
                controller.enqueue(value);
            }
        },
    });
}
