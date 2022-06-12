import { gameStateContext } from "components/app";
import { useContext } from "react";
import styles from "styles/components/gameplay.module.css";

export default function PauseDisplay({ visible }: { visible: boolean }) {
  const [gameState, setGameState] = useContext(gameStateContext);

  const className = `${styles.startgame} ${
    visible ? styles.visible : styles.invisible
  }`;
  return (
    <div className={className} style={{ padding: "5rem" }}>
      Paused Game
      <button onClick={() => setGameState("playing")}>change</button>
    </div>
  );
}
