import { deleteCookie, getCookies } from "@std/http/cookie"
import { SESSION_COOKIE_NAME } from "config/consts.ts"
import { hxRedirect } from "utils/response.tsx"
import type { APIRoute } from "internal/route-handlers/component/types.ts"
import { Session } from "entities/Session.ts"

export const POST: APIRoute = async (req: Request) => {
    const cookies = getCookies(req.headers)
    const sessionToken = cookies[SESSION_COOKIE_NAME]
    if (sessionToken) {
        const session = await Session.findOneBy({token: sessionToken})
        if (session) {
            await session.remove()
        }

        const responseHeaders = new Headers()
        deleteCookie(responseHeaders, SESSION_COOKIE_NAME, { path: "/" })
        return hxRedirect("/", {
            headers: responseHeaders,
        })
    }
    return new Response()
}
