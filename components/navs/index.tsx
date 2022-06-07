import styles from "styles/components/navs.module.css";
import Anchor from "components/anchors";
import { useState } from "react";

export function DesktopMainHeaderNav() {
  return (
    <nav className={styles.desktopMainHeaderNav}>
      <div className={styles.left}>
        <Anchor href="/">Logo</Anchor>
      </div>
      <div className={styles.right}>
        <Anchor>Statistics</Anchor>
        <Anchor>Information</Anchor>
        <Anchor>Sign in</Anchor>
      </div>
    </nav>
  );
}

export function MobileMainHeaderNav() {
  const [disp, setDisp] = useState(false);
  return (
    <nav className={styles.mobileMainHeaderNav}>
      <Menu disp={disp} setDisp={setDisp} />
      <ShowCase disp={disp} setDisp={setDisp} />
      <div className={styles.logo}>
        <Anchor href="/">Logo</Anchor>
      </div>
    </nav>
  );
}

type dispState = {
  disp: boolean;
  setDisp: React.Dispatch<React.SetStateAction<boolean>>;
};

function Menu({ disp, setDisp }: dispState) {
  return (
    <button className={styles.menu} onClick={() => setDisp((prev) => !prev)}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

function ShowCase({ disp, setDisp }: dispState) {
  return (
    <div
      className={`${styles.showcase} ${disp ? styles.active : ""}`}
      onClick={() => setDisp((prev) => !prev)}
    >
      <div className={`${styles.panelContainer}`}>
        <div
          className={`${styles.panel} noScrollBar`}
          onClick={(ev) => ev.stopPropagation()}
        >
          <div className={styles.header}>
            <div className={styles.logo}>Logo</div>
            <button className={styles.close} onClick={() => setDisp(false)}>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className={styles.spacer} />
          <div className={styles.anchorContainer}>
            <Anchor>Statistics</Anchor>
            <Anchor>Information</Anchor>
            <Anchor>Sign in</Anchor>
          </div>
        </div>
      </div>
    </div>
  );
}
