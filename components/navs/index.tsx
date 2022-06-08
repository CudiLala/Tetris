import styles from "styles/components/navs.module.css";
import Anchor from "components/anchors";
import { useContext, useEffect, useState } from "react";
import { Logo } from "components/icons";
import { useRouter } from "next/router";
import ButtonPrimary from "components/buttons";
import { gameStateContext } from "components/app";

export function DesktopMainHeaderNav() {
  return (
    <nav className={styles.desktopMainHeaderNav}>
      <div className={styles.left}>
        <Anchor passProps={{ className: styles.logo }} href="/">
          <Logo />
        </Anchor>
      </div>
      <div className={styles.right}>
        <Anchor href="/stats">Statistics</Anchor>
        <Anchor href="/info">Information</Anchor>
        <Anchor href="/in">Sign in</Anchor>
        <Anchor href="/join">Create account</Anchor>
      </div>
    </nav>
  );
}

export function MobileMainHeaderNav() {
  const [disp, setDisp] = useState(false);
  const router = useRouter();
  const [gameState, setGameState] = useContext(gameStateContext);
  const [width, setWidth] = useState(0);

  function closeDisp() {
    setDisp(false);
  }
  function resizeWidth() {
    setWidth(window.innerWidth);
  }

  /*eslint-disable*/
  useEffect(() => {
    router.events.on("routeChangeStart", closeDisp);
    window.addEventListener("resize", resizeWidth);

    return () => {
      router.events.off("routeChangeStart", closeDisp);
      window.removeEventListener("resize", resizeWidth);
    };
  }, [router]);

  useEffect(() => {
    if (disp && gameState === "playing") setGameState("paused");
  }, [disp]);

  useEffect(() => {
    if (width >= 768) setDisp(false);
  }, [width]);

  /*eslint-enable*/

  return (
    <nav className={styles.mobileMainHeaderNav}>
      <Menu disp={disp} setDisp={setDisp} />
      <ShowCase disp={disp} setDisp={setDisp} />
      <Anchor passProps={{ className: styles.logo }} href="/">
        <Logo />
      </Anchor>
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
      <div className={styles.panelContainer}>
        <div className={styles.panel} onClick={(ev) => ev.stopPropagation()}>
          <div className={styles.header}>
            <Anchor passProps={{ className: styles.logo }} href="/">
              <Logo />
            </Anchor>
            <button className={styles.close} onClick={() => setDisp(false)}>
              <div>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
          <div className={styles.spacer} />
          <div className={`${styles.anchorContainer} noScrollBar`}>
            <Anchor href="/stats">Statistics</Anchor>
            <div className={styles.spacer} />
            <Anchor href="/info">Information</Anchor>
            <div className={styles.spacer} />
            <Anchor href="/join" passProps={{ className: styles.ignore }}>
              <ButtonPrimary fullWidth psuedo>
                Create account
              </ButtonPrimary>
            </Anchor>
            <Anchor href="/in" passProps={{ className: styles.ignore }}>
              <ButtonPrimary fullWidth colored psuedo>
                Sign in
              </ButtonPrimary>
            </Anchor>
          </div>
        </div>
      </div>
    </div>
  );
}
