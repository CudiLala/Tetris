import { gameStateContext } from "components/app";
import { useContext, useEffect } from "react";
import styles from "styles/components/gameplay.module.css";

export default function LevelChange({ visible }: { visible: boolean }) {
  const [gameState, setGameState] = useContext(gameStateContext);

  /*eslint-disable*/
  useEffect(() => {
    if (gameState === "level change") {
      setTimeout(() => {
        setGameState("playing");
      }, 3000);
    }
  }, [gameState]);
  /*eslint-enable*/

  const className = `${styles.startDisplay} ${
    visible ? styles.visible : styles.invisible
  }`;
  return (
    <div className={className}>
      <button onClick={() => setGameState("playing")}>Continue</button>
    </div>
  );
}
