type PostRoutes = "/signup" | "/signin" | "/hello" | "/api/auth/signup" | "/api/auth/signout" | "/api/auth/signin" | "/"
type GetRoutes = "/signup" | "/signin" | "/hello" | "/"
type PutRoutes = "/signup" | "/signin" | "/hello" | "/"
type DeleteRoutes = "/signup" | "/signin" | "/hello" | "/"
type PatchRoutes = "/signup" | "/signin" | "/hello" | "/"

declare namespace JSX {
    interface HtmlTag extends Htmx.Attributes {
        ["hx-get"]?: GetRoutes
        ["hx-post"]?: PostRoutes
        ["hx-put"]?: PutRoutes
        ["hx-delete"]?: DeleteRoutes
        ["hx-patch"]?: PatchRoutes
    }

    interface HtmlAnchorTag extends HtmlTag {
        href?: GetRoutes | (string & {})
    }
}
