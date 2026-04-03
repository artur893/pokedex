import { useState } from "react";
import { ArenaContext } from "./ArenaContext";

export function ArenaProvider({ children }) {
  const [arenaContextData, setArenaContextData] = useState([]);

  return (
    <ArenaContext.Provider value={{ arenaContextData, setArenaContextData }}>
      {children}
    </ArenaContext.Provider>
  );
}
