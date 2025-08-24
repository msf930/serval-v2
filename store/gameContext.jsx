"use client";
import { createContext, useContext, useState } from "react";


const useGameState = (initialGame) => useState(initialGame);

const GameContext = createContext(null);

const GameProvider = ({ game: initialGame, children }) => {
  const [game, setGame] = useGameState(initialGame);

  return (
    <GameContext.Provider value={[game, setGame]}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;

export const useGameContext = () => {
  const user = useContext(GameContext);
  if (!user) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return user;
};