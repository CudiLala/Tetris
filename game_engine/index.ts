import { gameStates } from "types/pages";
import { generateEmptyBoard } from "./utils";

export interface StartFnArgs {
  setCountDown: React.Dispatch<React.SetStateAction<number | undefined>>;
  nextTileBoard: React.RefObject<HTMLDivElement>;
  tetrisBoard: React.RefObject<HTMLDivElement>;
  setGameState: React.Dispatch<React.SetStateAction<gameStates>>;
}

export const colorMap: { [key: number]: string } = {
  [0]: "none",
  [1]: "red",
  [2]: "orange",
  [3]: "green",
  [4]: "blue",
  [5]: "purple",
  [6]: "white",
};

export const cursor = { x: 0, y: -1 };

export const game = {
  new: true,
  state: "to begin",
  level: 1,
  logicBoard: generateEmptyBoard(8, 10),
  logicBoardStore: generateEmptyBoard(8, 10),
  nextTileBoard: generateEmptyBoard(4, 4),
  currentPiece: { type: 0, rotation: 0, color: 0 },
  nextPiece: { type: 0, rotation: 0, color: 0 },
};

export const timers = {
  animationId: 0,
  lastDropTime: 0,
};

export {
  startGame,
  pauseGame,
  runMouseControls,
  generateEmptyBoard,
} from "./utils";
