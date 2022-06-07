import styles from "styles/components/gameplay.module.css";
import { BestToday } from "page_components/index";

export default function StartDisplay({ visible }: { visible: boolean }) {
  const className = `${styles.startgame} ${
    visible ? styles.visible : styles.invisible
  }`;
  return (
    <div className={className}>
      <BestToday />
    </div>
  );
}
