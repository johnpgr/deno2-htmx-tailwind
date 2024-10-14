import { Page } from "components/layouts/page.layout.tsx"
import { render } from "lib/render.ts"
import { STATUS_CODE, STATUS_TEXT } from "@std/http"

export default function (req: Request) {
    return render(
        <Page 
            req={req}
            title="Content not found">
            <main class="p-4">
                <p>
                    The content you requested was not found.
                </p>
            </main>
        </Page>,
        {
            status: STATUS_CODE.NotFound,
            statusText: STATUS_TEXT[STATUS_CODE.NotFound],
        },
    )
}
