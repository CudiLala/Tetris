import styles from "styles/components/headers.module.css";
import {
  DesktopMainHeaderNav as DesktopNav,
  MobileMainHeaderNav as MobileNav,
} from "components/navs";

export default function MainHeader() {
  return (
    <header className={styles.mainHeader}>
      <DesktopNav />
      <MobileNav />
    </header>
  );
}
