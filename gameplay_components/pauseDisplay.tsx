import { gameStateContext } from "components/app";
import { gameInfoCotext } from "components/gameplay";
import { resetGame } from "game_engine";
import GameEvent from "game_engine/events";
import { useContext } from "react";
import styles from "styles/components/gameplay.module.css";
import { GameButton, Instruction } from "./others";

export default function PauseDisplay({ visible }: { visible: boolean }) {
  const [, setGameState] = useContext(gameStateContext);
  const [gameInfo] = useContext(gameInfoCotext);

  const className = `${styles.pauseDisplay} ${
    visible ? styles.visible : styles.invisible
  }`;
  return (
    <div className={className} style={{ paddingTop: "1rem" }}>
      <div className={styles.doubleSpacer} />
      <div
        className={`${styles.text} t-xlight`}
        style={{ fontSize: "2.5rem", margin: "0.25rem" }}
      >
        <p>Paused</p>
      </div>
      <div className={styles.spacer} />
      <div className={`${styles.gameInfoBox} t-mono`}>
        <div className={styles.score}>Score:&ensp;{gameInfo.score}</div>
        <div className={styles.level}>Level:&ensp;{gameInfo.level}</div>
      </div>
      <div className={styles.spacer} />
      <GameButton passProps={{ onClick: () => setGameState("playing") }}>
        Continue
      </GameButton>
      <GameButton passProps={{ onClick: () => GameEvent.emit("restart") }}>
        Restart
      </GameButton>
      <GameButton passProps={{ onClick: () => GameEvent.emit("exited") }}>
        Exit
      </GameButton>
      <div className={styles.doubleSpacer} />
    </div>
  );
}
