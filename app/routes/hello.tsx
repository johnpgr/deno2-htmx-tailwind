import { renderPartial } from "internal/http.ts"

export default function (req: Request) {
    const url = new URL(req.url)
    const name = url.searchParams.get("name")

    //{name} is automatically escaped
    return renderPartial(<p>Hello, {name ?? "unknown"}</p>)
}
