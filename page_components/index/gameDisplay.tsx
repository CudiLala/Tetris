import styles from "styles/components/gameplay.module.css";
import { Controls, GameBoard, ShowBoard } from ".";

export default function GameDisplay({ visible }: { visible: boolean }) {
  const className = `${styles.startgame} ${
    visible ? styles.visible : styles.invisible
  }`;
  return (
    <div className={className}>
      <GameBoard />
      <Controls />
    </div>
  );
}
