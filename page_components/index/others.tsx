import {
  GameArrowDown,
  GameArrowLeft,
  GameArrowRight,
  GameArrowUp,
} from "components/icons";
import styles from "styles/components/gameplay.module.css";
import { controls } from "types/components/gameplay";

export function BestToday() {
  return (
    <div className={styles.bestToday}>
      <div className={styles.header}>
        &#127942;
        <span className="t-carter" style={{ fontSize: "1.8rem" }}>
          Best Today
        </span>
        &#127942;
      </div>
      <div className={styles.body}>
        <div className={styles.avatarBox}>
          <div className={styles.avatar}></div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.username}></div>
          <div className={styles.score}></div>
        </div>
      </div>
    </div>
  );
}

export function Instruction() {
  return (
    <div className={`${styles.instruction} t-thin`}>
      <div className={styles.text}>
        Use the arrow keys or the controls bar for controls
      </div>
      <Controls impotent />
      <div className={styles.spacer} />
      <div className={styles.text}>
        Use the space bar or pause button to pause
      </div>
    </div>
  );
}

export function Controls({ impotent }: controls) {
  return (
    <div className={styles.controls}>
      <div className={styles.arrowContainer} tabIndex={0}>
        <div className={styles.arrow}>
          <GameArrowLeft />
        </div>
        <div className={`${styles.text} t-xlight noSelection`}>Left</div>
      </div>
      <div className={styles.arrowContainer} tabIndex={0}>
        <div className={styles.arrow}>
          <GameArrowDown />
        </div>
        <div className={`${styles.text} t-xlight noSelection`}>Drop</div>
      </div>
      <div className={styles.arrowContainer} tabIndex={0}>
        <div className={styles.arrow}>
          <GameArrowUp />
        </div>
        <div className={`${styles.text} t-xlight noSelection`}>Rotate</div>
      </div>
      <div className={styles.arrowContainer} tabIndex={0}>
        <div className={styles.arrow}>
          <GameArrowRight />
        </div>
        <div className={`${styles.text} t-xlight noSelection`}>Right</div>
      </div>
    </div>
  );
}
