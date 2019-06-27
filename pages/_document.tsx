import React from 'react';
import NextDocument, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import flush from 'styled-jsx/server';

class Document extends NextDocument {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

Document.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });
  
  const initialProps = await NextDocument.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: (
      <React.Fragment>
        {sheets.getStyleElement()}
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default Document;