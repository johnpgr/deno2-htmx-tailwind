import { deleteCookie, getCookies } from "@std/http/cookie"
import { SESSION_COOKIE_NAME } from "config/consts.ts"
import { db } from "database/client.ts"
import { Session } from "database/schema.ts"
import { eq } from "drizzle-orm/expressions"
import { hxRedirect } from "utils/response.tsx"

export async function POST(req: Request) {
    const cookies = getCookies(req.headers)
    const sessionToken = cookies[SESSION_COOKIE_NAME]
    if (sessionToken) {
        await db
            .delete(Session)
            .where(eq(Session.token, sessionToken))

        const responseHeaders = new Headers()
        deleteCookie(responseHeaders, SESSION_COOKIE_NAME, { path: "/" })
        return hxRedirect("/", {
            headers: responseHeaders,
        })
    }
    return new Response()
}
