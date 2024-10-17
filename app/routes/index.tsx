import { Page } from "components/layouts/page.layout.tsx"
import type { RouteProps } from "internal/route-handlers/component/types.ts"

export default function IndexPage({ req }: RouteProps) {
    return (
        <Page req={req} title="Index Page">
            <main>

            </main>
        </Page>
    )
}
