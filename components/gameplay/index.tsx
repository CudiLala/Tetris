import Display from "page_components/index";
import styles from "styles/components/gameplay.module.css";
import React, { useContext } from "react";
import { gameStateContext } from "components/app";

export default function GamePlay() {
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
