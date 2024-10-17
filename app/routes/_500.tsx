export default function ErrorPage(err: unknown) {
    console.log(err)
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="stylesheet" href="/global.css" />
                <title>Not found</title>
            </head>
            <body>
                <main class="flex flex-col h-[90vh] justify-center items-center">
                    <h1 class="text-red-500 font-medium">Internal Server Error</h1>
                    {err instanceof Error ? <h2>{err.message}</h2> : null}
                </main>
            </body>
        </html>
    );
}
