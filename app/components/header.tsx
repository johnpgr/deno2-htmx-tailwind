import { getCookies } from "@std/http/cookie";
import { SESSION_COOKIE_NAME } from "config/consts.ts";
import { User } from "entities/User.ts";

export function HeaderBar(props: { req: Request }) {
    const cookies = getCookies(props.req.headers);
    const sessionToken = cookies[SESSION_COOKIE_NAME];

    return (
        <header class="flex items-center justify-end min-h-12 px-4 w-full bg-primary-content">
            <nav></nav>
            <UserInfo sessionToken={sessionToken} />
        </header>
    );
}

async function UserInfo({ sessionToken }: { sessionToken?: string }) {
    let user: User | null = null;
    if (sessionToken) {
        user = await User.findOneBy({ sessions: { token: sessionToken } });
    }

    return (
        <div>
            {user ? (
                <div class="flex gap-2 items-center">
                    <p>Hello, {user.alias}</p>
                    <a href="/signin"></a>
                    <button
                        class="btn btn-sm btn-neutral"
                        hx-post="/api/auth/signout"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
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
    );
}
