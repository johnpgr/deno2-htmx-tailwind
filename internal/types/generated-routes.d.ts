type PostRoutes = "/signup" | "/signin" | "/hello" | "/api/test" | "/api/auth/signup" | "/api/auth/signout" | "/api/auth/signin" | "/"
type GetRoutes = "/signup" | "/signin" | "/hello" | "/auto-refresh/feed" | "/api/test" | "/"
type PutRoutes = "/signup" | "/signin" | "/hello" | "/api/test" | "/"
type DeleteRoutes = "/signup" | "/signin" | "/hello" | "/api/test" | "/"
type PatchRoutes = "/signup" | "/signin" | "/hello" | "/api/test" | "/"

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