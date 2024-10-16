import { Page } from "components/layouts/page.layout.tsx";
import type { RouteProps } from "internal/route-handlers/component/types.ts"

export default function IndexPage({req}: RouteProps) {
    return (
        <Page req={req} title="Index Page">
            <main>
                <h1>Test Deno 2.0 w/ HTMX</h1>
                <form hx-get="/hello" hx-target="#greet">
                    <h2>Get greeted:</h2>
                    <input
                        class="input input-bordered input-sm input-primary"
                        name="name"
                        type="text"
                        placeholder="your name"
                    />
                    <button class="btn btn-sm btn-outline btn-primary ml-1" type="submit">
                        submit
                    </button>
                </form>
                <div id="greet"></div>
            </main>
        </Page>
    );
}
