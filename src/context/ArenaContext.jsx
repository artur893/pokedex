import { createContext, useState } from "react";

export const ArenaContext = createContext();

export function ArenaProvider({ children }) {
  const [arenaContextData, setArenaContextData] = useState([]);

  return (
    <ArenaContext.Provider value={{ arenaContextData, setArenaContextData }}>
      {children}
    </ArenaContext.Provider>
  );
}
