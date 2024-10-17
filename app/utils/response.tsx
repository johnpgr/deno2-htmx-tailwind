import { STATUS_CODE } from "@std/http"
import NotFoundPage from "../routes/_404.tsx"

export function redirect(url: string, init?: ResponseInit) {
    const headers = new Headers(init?.headers)
    headers.set("Location", url)

    return new Response(undefined, {
        ...init,
        status: init?.status ?? STATUS_CODE.TemporaryRedirect,
        headers,
    })
}

export function notFound() {
    return <NotFoundPage />
}

export function hxRedirect(url: string, init?: ResponseInit) {
    const headers = new Headers(init?.headers)
    headers.set("HX-Location", url)

    return new Response(undefined, {
        ...init,
        status: init?.status ?? STATUS_CODE.TemporaryRedirect,
        headers,
    })
}
