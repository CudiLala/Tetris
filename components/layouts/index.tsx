import { ReactElement } from "react";
import MainHeader from "components/headers";

export default function MainLayout({ children }: { children: ReactElement }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
