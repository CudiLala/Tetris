import React from "react";
import { gameStates } from "types/pages";
import styles from "styles/components/gameplay.module.css";
import GameEvent from "./events";

interface game {
  new: boolean;
  state: gameStates;
  level: number;
  nextTile: number[][];
  currentTile: number[][];
  logicBoard: number[][];
  logicBoardStore: number[][];
}

interface startFnArgs {
  setCountDown: React.Dispatch<React.SetStateAction<number | undefined>>;
  nextTileBoard: React.RefObject<HTMLDivElement>;
  tetrisBoard: React.RefObject<HTMLDivElement>;
  setGameState: React.Dispatch<React.SetStateAction<gameStates>>;
}

const game: game = {
  new: true,
  state: "to begin",
  level: 1,
  nextTile: newBoard(4, 4),
  currentTile: newBoard(4, 4),
  logicBoard: newBoard(8, 10),
  logicBoardStore: newBoard(8, 10),
};

const timers = {
  lastDropTime: 0,
  lastShiftTime: 0,
};

const cursor = {
  bottom: 0,
  left: 2,
};

export async function startGame({
  setCountDown,
  nextTileBoard,
  tetrisBoard,
  setGameState,
}: startFnArgs) {
  if (game.new) prepareGame();
  await startCountDown(setCountDown);

  function run(timestamp: number) {
    handleTileDownwardMovement(timestamp);

    paintDom(tetrisBoard, nextTileBoard);
    return requestAnimationFrame(run);
  }

  requestAnimationFrame(run);
}

function prepareGame() {
  game.currentTile = createTile();
  game.nextTile = createTile();

  game.new = false;
  game.state = "playing";
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
  if (cursor.bottom > 9) {
    GameEvent.emit("dropped");
    return;
  }

  const [tiles, numberOfRows, highestRow] = getPositions(game.currentTile);
  const dummyBoard: number[][] = clone(game.logicBoardStore);
  const tileMap: { [key: number]: number[] } = {};
  let color = 1;

  //getting color of current tile
  game.currentTile.some((row) =>
    row.find((elem) => {
      if (elem) {
        color = elem;
        return true;
      }
      return false;
    })
  );

  tiles.forEach((arr) => {
    tileMap[highestRow - arr[0]] = tileMap[highestRow - arr[0]]
      ? [...tileMap[highestRow - arr[0]], cursor.left + arr[1]]
      : [cursor.left + arr[1]];
  });

  let i = 0;
  while (i < Math.min(numberOfRows, cursor.bottom + 1)) {
    dummyBoard[cursor.bottom - i] = dummyBoard[cursor.bottom - i].map(
      (elem, idx) => {
        return tileMap[i].includes(idx) ? color : elem;
      }
    );
    i++;
  }

  game.logicBoard = dummyBoard;

  cursor.bottom++;
}

function getPositions(board: number[][]): [number[][], number, number] {
  const arr: number[][] = [];
  let rows: { [key: number]: any } = {};

  board.forEach((row, i) =>
    row.forEach((elem, j) => {
      if (elem) {
        arr.push([i, j]);
        rows[i] = "";
      }
    })
  );

  let rowsArray: any[] = Object.keys(rows);

  return [arr, rowsArray.length, Math.max(...rowsArray)];
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

  board = JSON.parse(JSON.stringify(board));

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

  const freshBoard = board.map((row) => [...row]);

  for (let i = 0; i < freshBoard.length; i++) {
    for (let j = 0; j < freshBoard[i].length; j++) {
      freshBoard[i][j] = board[j][freshBoard.length - 1 - i];
    }
  }

  return rotate(freshBoard, num - 1);
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
  if (typeof item !== "object") return item;

  if (item === null) return null;

  if (Array.isArray(item)) {
    const newItem: any[] = [];
    item.forEach((elem, idx) => {
      newItem[idx] = clone(elem);
    });
    return newItem;
  }

  const newItem: { [key: string]: any } = {};
  for (let key in item) {
    newItem[key] = clone(item[key]);
  }
  return newItem;
}
