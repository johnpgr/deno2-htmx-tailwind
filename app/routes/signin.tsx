import { Page } from "components/layouts/page.layout.tsx";
import { render } from "lib/render.ts";

export default function (req: Request) {
    return render(
        <Page req={req} title="Sign In">
            <main class="min-h-screen w-full flex justify-center items-center">
                <form
                    class="border border-border rounded-lg p-16 max-w-sm flex flex-col gap-4"
                    hx-post="/api/auth/signin"
                    hx-ext="response-targets"
                    hx-target-error="#errors"
                >
                    <label class="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            class="h-4 w-4 opacity-70"
                        >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input
                            class="grow"
                            placeholder="Username or Email"
                            id="username-or-email"
                            name="username-or-email"
                            required={true}
                            type="text"
                        />
                    </label>

                    <label class="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            class="h-4 w-4 opacity-70"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <input
                            class="grow"
                            placeholder="Password"
                            id="password"
                            name="password"
                            required={true}
                            type="password"
                        />
                    </label>
                    <button class="btn btn-neutral" type="submit">
                        Sign In
                    </button>
                    <div
                        class="text-error text-center font-medium"
                        id="errors"
                    />
                </form>
            </main>
        </Page>,
    );
}
