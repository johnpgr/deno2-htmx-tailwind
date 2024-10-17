export function params(match: URLPatternResult): Record<string, string | undefined> {
    return match.pathname.groups;
}

export function searchParams(req: Request): URLSearchParams {
    return new URL(req.url).searchParams
}
