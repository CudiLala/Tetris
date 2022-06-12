import { cursor, game, timers } from "game_engine";
import type { StartFnArgs } from "game_engine";
import GameEvent from "game_engine/events";
import { arrowText } from "types/components/gameplay";
import tetrominoes, { tetromino } from "game_engine/tetrominoes";

function clone<T>(item: T): T {
  return JSON.parse(JSON.stringify(item));
}

function createTetromino() {
  const type = Math.floor(Math.random() * 7);
  const rotation = Math.floor(Math.random() * 4);
  const color = Math.floor(Math.random() * 5) + 1;

  return { type, rotation, color };
}

export function generateEmptyBoard(width: number, height: number): number[][] {
  return new Array(height).fill(0).map((e) => new Array(width).fill(0));
}

function addPositions(tetromino: tetromino, cursorX: number, cursorY: number) {
  const newTetronimo = clone(tetromino);
  newTetronimo.map = {};
  const { map: tMap, height: tHeight } = tetromino;

  for (let i = 0; i < tHeight; i++) {
    newTetronimo.map[cursorY - (tHeight - 1 - i)] = clone(tMap[i]);
    for (let j = 0; j < tMap[i].length; j++) {
      newTetronimo.map[cursorY - (tHeight - 1 - i)][j] = tMap[i][j] + cursorX;
    }
  }

  return newTetronimo;
}

function handleKeyControls(e: KeyboardEvent) {
  if (game.state === "playing") {
    if (e.key === "ArrowLeft") moveTileLeft();
    if (e.key === "ArrowDown") dropTile();
    if (e.key === "ArrowUp") rotateTile();
    if (e.key === "ArrowRight") moveTileRight();
    if (e.key === " ") pauseGame();
  }
}

export function pauseGame() {
  GameEvent.emit("paused");
}

function prepareGame(setGameState: StartFnArgs["setGameState"]) {
  game.currentPiece = createTetromino();
  game.nextPiece = createTetromino();

  game.new = false;

  resetCursor();

  GameEvent.subscribe(
    "started",
    () => {
      game.state === "playing";
      setGameState("playing");
    },
    "start event"
  );

  GameEvent.subscribe(
    "paused",
    () => {
      game.state === "paused";
      setGameState("paused");
    },
    "pause event"
  );

  GameEvent.subscribe(
    "dropped",
    () => {
      handleGameOver();
      storeLogicBoard();
      resetCursor();
      reloadTile();
    },
    "drop event"
  );

  GameEvent.subscribe(
    "ended",
    () => {
      game.state === "ended";
      unsubscribeFromEvents();
      resetGame();
      setGameState("ended");
      cancelAnimationFrame(timers.animationId);
    },
    "end event"
  );

  window.addEventListener("keydown", handleKeyControls);
}

function resetCursor() {
  const { type, rotation } = game.currentPiece;
  cursor.y = -1;
  cursor.x = 4 - Math.ceil(tetrominoes[type][rotation].width / 2);
}

export function runMouseControls(text: arrowText) {
  if (game.state === "playing") {
    if (text === "Left") moveTileLeft();
    if (text === "Drop") dropTile();
    if (text === "Rotate") rotateTile();
    if (text === "Right") moveTileRight();
  }
}

function startCountDown(setCountDown: StartFnArgs["setCountDown"]) {
  return new Promise((resolve) => {
    const intervalId = setInterval(run, 1000);
    let countdown = 4;

    function run() {
      setCountDown(--countdown);
      if (countdown < 0) {
        setCountDown(undefined);
        clearInterval(intervalId);
        resolve(undefined);
      }
    }
  });
}

export async function startGame({
  setCountDown,
  nextTileBoard,
  tetrisBoard,
  setGameState,
}: StartFnArgs) {
  if (game.new) prepareGame(setGameState);
  await startCountDown(setCountDown);
  game.state = "playing";

  function run(timestamp: number) {
    if (game.state === "playing") {
      paint();
      handleTileDownwardMovement(timestamp);
    }

    paintDom(tetrisBoard, nextTileBoard);

    return requestAnimationFrame(run);
  }

  timers.animationId = requestAnimationFrame(run);
}

function unsubscribeFromEvents() {
  GameEvent.events = {};

  window.removeEventListener("keydown", handleKeyControls);
}
