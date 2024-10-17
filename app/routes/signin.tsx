import { Page } from "components/layouts/page.layout.tsx"
import type { RouteProps } from "internal/route-handlers/component/types.ts"

export default function SigninPage({ req }: RouteProps) {
    return (
        <Page req={req} title="Sign In">
            <main class="min-h-screen w-full flex justify-center items-center">
                <form
                    class="border border-border rounded-lg p-16 max-w-md flex flex-col gap-4"
                    hx-post="/api/auth/signin"
                    hx-ext="response-targets"
                    hx-disabled-elt="#submit-btn"
                    hx-indicator="#loading"
                    hx-target-error="#errors"
                >
                    <label class="input input-bordered flex items-center gap-2">
                        <i data-lucide="user" class="w-4 h-4" />
                        <input
                            class="grow"
                            placeholder="Username"
                            name="userAlias"
                            required={true}
                            type="text"
                        />
                    </label>

                    <label class="input input-bordered flex items-center gap-2">
                        <i data-lucide="lock-keyhole" class="w-4 h-4" />
                        <input
                            class="grow"
                            placeholder="Password"
                            id="password"
                            name="password"
                            required={true}
                            type="password"
                        />
                    </label>
                    <button
                        id="submit-btn"
                        class="btn btn-neutral"
                        type="submit"
                    >
                        <span
                            id="loading"
                            class="loading loading-indicator loading-spinner"
                        />
                        Sign In
                    </button>
                    <div
                        class="text-error text-center font-medium"
                        id="errors"
                    />
                </form>
            </main>
        </Page>
    )
}
