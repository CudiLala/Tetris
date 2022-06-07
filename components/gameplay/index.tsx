import styles from "styles/components/gameplay.module.css";
import GameBoard from "./gameboard";
import Controls from "./controls";

export default function GamePlay() {
  return (
    <div className={styles.gameplay}>
      <GameBoard />
      <Controls />
    </div>
  );
}
