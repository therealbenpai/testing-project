

export default async function Header({
    title = "",
    url = "",
    canonical = "",
    description = "",
    children,
    image = "",
    favicon = "",
}) {
    return (
        <head>
            <meta charSet="utf-8" />
            <link rel="canonical" href={canonical} />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="google" content="nositelinkssearchbox" />
            <meta property="og:url" content={url} />
            <meta name="title" content={title} />
            <meta property="og:title" content={title} />
            <meta property="twitter:url" content={url} />
            <meta name="description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:type" content="website" />
            <meta name="language" content="en-us" />
            <meta name="revisit-after" content="2 days" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:image" content={image} />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <meta name="apple-mobile-web-app-title" content="The FemDevs Website" />
            <link href={favicon} rel="apple-touch-icon" type="image/png" async="" />
            <link href={favicon} rel="icon" type="image/png" async="" />
            <title>{title}</title>
            {children}
        </head>
    )
}