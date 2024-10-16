import type { RouteProps } from "internal/route-handlers/component/types.ts";
import posts from "../../posts.json" with { type: "json" };
import { params } from "utils/params.ts";
import { notFound } from "utils/response.tsx";
import { Page } from "components/layouts/page.layout.tsx";

export default function PostPage({ req, match }: RouteProps) {
    const { id } = params(match);
    const post = posts.find((post) => post.id === Number(id));
    if (!post) return notFound();

    return (
        <Page req={req} title={post.title}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </Page>
    );
}
