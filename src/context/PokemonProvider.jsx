import { useState } from "react";
import { PokemonContext } from "./ArenaContext";

export function PokemonProvider({ children }) {
  const [pokemonsContextData, setPokemonsContextData] = useState([]);

  return (
    <PokemonContext.Provider
      value={{ pokemonsContextData, setPokemonsContextData }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
