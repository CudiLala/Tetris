import React from "react";
import { gameStates } from "types/pages";
import styles from "styles/components/gameplay.module.css";
import GameEvent from "./events";
import { arrowText } from "types/components/gameplay";

type NumPosMap = { [key: number]: number[] };
type TileMap = {
  rowMap: NumPosMap;
  width: number;
  height: number;
};

interface game {
  new: boolean;
  state: gameStates;
  level: number;
  nextTile: number[][];
  currentTile: number[][];
  logicBoard: number[][];
  logicBoardStore: number[][];
  currentTileMap: TileMap;
}

interface startFnArgs {
  setCountDown: React.Dispatch<React.SetStateAction<number | undefined>>;
  nextTileBoard: React.RefObject<HTMLDivElement>;
  tetrisBoard: React.RefObject<HTMLDivElement>;
  setGameState: React.Dispatch<React.SetStateAction<gameStates>>;
}

let game: game = {
  new: true,
  state: "to begin",
  level: 1,
  nextTile: newBoard(4, 4),
  currentTile: newBoard(4, 4),
  logicBoard: newBoard(8, 10),
  logicBoardStore: newBoard(8, 10),
  currentTileMap: { rowMap: {}, width: 0, height: 0 },
};

let timers = {
  lastDropTime: 0,
  lastShiftTime: 0,
  animationId: 0,
  lastCheckTime: 0,
};

let cursor = {
  bottom: -1,
  left: 2,
};

export async function startGame({
  setCountDown,
  nextTileBoard,
  tetrisBoard,
  setGameState,
}: startFnArgs) {
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

function prepareGame(setGameState: startFnArgs["setGameState"]) {
  game.currentTile = createTile();
  game.nextTile = createTile();
  game.currentTileMap = getCurrentTileMap();

  game.new = false;

  resetCursor();

  GameEvent.subscribe(
    "dropped",
    () => {
      reloadTile();
      storeLogicBoard();
      resetCursor();
      handleGameOver();
    },
    "drop event"
  );

  GameEvent.subscribe(
    "ended",
    () => {
      unsubscribeFromEvents();
      resetGame();
      setGameState("ended");
      cancelAnimationFrame(timers.animationId);
    },
    "end event"
  );
}

function startCountDown(setCountDown: startFnArgs["setCountDown"]) {
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

function paint() {
  const { rowMap, width, height } = getCurrentTileAbsoluteMap();
  const dummyBoard: number[][] = clone(game.logicBoardStore);
  const color = getColor(game.currentTile);

  for (let i in rowMap) {
    if (Number(i) >= 0) {
      dummyBoard[i] = dummyBoard[i].map((elem, idx) =>
        rowMap[i].includes(idx) ? color : elem
      );
    }
  }

  game.logicBoard = dummyBoard;
}

function paintDom(
  tetrisBoard: startFnArgs["tetrisBoard"],
  nextTileBoard: startFnArgs["nextTileBoard"]
) {
  tetrisBoard.current?.querySelectorAll("div").forEach((elem, idx) => {
    elem.className =
      styles[colorMap[game.logicBoard[Math.floor(idx / 8)][idx % 8]]];
  });
  nextTileBoard.current?.querySelectorAll("div").forEach((elem, idx) => {
    elem.className =
      styles[colorMap[game.nextTile[Math.floor(idx / 4)][idx % 4]]];
  });
}

function handleTileDownwardMovement(timestamp: number) {
  if (timestamp - timers.lastDropTime > 1000 - (game.level - 1) * 100) {
    timers.lastDropTime = timestamp;
    moveTileDown();
  }
}

function moveTileDown() {
  if (isBlockedBown()) {
    GameEvent.emit("dropped");
    return;
  }

  cursor.bottom++;
}

function getCurrentTileMap(): TileMap {
  const rowMap: NumPosMap = {};
  let rowIdx = 0;

  for (let i = 0; i < game.currentTile.length; i++) {
    let foundRowElem = false;

    for (let j = 0; j < game.currentTile.length; j++) {
      const rowElem = game.currentTile[i][j];
      if (rowElem) {
        rowMap[rowIdx] = rowMap[rowIdx] ? [...rowMap[rowIdx], j] : [j];
        foundRowElem = true;
      }
    }

    if (foundRowElem) ++rowIdx;
    foundRowElem = false;
  }

  let height = Object.keys(rowMap).length;
  let maximum = -Infinity;
  let minimum = Infinity;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < rowMap[i].length; j++) {
      minimum = Math.min(minimum, rowMap[i][j]);
      maximum = Math.max(maximum, rowMap[i][j]);
    }
  }

  if (minimum !== 0) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < rowMap[i].length; j++) {
        rowMap[i][j] = rowMap[i][j] - minimum;
      }
    }
  }

  const width = maximum - minimum + 1;

  return { rowMap, width, height };
}

function getCurrentTileAbsoluteMap(): TileMap {
  const { rowMap, width, height } = game.currentTileMap;
  const newMap: NumPosMap = {};

  for (let i = 0; i < height; i++) {
    newMap[cursor.bottom - (height - 1 - i)] = clone(rowMap[i]);
    for (let j = 0; j < rowMap[i].length; j++) {
      newMap[cursor.bottom - (height - 1 - i)][j] = rowMap[i][j] + cursor.left;
    }
  }

  return {
    rowMap: newMap,
    width,
    height,
  };
}

function getColor(board: number[][]) {
  let color = 1;
  game.currentTile.some((row) =>
    row.some((elem) => {
      if (elem) {
        color = elem;
        return true;
      }
      return false;
    })
  );
  return color;
}

function reloadTile() {
  game.currentTile = clone(game.nextTile);
  game.currentTileMap = getCurrentTileMap();
  game.nextTile = createTile();
}

function storeLogicBoard() {
  game.logicBoardStore = clone(game.logicBoard);
}

function resetCursor() {
  cursor.bottom = -1;
  cursor.left = 4 - Math.ceil(game.currentTileMap.width / 2);
}

function isBlockedBown() {
  const { rowMap } = getCurrentTileAbsoluteMap();
  let blocked = false;

  iloop: for (let key in rowMap) {
    let i = Number(key);

    if (i < -1) continue;
    if (i === 9) blocked = true;
    if (blocked) break iloop;

    for (let j = 0; j < rowMap[i].length; j++) {
      blocked = !!game.logicBoardStore[i + 1][rowMap[i][j]];
      if (blocked) break iloop;
    }
  }

  return blocked;
}

function isBlockedLeft() {
  return true;
}
function isBlockedRight() {
  return true;
}

export function pauseGame() {
  game.state = "paused";
}

const tiles: { [key: number]: number[][] } = {
  [1]: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [2]: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [3]: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [0, 0, 0, 0],
  ],
  [4]: [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
  ],
  [5]: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
};

function createTile() {
  const n1 = Math.floor(Math.random() * 5) + 1;
  const n2 = Math.floor(Math.random() * 2);
  const n3 = Math.floor(Math.random() * 4);
  const n4 = Math.floor(Math.random() * 5) + 1;

  return rotate(flip(tiles[n1], n2), n3).map((row) =>
    [...row].map((elem) => (elem ? n4 : 0))
  );
}

function flip(board: number[][], num: number) {
  if (num === 0) return board;

  board = clone(board);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length / 2; j++) {
      let x = board[i][j];
      board[i][j] = board[i][board.length - j - 1];
      board[i][board.length - j - 1] = x;
    }
  }

  return board;
}

function rotate(board: number[][], num: number): number[][] {
  if (num === 0) return board;

  const freshBoard = clone(board);

  for (let i = 0; i < freshBoard.length; i++) {
    for (let j = 0; j < freshBoard[i].length; j++) {
      freshBoard[i][j] = board[j][freshBoard.length - 1 - i];
    }
  }

  return rotate(freshBoard, num - 1);
}

function handleGameOver() {
  if (isGameOver()) GameEvent.emit("ended");
}

function isGameOver() {
  const { height } = game.currentTileMap;
  if (isBlockedBown() && cursor.bottom - 1 < height) return true;
  return false;
}

function unsubscribeFromEvents() {
  GameEvent.unsubscribe("drop event");
  GameEvent.unsubscribe("end event");
}

function resetGame() {
  game = {
    new: true,
    state: "to begin",
    level: 1,
    nextTile: newBoard(4, 4),
    currentTile: newBoard(4, 4),
    logicBoard: newBoard(8, 10),
    logicBoardStore: newBoard(8, 10),
    currentTileMap: { rowMap: {}, width: 0, height: 0 },
  };

  timers = {
    lastDropTime: 0,
    lastShiftTime: 0,
    lastCheckTime: 0,
    animationId: 0,
  };

  cursor = {
    bottom: -1,
    left: 2,
  };
}

function moveTileLeft() {
  if (!isBlockedLeft()) cursor.left--;
}
function dropTile() {
  console.log("clicked drop");
}
function rotateTile() {
  console.log("clicked rotate");
}
function moveTileRight() {
  if (!isBlockedRight()) cursor.left++;
}

export function runControls(text: arrowText) {
  if (game.state === "playing") {
    if (text === "Left") moveTileLeft();
    if (text === "Drop") dropTile();
    if (text === "Rotate") rotateTile();
    if (text === "Right") moveTileRight();
  }
}

export function newBoard(width: number, height: number): number[][] {
  return new Array(height).fill(0).map((e) => new Array(width).fill(0));
}

export const colorMap: { [key: number]: string } = {
  [0]: "none",
  [1]: "red",
  [2]: "orange",
  [3]: "green",
  [4]: "blue",
  [5]: "purple",
};

function clone(item: any) {
  return JSON.parse(JSON.stringify(item));
}
