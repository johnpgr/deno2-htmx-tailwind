import { contentType } from "@std/media-types";

export const HTTP_METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
    HEAD: "HEAD",
    OPTIONS: "OPTIONS",
    TRACE: "TRACE",
    CONNECT: "CONNECT",
} as const;

export function html(strings: TemplateStringsArray, ...values: any[]): string {
    return strings
        .reduce((result, str, i) => {
            return result + str + (values[i] || "");
        }, "")
        .trim();
}

export class HTMLResponse extends Response {
    constructor(body: BodyInit, init?: ResponseInit) {
        super(body, init);
        this.headers.set("Content-Type", contentType(".html"));
    }
}
