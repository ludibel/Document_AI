import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap"
          rel="stylesheet"
        />

        <meta name="description" content="ChatGPT pour document" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
