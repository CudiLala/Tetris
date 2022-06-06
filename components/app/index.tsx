import React, { ReactElement } from "react";

interface App {
  children: ReactElement;
}

export default function App({ children }: App) {
  return <div id="body">{children}</div>;
}
