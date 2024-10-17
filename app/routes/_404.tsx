export default function NotFoundPage() {
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
                    <h1 class="font-bold text-4xl">404</h1>
                    <h2 class="font-bold text-2xl">Not found.</h2>
                    <p>
                        The requested URL was not found on this server.
                    </p>
                    <a class="btn btn-outline btn-sm mt-2" href="/">
                        Find your way back home
                    </a>
                </main>
            </body>
        </html>
    )
}
