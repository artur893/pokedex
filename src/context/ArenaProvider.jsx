import { ArenaContext } from "./ArenaContext";
import { useState } from "react";

export function ArenaProvider({ children }) {
  const [arenaContextData, setArenaContextData] = useState([]);

  return (
    <ArenaContext.Provider value={{ arenaContextData, setArenaContextData }}>
      {children}
    </ArenaContext.Provider>
  );
}
