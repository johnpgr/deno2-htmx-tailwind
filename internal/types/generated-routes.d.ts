type PostRoutes = "/api/comments" | "/api/auth/signup" | "/api/auth/signout" | "/api/auth/signin"
type GetRoutes = "/signup" | "/signin" | "/auto-refresh/feed" | "/"
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