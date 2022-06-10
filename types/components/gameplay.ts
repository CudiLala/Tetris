import React from "react";

export interface controls {
  impotent?: boolean;
}

export interface arrow extends controls {
  Arrow: React.ReactElement;
  text?: string;
}

export interface showboard {
  boxWidth: number;
  nextTile: number[][];
}
