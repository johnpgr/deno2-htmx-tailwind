import type { Awaitable } from "@http/route/types"

/**
 * Stores results from function that takes a request argument
 * So that we can make the same same query in a request in different components
 * Example: User.fromSessionToken(req) in different components would make multiple queries
 * to the database for the same session token
 */
const RequestStore = new WeakMap<Request, Map<Function, any>>()

export function deduped<T>(
    fn: (req: Request) => Awaitable<T>,
): (req: Request) => Awaitable<T> {
    return (req: Request) => {
        let store = RequestStore.get(req)
        if (!store) {
            store = new Map()
            RequestStore.set(req, store)
        }

        if (store.has(fn)) {
            return store.get(fn)
        }

        const result = fn(req)
        if (result instanceof Promise) {
            return result.then((res) => {
                store.set(fn, res)
                return res
            })
        } else {
            store.set(fn, result)
            return result
        }
    }
}
