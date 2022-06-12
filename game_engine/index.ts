import { gameStates } from "types/pages";
import { generateEmptyBoard } from "./utils";

export interface StartFnArgs {
  setCountDown: React.Dispatch<React.SetStateAction<number | undefined>>;
  nextTileBoard: React.RefObject<HTMLDivElement>;
  tetrisBoard: React.RefObject<HTMLDivElement>;
  setGameState: React.Dispatch<React.SetStateAction<gameStates>>;
}

export const game = {
  new: true,
  state: "to begin",
  logicBoard: generateEmptyBoard(8, 10),
  logicBoardStore: generateEmptyBoard(8, 10),
  currentPiece: { type: 0, rotation: 0, color: 0 },
  nextPiece: { type: 0, rotation: 0, color: 0 },
};

export const timers = {
  animationId: 0,
};

export const cursor = { x: 0, y: -1 };

export {
  startGame,
  pauseGame,
  runMouseControls,
  generateEmptyBoard,
} from "./utils";
