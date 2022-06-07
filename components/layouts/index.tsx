import { ReactElement } from "react";
import MainHeader from "components/headers";
import styles from "styles/components/layout.module.css";

export default function MainLayout({ children }: { children: ReactElement }) {
  return (
    <>
      <MainHeader />
      <main className={`${styles.mainLayoutMain}`}>{children}</main>
    </>
  );
}
