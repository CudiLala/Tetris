import React from "react";

export interface buttonPrimary {
  children?: any | any[];
  colored?: boolean;
  fullWidth?: boolean;
  psuedo?: boolean;
  passProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}
