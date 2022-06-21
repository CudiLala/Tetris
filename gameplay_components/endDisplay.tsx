import { gameStateContext } from "components/app";
import { gameInfoCotext } from "components/gameplay";
import GameEvent from "game_engine/events";
import { useContext } from "react";
import styles from "styles/components/gameplay.module.css";
import { BestToday, GameButton } from "./others";

export default function EndDisplay({ visible }: { visible: boolean }) {
  const [, setGameState] = useContext(gameStateContext);
  const [gameInfo] = useContext(gameInfoCotext);

  const className = `${styles.pauseDisplay} ${
    visible ? styles.visible : styles.invisible
  }`;
  return (
    <div className={className}>
      <div className={styles.doubleSpacer} />
      <div className={styles.text}>
        <p>Ended</p>
      </div>

      <div className={styles.spacer} />
      <div className={`${styles.gameInfoBox} t-mono`}>
        <div className={styles.score}>Score:&ensp;{gameInfo.score}</div>
        <div className={styles.level}>Level:&ensp;{gameInfo.level}</div>
      </div>
      <div className={styles.spacer} />

      <div className={styles.spacer} />
      <div style={{ padding: "0 2rem" }} className={styles.color}>
        <p className="t-mono">You rank 9th out of 34 games played today</p>
      </div>
      <div className={styles.spacer} />

      <div className={styles.spacer} />
      <BestToday />
      <div className={styles.spacer} />

      <GameButton passProps={{ onClick: () => setGameState("playing") }}>
        Replay
      </GameButton>
      <GameButton passProps={{ onClick: () => setGameState("to begin") }}>
        Exit
      </GameButton>

      <div className={styles.doubleSpacer} />
    </div>
  );
}
