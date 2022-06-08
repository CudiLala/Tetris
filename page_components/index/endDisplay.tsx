import styles from "styles/components/gameplay.module.css";
import { Instruction } from ".";

export default function EndDisplay({ visible }: { visible: boolean }) {
  const className = `${styles.startgame} ${
    visible ? styles.visible : styles.invisible
  }`;
  return (
    <div className={className}>
      {/* <BestToday /> */}
      <Instruction />
    </div>
  );
}
