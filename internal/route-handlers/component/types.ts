export type ComponentRoute = (props: RouteProps) => JSX.Element | Response;

export type Component<Props extends JSX.IntrinsicAttributes> = (
    props: Props,
) => JSX.Element;

export interface RequestProps {
    req: Request;
}

export interface RouteProps extends RequestProps {
    match: URLPatternResult;
}
