import React from "react";

export type arrowText =
  | "Left"
  | "L/Rotate"
  | "R/Rotate"
  | "Right"
  | "Drop"
  | "Hard Drop";

export interface controls {
  impotent?: boolean;
}

export interface arrow {
  Arrow: React.ReactElement;
  impotent?: boolean;
  text: arrowText;
}

export interface showboard {
  boxWidth: number;
  nextTileBoard: React.RefObject<HTMLDivElement>;
}
