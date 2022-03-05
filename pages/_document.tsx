import Document, { Head, Html, Main, NextScript } from 'next/document';

function MyDocument() {
  return (
    <Html lang='en-US'>
      <Head>
        <meta name='author' content='Game/App Priority' />
        <link rel='canonical' href='https://game-app-priority.slogive.com' />
        <meta
          name='description'
          content="Grant the priority of your game/app to high even if you can't change the permissions from your task manager."
        />
        <link rel='canonical' href='https://game-app-priority.slogive.com' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#61279c' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = Document.getInitialProps;

export default MyDocument;
