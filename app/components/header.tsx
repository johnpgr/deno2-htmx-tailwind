import { getCookies } from "@std/http/cookie"
import { SESSION_COOKIE_NAME } from "config/consts.ts"
import { db } from "database/client.ts"
import { eq } from "drizzle-orm"
import { Session, User } from "database/schema.ts"

export function HeaderBar(props: { req: Request }) {
    const cookies = getCookies(props.req.headers)
    const sessionToken = cookies[SESSION_COOKIE_NAME]

    return (
        <header class="flex items-center justify-end min-h-12 px-4 w-full bg-primary-content">
            <nav></nav>
            <UserInfo sessionToken={sessionToken} />
        </header>
    )
}

async function UserInfo({ sessionToken }: { sessionToken?: string }) {
    const [user] = sessionToken
        ? await db
            .select({
                id: User.id,
                name: User.name,
                email: User.email,
                bio: User.bio,
            })
            .from(User)
            .leftJoin(Session, eq(User.id, Session.userId))
            .where(eq(Session.token, sessionToken))
        : []

    return (
        <div>
            {user
                ? (
                    <div class="flex gap-2 items-center">
                        <p>Hello, {user.name}</p>
                        <a href="/signin"></a>
                        <button
                            class="btn btn-sm btn-neutral"
                            hx-post="/api/auth/signout"
                        >
                            Sign Out
                        </button>
                    </div>
                )
                : (
                    <div class="flex items-center gap-4">
                        <a href="/signin" class="btn btn-sm btn-neutral">
                            Sign In
                        </a>
                        <a href="/signup" class="btn btn-sm btn-neutral">
                            Sign Up
                        </a>
                    </div>
                )}
        </div>
    )
}
