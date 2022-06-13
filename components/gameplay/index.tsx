import Display from "gameplay_components/index";
import React, { useContext, useEffect, useState } from "react";
import { gameStateContext } from "../app";
import styles from "styles/components/gameplay.module.css";

export const gameInfoCotext = React.createContext<
  [
    { score: number; level: number },
    React.Dispatch<React.SetStateAction<{ score: number; level: number }>>
  ]
>([{ score: 0, level: 1 }, () => {}]);

export function GamePlay() {
  const [gameState, setGameState] = useContext(gameStateContext);
  const [gameInfo, setGameInfo] = useState({ score: 0, level: 1 });

  return (
    <gameInfoCotext.Provider value={[gameInfo, setGameInfo]}>
      <div className={styles.gameplay}>
        <Display.Start visible={gameState === "to begin"} />
        <Display.Play visible={gameState === "playing"} />
        <Display.Pause visible={gameState === "paused"} />
        <Display.LevelChange visible={gameState === "level change"} />
        <Display.End visible={gameState === "ended"} />
      </div>
    </gameInfoCotext.Provider>
  );
}
