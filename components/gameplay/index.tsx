import Display from "page_components/index";
import { useState } from "react";
import styles from "styles/components/gameplay.module.css";
import { gameStates } from "types/pages";
import React from "react";

export const gameStateContext = React.createContext<
  [gameStates, React.Dispatch<React.SetStateAction<gameStates>>]
>(["to begin", () => {}]);

export default function GamePlay() {
  const [gameState, setGameState] = useState<gameStates>("to begin");

  return (
    <gameStateContext.Provider value={[gameState, setGameState]}>
      <div className={styles.gameplay}>
        <Display.Start visible={gameState === "to begin"} />
        <Display.Play visible={gameState === "playing"} />
        <Display.Pause visible={gameState === "paused"} />
        <Display.LevelChange visible={gameState === "level change"} />
        <Display.End visible={gameState === "ended"} />
      </div>
    </gameStateContext.Provider>
  );
}
