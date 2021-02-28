import Head from 'next/head'
const HeadTag = ({ Suffix, Title, Description, logoPath }) => {
    return (
        <Head>
            <title>{Title}</title>
            <meta
                name="og:url"
                property="og:url"
            />
            <meta name="og:type" property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={Title} />
            <meta
                name="og:description"
                property="og:description"
                content={Description}
            />
            <meta name="og:image" property="og:image" content={logoPath} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={Title} />
            <meta name="twitter:description" content={Description} />
            <meta name="twitter:image" content={logoPath} />
        </Head>
    )
}
export default HeadTag
