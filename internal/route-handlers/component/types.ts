import type { Awaitable } from "@http/route/types"

export type ComponentRoute = (props: RouteProps) => Awaitable<JSX.Element | Response>
export type APIRoute = (req: Request, pattern: URLPatternResult) => Awaitable<Response>

export type Component<Props extends JSX.IntrinsicAttributes> = (
    props: Props,
) => JSX.Element

export interface RequestProps {
    req: Request
}

export interface RouteProps extends RequestProps {
    match: URLPatternResult
}
