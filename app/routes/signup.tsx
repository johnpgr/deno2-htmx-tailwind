import { Page } from "components/layouts/page.layout.tsx";
import type { RouteProps } from "internal/route-handlers/component/types.ts";

export default function SignupPage({ req }: RouteProps) {
    return (
        <Page req={req} title="Sign Up">
            <main class="min-h-screen w-full flex justify-center items-center">
                <form
                    class="border border-border rounded-lg p-16 max-w-md flex flex-col gap-4"
                    hx-post="/api/auth/signup"
                    hx-ext="response-targets"
                    hx-disabled-elt="#submit-btn"
                    hx-indicator="#loading"
                    hx-target-error="#errors"
                >
                    <label class="input input-bordered flex items-center gap-2">
                        <i data-lucide="mail" class="w-4 h-4" />
                        <input
                            class="grow"
                            placeholder="Email"
                            id="email"
                            name="email"
                            required={true}
                            type="email"
                        />
                    </label>

                    <label class="input input-bordered flex items-center gap-2">
                        <i data-lucide="user" class="w-4 h-4" />
                        <input
                            class="grow"
                            placeholder="Username"
                            id="username"
                            name="username"
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
                        Sign Up
                    </button>
                    <div
                        class="text-error text-center font-medium"
                        id="errors"
                    />
                </form>
            </main>
        </Page>
    );
}
