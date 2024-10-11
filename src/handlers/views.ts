import { escape } from "@std/html";
import { Layout } from "../layout.ts";
import { html, HTMLResponse } from "../utils.ts";
import { STATUS_CODE, STATUS_TEXT } from "@std/http/status";

export class ViewsHandler {
    index(req: Request): Response {
        return new HTMLResponse(
            Layout(html`
                <main>
                    <h1>Test Deno 2.0 w/ HTMX</h1>
                    <form hx-get="/hello" hx-target="#greet">
                        <h2>Get greeted:</h2>
                        <input
                            class="border p-1 rounded"
                            name="name"
                            type="text"
                            placeholder="your name"
                        />
                        <button class="border p-1 rounded" type="submit">
                            submit
                        </button>
                    </form>
                    <div id="greet"></div>
                </main>
            `),
        );
    }

    hello(req: Request): Response {
        const url = new URL(req.url);
        const name = url.searchParams.get("name");

        return new HTMLResponse(
            html`<p>Hello, ${name ? escape(name) : "unknown"}</p>`,
        );
    }

    notFound(req: Request): Response {
        return new HTMLResponse(Layout(html`<p>Not Found</p>`), {
            status: STATUS_CODE.NotFound,
            statusText: STATUS_TEXT[STATUS_CODE.NotFound],
        });
    }
}
