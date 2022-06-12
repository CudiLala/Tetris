import Display from "gameplay_components/index";
import { useContext } from "react";
import { gameStateContext } from "../app";
import styles from "styles/components/gameplay.module.css";

export function GamePlay() {
  const [gameState] = useContext(gameStateContext);
  return (
    <div className={styles.gameplay}>
      <Display.Start visible={gameState === "to begin"} />
      <Display.Play visible={gameState === "playing"} />
      <Display.Pause visible={gameState === "paused"} />
      <Display.LevelChange visible={gameState === "level change"} />
      <Display.End visible={gameState === "ended"} />
    </div>
  );
}
