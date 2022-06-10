import { gameStateContext } from "components/app";
import {
  GameArrowDown,
  GameArrowLeft,
  GameArrowRight,
  GameArrowUp,
  MuteIcon,
  PauseIcon,
  PlayIcon,
  VolumeIcon,
} from "components/icons";
import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useContext,
} from "react";
import styles from "styles/components/gameplay.module.css";
import { arrow, controls, showboard } from "types/components/gameplay";
import { utils } from ".";
import { newBoard } from "./utils";

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
        Use the space bar or pause button to pause and resume
      </div>
    </div>
  );
}

function Arrow({ Arrow, impotent, text }: arrow) {
  return (
    <div className={styles.arrowContainer} tabIndex={0}>
      <div className={styles.arrow}>{Arrow}</div>
      {impotent && (
        <div className={`${styles.text} t-xlight noSelection`}>{text}</div>
      )}
    </div>
  );
}

export function Controls({ impotent }: controls) {
  return (
    <div className={styles.controls}>
      <Arrow Arrow={<GameArrowLeft />} impotent={impotent} text="Left" />
      <Arrow Arrow={<GameArrowDown />} impotent={impotent} text="Drop" />
      <Arrow Arrow={<GameArrowUp />} impotent={impotent} text="Rotate" />
      <Arrow Arrow={<GameArrowRight />} impotent={impotent} text="Right" />
    </div>
  );
}

export function TetrisBoard() {
  const [width, setWidth] = useState(0);
  const [gameState, setGameState] = useContext(gameStateContext);

  const tetrisBoard = useRef<HTMLDivElement>(null);
  const nextTileBoard = useRef<HTMLDivElement>(null);

  const [countDown, setCountDown] = useState<number>();

  const boxWidth = (width - 7 * 4) / 8;
  const style: React.CSSProperties = {
    gridTemplateColumns: `repeat(8, ${boxWidth}px)`,
    gridAutoRows: `${boxWidth}px`,
  };

  function resizeWidth() {
    const height = (tetrisBoard.current?.clientHeight || 20) - 20;
    const width = (tetrisBoard.current?.clientWidth || 20) - 20;

    setWidth(Math.min(width, height * 0.8));
  }

  /*eslint-disable*/
  useLayoutEffect(() => {
    resizeWidth();
  }, []);

  useEffect(() => {
    if (gameState === "playing")
      utils.startGame({
        setCountDown,
        nextTileBoard,
        tetrisBoard,
        setGameState,
      });
    if (gameState === "paused") utils.pauseGame();
  }, [gameState]);

  useEffect(() => {
    window.addEventListener("resize", resizeWidth);
    return () => window.addEventListener("resize", resizeWidth);
  }, []);
  /*eslint-enable*/

  return (
    <div className={styles.gameboard}>
      {countDown !== undefined && (
        <div className={`${styles.countdown} t-mono`}>{countDown}</div>
      )}
      <ShowBoard boxWidth={(boxWidth * 3) / 4} nextTileBoard={nextTileBoard} />
      <div className={styles.tetrisboard} ref={tetrisBoard} style={style}>
        {newBoard(8, 10).map((o, i) => (
          <>
            {o.map((e, idx) => (
              <div key={i * 8 + idx} className={styles.none} />
            ))}
          </>
        ))}
      </div>
    </div>
  );
}

export function ShowBoard({ boxWidth, nextTileBoard }: showboard) {
  const style: React.CSSProperties = {
    gridTemplateColumns: `repeat(4, ${boxWidth}px)`,
    gridAutoRows: `${boxWidth}px`,
  };

  return (
    <div className={styles.showboard}>
      <div className={styles.nextTileContainer}>
        <div ref={nextTileBoard} className={styles.nextTile} style={style}>
          {newBoard(4, 4).map((o, i) => (
            <>
              {o.map((e, idx) => (
                <div key={i * 4 + idx} className={styles.none} />
              ))}
            </>
          ))}
        </div>
      </div>
      <div className={styles.pauseAndMuteContainer}>
        <div className={styles.pause}>
          <PauseButton />
        </div>
        <div className={styles.mute}>
          <MuteButton />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div>
          <div className={`${styles.score} ${styles.info} t-mono`}>
            <div>Sc:</div>
            <div>&ensp;XXX</div>
          </div>
          <div className={`${styles.level} ${styles.info} t-mono`}>
            <div>Lv:</div>
            <div>&ensp;XX</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PauseButton() {
  const [gameState, setGameState] = useContext(gameStateContext);

  function switchGameState() {
    setGameState((prev) =>
      prev === "paused" ? "playing" : prev === "playing" ? "paused" : prev
    );
  }

  return (
    <button onClick={switchGameState}>
      <span className={`${gameState === "paused" ? styles.active : ""}`}>
        <PlayIcon />
      </span>
      <span className={`${gameState === "playing" ? styles.active : ""}`}>
        <PauseIcon />
      </span>
    </button>
  );
}

export function MuteButton() {
  const [muted, setMuted] = useState(false);

  return (
    <button onClick={() => setMuted((prev) => !prev)}>
      <span className={`${muted ? styles.active : ""}`}>
        <VolumeIcon />
      </span>
      <span className={`${!muted ? styles.active : ""}`}>
        <MuteIcon />
      </span>
    </button>
  );
}
