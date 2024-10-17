import type { RouteProps } from "internal/route-handlers/component/types.ts"
import { redirect } from "../utils/response.tsx"

export default function Hello({ req }: RouteProps) {
    const url = new URL(req.url)
    const name = url.searchParams.get("name")
    if (!name) return redirect("/hello?name=unknown")

    //{name} is automatically escaped
    return <p>Hello, {name}</p>
}
