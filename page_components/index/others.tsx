import styles from "styles/components/gameplay.module.css";

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
