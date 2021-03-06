import { gameStateContext } from "components/app";
import { useContext } from "react";
import styles from "styles/components/gameplay.module.css";
import { BestToday, GameButton, Instruction } from "./others";

export default function StartDisplay({ visible }: { visible: boolean }) {
  const [, setGameState] = useContext(gameStateContext);

  const className = `${styles.startDisplay} ${
    visible ? styles.visible : styles.invisible
  }`;
  return (
    <div className={className}>
      <div className={styles.doubleSpacer} />

      <BestToday />

      <div className={styles.spacer} />
      <GameButton passProps={{ onClick: () => setGameState("playing") }}>
        Start Game
      </GameButton>
      <div className={styles.spacer} />

      <div className={styles.spacer} style={{ marginTop: "1rem" }} />
      <Instruction />

      <div className={styles.doubleSpacer} style={{ marginTop: "1rem" }} />
    </div>
  );
}
