import { Layout } from "../components/layout.tsx";
import { STATUS_CODE, STATUS_TEXT } from "@std/http/status";
import { HTMLResponse, PartialHTMLResponse } from "../utils/http.ts";
import { Delayed } from "../components/delayed.tsx";

export class ViewsHandler {
    index(_: Request): Response {
        return new HTMLResponse(
            <Layout>
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
                    <Delayed delay={1000} />
                    <p>Test</p>
                </main>
            </Layout>
        );
    }

    hello(req: Request): Response {
        const url = new URL(req.url);
        const name = url.searchParams.get("name");

        //{name} is automatically escaped
        return new PartialHTMLResponse(
            <p>Hello, {name ?? "unknown"}</p>,
        );
    }

    notFound(_: Request): Response {
        return new HTMLResponse(
            <Layout>
                <p>Not Found</p>
            </Layout>,
            {
                status: STATUS_CODE.NotFound,
                statusText: STATUS_TEXT[STATUS_CODE.NotFound],
            },
        );
    }
}
