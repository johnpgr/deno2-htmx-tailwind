import { eq, or } from "drizzle-orm/expressions"
import { db } from "database/client.ts"
import { verify } from "@felix/argon2"
import { UserAgent } from "@std/http/user-agent"
import { ulid } from "@std/ulid/ulid"
import { Session } from "database/schema.ts"
import {
    DEFAULT_REFRESHTOKEN_DURATION,
    DEFAULT_SESSION_DURATION,
    REFRESH_COOKIE_NAME,
    SESSION_COOKIE_NAME,
} from "config/consts.ts"
import { type Cookie, setCookie } from "@std/http/cookie"
import { hxRedirect } from "utils/response.tsx"

export async function POST(req: Request) {
    const formData = await req.formData()
    const usernameOrEmail = formData.get("username-or-email")?.toString()
    const password = formData.get("password")?.toString()
    if (!usernameOrEmail || !password) {
        return new Response("Missing required fields", { status: 400 })
    }

    const foundUser = await db.query.User.findFirst({
        where: (user) => or(eq(user.name, usernameOrEmail), eq(user.email, usernameOrEmail)),
    })

    if (!foundUser) {
        return new Response("Invalid credentials", { status: 401 })
    }

    if (!(await verify(foundUser.hashedPassword, password))) {
        return new Response("Invalid credentials", { status: 401 })
    }

    const userAgent = new UserAgent(req.headers.get("user-agent") ?? "")
    const ip = req.headers.get("x-real-ip") ??
        req.headers.get("x-forwarded-for") ??
        req.headers.get("cf-connecting") ??
        "unknown"

    //TODO: Add constraint to prevent multiple sessions for the same user, ip and user-agent
    const [session] = await db
        .insert(Session)
        .values({
            id: ulid(),
            userId: foundUser.id,
            ipAddress: ip,
            userAgent: userAgent.toString(),
            token: crypto.randomUUID(),
            refreshToken: crypto.randomUUID(),
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + DEFAULT_SESSION_DURATION),
        })
        .returning()

    if (!session) {
        return new Response("Failed to create session", { status: 500 })
    }

    const sessionTokenCookie: Cookie = {
        name: SESSION_COOKIE_NAME,
        value: session.token,
        path: "/",
        secure: true,
        httpOnly: true,
        maxAge: DEFAULT_REFRESHTOKEN_DURATION,
    }

    const refreshTokenCookie: Cookie = {
        name: REFRESH_COOKIE_NAME,
        value: session.refreshToken,
        path: "/",
        secure: true,
        httpOnly: true,
        maxAge: DEFAULT_SESSION_DURATION,
    }

    const headers = new Headers()
    setCookie(headers, sessionTokenCookie)
    setCookie(headers, refreshTokenCookie)

    return hxRedirect("/", { headers })
}
