import React from "react";
import type { NextPageX } from "types/app";
import MainLayout from "components/layouts";
import GamePlay from "components/gameplay";

const Home: NextPageX = () => {
  return (
    <>
      <GamePlay />
    </>
  );
};

Home.Layout = MainLayout;
export default Home;
