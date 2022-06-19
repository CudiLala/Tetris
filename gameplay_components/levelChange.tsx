import { gameStateContext } from "components/app";
import { gameInfoCotext } from "components/gameplay";
import { useContext, useEffect } from "react";
import styles from "styles/components/gameplay.module.css";

export default function LevelChange({ visible }: { visible: boolean }) {
  const [gameState, setGameState] = useContext(gameStateContext);
  const [gameInfo] = useContext(gameInfoCotext);

  /*eslint-disable*/
  useEffect(() => {
    if (gameState === "level change") {
      setTimeout(() => {
        setGameState("playing");
      }, 3000);
    }
  }, [gameState]);
  /*eslint-enable*/

  const className = `${styles.levelChangeDisplay} ${
    visible ? styles.visible : styles.invisible
  }`;
  return (
    <div className={className}>
      <div className={styles.spacer} />
      <div className={`${styles.text} t-thin`}>
        Welcome to
        <div className={`${styles.level} t-xlight`}>LEVEL {gameInfo.level}</div>
      </div>
      <div className={styles.spacer} />
    </div>
  );
}
