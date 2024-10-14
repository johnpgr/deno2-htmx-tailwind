export function redirect(url: string, init?: ResponseInit) {
    const headers = new Headers(init?.headers)
    headers.set("HX-Location", url)

    return new Response(undefined, {
        ...init,
        status: init?.status ?? 302,
        headers,
    })
}
