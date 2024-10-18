import { User } from "entities/User.ts"
import { deduped } from "utils/deduped.ts"

export function HeaderBar({ req }: { req: Request }) {
    return (
        <header class="flex items-center justify-end min-h-12 px-4 w-full bg-primary-content">
            <nav></nav>
            <UserInfo req={req} />
        </header>
    )
}

async function UserInfo(props: { req: Request }) {
    const user = await deduped((req) => User.fromRequest(req))(props.req)

    return (
        <div>
            {user
                ? (
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
