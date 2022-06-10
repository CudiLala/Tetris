import React from "react";
import { gameStates } from "types/pages";

interface startFnArgs {
  setCountDown: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNextTile: React.Dispatch<React.SetStateAction<number[][]>>;
  setTetrisLogicBoard: React.Dispatch<React.SetStateAction<number[][]>>;
  setGameState: React.Dispatch<React.SetStateAction<gameStates>>;
}

const game = {
  new: true,
  state: "to begin",
  nextTile: newBoard(4, 4),
  currentTile: newBoard(4, 4),
  logicboard: newBoard(8, 10),
  logicboardstore: newBoard(8, 10),
};

const cursors = {
  bottomCursor: 0,
};

const timers: { [key: string]: any } = {
  dropId: 0,
  loopId: 0,
};

export async function startGame({
  setCountDown,
  setNextTile,
  setTetrisLogicBoard,
  setGameState,
}: startFnArgs) {
  if (game.new) prepareGame(setNextTile);
  await startCountDown(setCountDown);

  timers.dropId = setInterval(dropTile, 1000);
  timers.loopId = setInterval(() => setTetrisLogicBoard(game.logicboard), 16);
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

export function pauseGame() {
  game.state = "paused";
  clearInterval(timers.dropId);
  clearInterval(timers.loopId);
}

function prepareGame(setNextTile: startFnArgs["setNextTile"]) {
  game.currentTile = createTile();
  game.nextTile = createTile();

  game.new = false;
  game.state = "playing";

  setNextTile(game.nextTile);
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

  return rotate(flip(tiles[n1], n2), n3).map((e) =>
    [...e].map((e) => (e ? n4 : 0))
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

  const newboard = board.map((e) => [...e]);

  for (let i = 0; i < newboard.length; i++) {
    for (let j = 0; j < newboard[i].length; j++) {
      newboard[i][j] = board[j][newboard.length - 1 - i];
    }
  }

  return rotate(newboard, num - 1);
}

function dropTile() {
  if (cursors.bottomCursor > 9) {
    clearInterval(timers.dropId);
    return;
  }

  const dummyboard = game.logicboardstore.map((e) => [...e]);
  dummyboard[cursors.bottomCursor] = [1, 1, 1, 0, 0, 0, 0, 0];

  game.logicboard = dummyboard;

  cursors.bottomCursor++;
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
