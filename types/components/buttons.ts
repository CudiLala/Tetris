import React from "react";

export interface buttonPrimary {
  children?: any | any[];
  colored?: boolean;
  fullWidth?: boolean;
  psuedo?: boolean;
  whiteShadow?: boolean;
  passProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}
