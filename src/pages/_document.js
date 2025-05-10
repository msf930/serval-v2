import { Html, Head, Main, NextScript } from "next/document";

import { ReactLenis } from "lenis/react";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
        {/*<ReactLenis root>*/}
          <body>
            <Main />
            <NextScript />
          </body>
        {/*</ReactLenis>*/}
    </Html>
  );
}
