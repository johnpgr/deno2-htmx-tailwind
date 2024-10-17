type PostRoutes = "/api/auth/signup" | "/api/auth/signout" | "/api/auth/signin"
type GetRoutes = "/signup" | "/signin" | "/posts/:id" | "/hello" | "/auto-refresh/feed" | "/"
type PutRoutes = never
type DeleteRoutes = never
type PatchRoutes = never

declare namespace JSX {
    interface HtmlTag extends Htmx.Attributes {
        ["hx-get"]?: GetRoutes;
        ["hx-post"]?: PostRoutes;
        ["hx-put"]?: PutRoutes;
        ["hx-delete"]?: DeleteRoutes;
        ["hx-patch"]?: PatchRoutes;
    }
    
    interface HtmlAnchorTag extends HtmlTag {
        href?: GetRoutes | (string & {});
    }
}