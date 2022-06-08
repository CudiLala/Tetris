import styles from "styles/components/gameplay.module.css";
import { Controls, TetrisBoard, ShowBoard } from ".";

export default function GameDisplay({ visible }: { visible: boolean }) {
  const className = `${styles.gameDisplay} ${
    visible ? styles.visible : styles.invisible
  }`;
  return (
    <div className={className}>
      <TetrisBoard />
      <Controls />
    </div>
  );
}
