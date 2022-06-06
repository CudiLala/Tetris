import React, { ReactElement } from "react";
import "../styles/globals.css";
import { AppPropsX } from "types/app";
import Head from "next/head";
import App from "components/app";

function MyApp({ Component, pageProps }: AppPropsX) {
  const ComponentLayout = Component.Layout;
  const DefaultLayout = ({ children }: { children: ReactElement }) => (
    <>{children}</>
  );
  const Layout = ComponentLayout || DefaultLayout;

  return (
    <>
      <Head>
        <title>Tetris: An app by Augustine</title>
        <link rel="icon" href="/tetris.png" />
      </Head>
      <App>
        <Layout {...Component.LayoutProps}>
          <Component {...pageProps} />
        </Layout>
      </App>
    </>
  );
}

export default MyApp;
