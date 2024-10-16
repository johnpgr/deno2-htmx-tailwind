import type { RouteProps } from "internal/route-handlers/component/types.ts";
import { redirect } from "internal/responses/redirect.ts"

export default function Hello({ req }: RouteProps) {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    if(!name) return redirect("/");

    //{name} is automatically escaped
    return <p>Hello, {name ?? "unknown"}</p>;
}

