export function params(match: URLPatternResult): Record<string, string | undefined> {
    return match.pathname.groups;
}
