import type { Children } from "@http/jsx-stream/types"

export const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

export interface DelayedProps {
    delay: number
    children?: Children
}

export async function Delayed(props: DelayedProps) {
    await delay(props.delay)

    return <p>This was delayed by: {props.delay}ms</p>
}
