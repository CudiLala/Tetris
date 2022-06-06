import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { ReactElement } from "react";

export type NextPageX = NextPage & {
  Layout?: (arg: {
    [key: string]: any;
    children: ReactElement;
  }) => ReactElement;
  LayoutProps?: { [key: string]: any };
};

export type AppPropsX = AppProps & {
  Component: NextPageX;
};
