import { renderBody } from "@http/jsx-stream/serialize";
import type { ComponentType } from "@http/jsx-stream";
import { prependDocType } from "./prepend-doctype.ts";
import { contentType } from "@std/media-types/content-type";

const HTML_MIME_TYPE = contentType(".html");
const DEFAULT_DEFERRED_TIMEOUT = 10;

export class HTMLResponse extends Response {
    constructor(
        comp: ComponentType,
        init?: ResponseInit & { deferredTimeout?: number },
    ) {
        super(
            prependDocType(
                renderBody(comp, {
                    deferredTimeout:
                        init?.deferredTimeout ?? DEFAULT_DEFERRED_TIMEOUT,
                }),
            ),
            init,
        );
        this.headers.set("Content-Type", HTML_MIME_TYPE);
    }
}

export class PartialHTMLResponse extends Response {
    constructor(
        comp: ComponentType,
        init?: ResponseInit & { deferredTimeout?: number },
    ) {
        super(
            renderBody(comp, {
                deferredTimeout:
                    init?.deferredTimeout ?? DEFAULT_DEFERRED_TIMEOUT,
            }),
            init,
        );
        this.headers.set("Content-Type", HTML_MIME_TYPE);
    }
}
