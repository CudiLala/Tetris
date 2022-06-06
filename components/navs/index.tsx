import styles from "styles/components/navs.module.css";
import Anchor from "components/anchors";
import { useState } from "react";

export function DesktopMainHeaderNav() {
  return (
    <nav className={styles.desktopMainHeaderNav}>
      <Anchor pass={{ className: styles.active }} href="/">
        Game play
      </Anchor>
      <Anchor>Information</Anchor>
      <Anchor>Leaderboard</Anchor>
      <Anchor>Sign in</Anchor>
    </nav>
  );
}

export function MobileMainHeaderNav() {
  const [disp, setDisp] = useState(false);
  return (
    <nav className={styles.mobileMainHeaderNav}>
      <Menu disp={disp} setDisp={setDisp} />
      <ShowCase disp={disp} />
      <Anchor pass={{ className: styles.active }} href="/">
        Game play
      </Anchor>
    </nav>
  );
}

type Menu = {
  disp: boolean;
  setDisp: React.Dispatch<React.SetStateAction<boolean>>;
};

function Menu({ disp, setDisp }: Menu) {
  return (
    <button
      className={`${styles.menu} ${disp ? styles.active : ""}`}
      onClick={() => setDisp((prev) => !prev)}
    >
      <div className={styles.off}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.on}>
        <span></span>
        <span></span>
      </div>
    </button>
  );
}

function ShowCase({ disp }: { disp: boolean }) {
  return (
    <div className={`${styles.showcase} ${disp ? styles.active : ""}`}>
      <Anchor pass={{ className: styles.active }}>Gameplay</Anchor>
      <Anchor>Information</Anchor>
      <Anchor>Leaderboard</Anchor>
      <Anchor>Sign in</Anchor>
    </div>
  );
}
