import { cursor, game, timers, colorMap } from "game_engine";
import type { StartFnArgs } from "game_engine";
import GameEvent from "game_engine/events";
import { arrowText } from "types/components/gameplay";
import tetrominoes, { tetromino } from "game_engine/tetrominoes";
import styles from "styles/components/gameplay.module.css";

function addPositions(tetromino: tetromino, cursorX: number, cursorY: number) {
  const newTetromino = clone(tetromino);
  newTetromino.map = {};
  const { map: tMap, height: tHeight } = tetromino;

  for (let i = 0; i < tHeight; i++) {
    newTetromino.map[cursorY - (tHeight - 1 - i)] = clone(tMap[i]);
    for (let j = 0; j < tMap[i].length; j++) {
      newTetromino.map[cursorY - (tHeight - 1 - i)][j] = tMap[i][j] + cursorX;
    }
  }

  return newTetromino;
}

function clone<T>(item: T): T {
  return JSON.parse(JSON.stringify(item));
}

function createTetromino() {
  const type = Math.floor(Math.random() * 7);
  const rotation = Math.floor(Math.random() * 4);
  const color = Math.floor(Math.random() * 5) + 1;

  return { type, rotation, color };
}

function dropTile() {}

function generateEmptyBoard(width: number, height: number): number[][] {
  return new Array(height).fill(0).map((e) => new Array(width).fill(0));
}

function handleGameOver() {
  if (isGameOver()) GameEvent.emit("ended");
}

function handleTetrominoDownwardMovement(timestamp: number) {
  if (timestamp - timers.lastDropTime > 1000 - (game.level - 1) * 100) {
    timers.lastDropTime = timestamp;
    moveTileDown();
  }
}

function isBlockedDown() {
  const { type, rotation } = game.currentPiece;
  const tetrominoMap = addPositions(
    tetrominoes[type][rotation],
    cursor.x,
    cursor.y
  ).map;
  let blocked = false;

  iloop: for (let key in tetrominoMap) {
    let i = Number(key);

    if (i < -1) continue;
    if (i === 9) blocked = true;
    if (blocked) break iloop;

    for (let j = 0; j < tetrominoMap[i].length; j++) {
      blocked = !!game.logicBoardStore[i + 1][tetrominoMap[i][j]];
      if (blocked) break iloop;
    }
  }

  return blocked;
}

function isBlockedLeft() {
  const { type, rotation } = game.currentPiece;
  const tetrominoMap = addPositions(
    tetrominoes[type][rotation],
    cursor.x,
    cursor.y
  ).map;
  let blocked = false;

  iloop: for (let key in tetrominoMap) {
    let i = Number(key);

    jloop: for (let j = 0; j < tetrominoMap[i].length; j++) {
      if (tetrominoMap[i][j] === 0) {
        blocked = true;
        break iloop;
      }
      if (i < 0) continue jloop;

      blocked = !!game.logicBoardStore[i][tetrominoMap[i][j] - 1];
      if (blocked) break iloop;
    }
  }

  return blocked;
}

function isBlockedRight() {
  const { type, rotation } = game.currentPiece;
  const tetrominoMap = addPositions(
    tetrominoes[type][rotation],
    cursor.x,
    cursor.y
  ).map;
  let blocked = false;

  iloop: for (let key in tetrominoMap) {
    let i = Number(key);

    jloop: for (let j = 0; j < tetrominoMap[i].length; j++) {
      if (tetrominoMap[i][j] === 7) {
        blocked = true;
        break iloop;
      }
      if (i < 0) continue jloop;

      blocked = !!game.logicBoardStore[i][tetrominoMap[i][j] + 1];
      if (blocked) break iloop;
    }
  }

  return blocked;
}

function isBlocked(tetromino: tetromino, cursorX: number, cursorY: number) {
  const tetrominoMap = addPositions(tetromino, cursorX, cursorY).map;
  let blocked = false;

  iloop: for (let key in tetrominoMap) {
    let i = Number(key);

    for (let j = 0; j < tetrominoMap[i].length; j++) {
      if (tetrominoMap[i][j] < 0 || tetrominoMap[i][j] > 7) {
        blocked = true;
        break iloop;
      }
      if (i < 0) continue;

      blocked = !!game.logicBoardStore[i][tetrominoMap[i][j]];
      if (blocked) break iloop;
    }
  }

  return blocked;
}

function isGameOver() {
  const { type, rotation } = game.currentPiece;
  if (isBlockedDown() && cursor.y < tetrominoes[type][rotation].height - 1)
    return true;
  return false;
}

function moveTileDown() {
  if (!isBlockedDown()) return cursor.y++;
  GameEvent.emit("dropped");
}

function moveTileLeft() {
  if (!isBlockedLeft()) cursor.x--;
}

function moveTileRight() {
  if (!isBlockedRight()) cursor.x++;
}

function paintBoardsToDOM(
  tetrisBoard: StartFnArgs["tetrisBoard"],
  nextTileBoard: StartFnArgs["nextTileBoard"]
) {
  tetrisBoard.current?.querySelectorAll("div").forEach((elem, idx) => {
    elem.className =
      styles[colorMap[game.logicBoard[Math.floor(idx / 8)][idx % 8]]];
  });
  nextTileBoard.current?.querySelectorAll("div").forEach((elem, idx) => {
    elem.className =
      styles[colorMap[game.nextTileBoard[Math.floor(idx / 4)][idx % 4]]];
  });
}

function paintLogicBoard() {
  const { type, rotation, color } = game.currentPiece;
  const tetrominoMap = addPositions(
    tetrominoes[type][rotation],
    cursor.x,
    cursor.y
  ).map;
  const dummyBoard: number[][] = clone(game.logicBoardStore);

  for (let i in tetrominoMap) {
    if (Number(i) >= 0) {
      dummyBoard[i] = dummyBoard[i].map((elem, idx) =>
        tetrominoMap[i].includes(idx) ? color : elem
      );
    }
  }

  game.logicBoard = dummyBoard;
}

function paintNextTileBoard() {
  const { type: nType, rotation: nRotation, color: nColor } = game.nextPiece;
  const nTetrominoMap = addPositions(
    tetrominoes[nType][nRotation],
    2 - Math.floor(tetrominoes[nType][nRotation].width / 2),
    1 + Math.ceil(tetrominoes[nType][nRotation].height / 2)
  ).map;
  const nDummyBoard = generateEmptyBoard(4, 4);

  for (let i in nTetrominoMap) {
    if (Number(i) >= 0) {
      nDummyBoard[i] = nDummyBoard[i].map((elem, idx) =>
        nTetrominoMap[i].includes(idx) ? nColor : elem
      );
    }
  }

  game.nextTileBoard = nDummyBoard;
}

function pauseGame() {
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
      game.state = "playing";
      setGameState("playing");
      paintNextTileBoard();
    },
    "start event"
  );

  GameEvent.subscribe(
    "paused",
    () => {
      game.state = "paused";
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
      paintNextTileBoard();
    },
    "drop event"
  );

  GameEvent.subscribe(
    "ended",
    () => {
      game.state = "ended";
      unsubscribeFromEvents();
      resetGame();
      setGameState("ended");
      cancelAnimationFrame(timers.animationId);
    },
    "end event"
  );

  window.addEventListener("keydown", runKeyControls);
}

function reloadTile() {
  game.currentPiece = clone(game.nextPiece);
  game.nextPiece = createTetromino();
}

function resetCursor() {
  const { type, rotation } = game.currentPiece;
  cursor.y = -1;
  cursor.x = 4 - Math.ceil(tetrominoes[type][rotation].width / 2);
}

function resetGame() {
  game.new = true;
  game.state = "to begin";
  game.level = 1;
  game.logicBoard = generateEmptyBoard(8, 10);
  game.logicBoardStore = generateEmptyBoard(8, 10);
  game.nextTileBoard = generateEmptyBoard(4, 4);
  game.currentPiece = { type: 0, rotation: 0, color: 0 };
  game.nextPiece = { type: 0, rotation: 0, color: 0 };

  timers.animationId = 0;
  timers.lastDropTime = 0;

  cursor.x = 0;
  cursor.y = -1;
}

function rotateTile() {
  const clonedPiece = clone(game.currentPiece);
  clonedPiece.rotation++;
  clonedPiece.rotation %= 4;

  const clonedCursor = clone(cursor);
  const clonedTetromino = tetrominoes[clonedPiece.type][clonedPiece.rotation];

  if (isBlocked(clonedTetromino, cursor.x, cursor.y)) return;
  game.currentPiece = clone(clonedPiece);
  cursor.x += clonedTetromino.offset.x;
  cursor.y += clonedTetromino.offset.y;
}

function runKeyControls(e: KeyboardEvent) {
  if (game.state === "playing") {
    if (e.key === "ArrowLeft") moveTileLeft();
    if (e.key === "ArrowDown") dropTile();
    if (e.key === "ArrowUp") rotateTile();
    if (e.key === "ArrowRight") moveTileRight();
    if (e.key === " ") pauseGame();
  }
}

function runMouseControls(text: arrowText) {
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

async function startGame({
  setCountDown,
  nextTileBoard,
  tetrisBoard,
  setGameState,
}: StartFnArgs) {
  if (game.new) prepareGame(setGameState);
  await startCountDown(setCountDown);
  GameEvent.emit("started");

  function run(timestamp: number) {
    if (game.state === "playing") {
      paintLogicBoard();
      handleTetrominoDownwardMovement(timestamp);
      paintBoardsToDOM(tetrisBoard, nextTileBoard);
    }

    return requestAnimationFrame(run);
  }

  timers.animationId = requestAnimationFrame(run);
}

function storeLogicBoard() {
  game.logicBoardStore = clone(game.logicBoard);
}

function unsubscribeFromEvents() {
  GameEvent.events = {};
  window.removeEventListener("keydown", runKeyControls);
}

export { startGame, pauseGame, runMouseControls, generateEmptyBoard };
