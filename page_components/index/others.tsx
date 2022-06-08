import {
  GameArrowDown,
  GameArrowLeft,
  GameArrowRight,
  GameArrowUp,
} from "components/icons";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import styles from "styles/components/gameplay.module.css";
import { controls, showboard } from "types/components/gameplay";

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

export function GameBoard() {
  const [width, setWidth] = useState(0);
  const gameboard = useRef<HTMLDivElement>(null);

  const boxWidth = (width - 7 * 5) / 8;
  const style: React.CSSProperties = {
    gridTemplateColumns: `repeat(8, ${boxWidth}px)`,
    gridAutoRows: `${boxWidth}px`,
  };

  function resizeWidth() {
    setWidth(Math.min(gameboard.current?.clientWidth || 0, 320));
  }

  useLayoutEffect(() => {
    resizeWidth();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeWidth);
    return () => window.addEventListener("resize", resizeWidth);
  }, []);

  return (
    <>
      <ShowBoard boxWidth={boxWidth / 1.5} />
      <div className={styles.gameboard} ref={gameboard} style={style}>
        {new Array(80).fill(0).map((e, idx) => (
          <div key={idx} />
        ))}
      </div>
    </>
  );
}

export function ShowBoard({ boxWidth }: showboard) {
  const style: React.CSSProperties = {
    gridTemplateColumns: `repeat(4, ${boxWidth}px)`,
    gridAutoRows: `${boxWidth}px`,
  };

  return (
    <div className={styles.showboard}>
      <div className={styles.nextTileContainer}>
        <div className={styles.nextTile} style={style}>
          {new Array(16).fill(0).map((e, idx) => (
            <div key={idx} />
          ))}
        </div>
      </div>
      <div className={styles.pauseAndMuteContainer}>
        <div className={styles.pause}></div>
        <div className={styles.mute}></div>
      </div>
      <div className={styles.infoContainer}>
        <div>
          <div className={styles.score}></div>
          <div className={styles.level}></div>
        </div>
      </div>
    </div>
  );
}
