import { gameStateContext } from "components/app";
import { gameInfoCotext } from "components/gameplay";
import { resetGame } from "game_engine";
import GameEvent from "game_engine/events";
import { useContext } from "react";
import styles from "styles/components/gameplay.module.css";
import { GameButton, Instruction } from "./others";

export default function PauseDisplay({ visible }: { visible: boolean }) {
  const [, setGameState] = useContext(gameStateContext);
  const [gameInfo, setGameInfo] = useContext(gameInfoCotext);

  const className = `${styles.pauseDisplay} ${
    visible ? styles.visible : styles.invisible
  }`;
  return (
    <div className={className}>
      <div className={`${styles.text} t-thin`}>Paused</div>
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
      <div className={styles.spacer} />
      <Instruction />
    </div>
  );
}
