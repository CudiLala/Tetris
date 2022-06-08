import { default as Play } from "./gameDisplay";
import { default as Start } from "./startDisplay";
import { default as Pause } from "./pauseDisplay";
import { default as LevelChange } from "./levelChange";
import { default as End } from "./endDisplay";

const Display = { Play, Start, Pause, LevelChange, End };

export default Display;
export { Play, Start, Pause, LevelChange, End };
export {
  BestToday,
  Instruction,
  Controls,
  TetrisBoard,
  ShowBoard,
} from "./others";
