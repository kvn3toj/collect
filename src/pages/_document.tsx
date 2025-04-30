import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700&family=Playfair+Display:wght@400;500;700&display=swap"
          />
          <link rel="icon" href="/images/logos/aretrust-icon.png" />
          <meta name="description" content="ARE Trüst - Inversión en Esmeraldas Colombianas" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 