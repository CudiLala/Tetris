import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { gameStates } from "types/pages";

export const gameStateContext = React.createContext<
  [gameStates, React.Dispatch<React.SetStateAction<gameStates>>]
>(["to begin", () => {}]);

interface App {
  children: ReactElement;
}

export default function App({ children }: App) {
  const router = useRouter();
  const [gameState, setGameState] = useState<gameStates>("to begin");

  function pauseGame() {
    if (gameState === "playing") setGameState("paused");
  }

  useEffect(() => {
    router.events.on("routeChangeStart", pauseGame);
    return () => router.events.off("routeChangeStart", pauseGame);
  });

  return (
    <gameStateContext.Provider value={[gameState, setGameState]}>
      <div id="body">{children}</div>
    </gameStateContext.Provider>
  );
}
