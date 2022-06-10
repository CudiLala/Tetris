import { gameStateContext } from "components/app";
import { useContext } from "react";
import styles from "styles/components/gameplay.module.css";

export default function EndDisplay({ visible }: { visible: boolean }) {
  const [, setGameState] = useContext(gameStateContext);

  const className = `${styles.startgame} ${
    visible ? styles.visible : styles.invisible
  }`;
  return (
    <div className={className}>
      restart <button onClick={() => setGameState("playing")}>Restart</button>
    </div>
  );
}
