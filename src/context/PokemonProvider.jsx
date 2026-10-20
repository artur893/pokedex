import { PokemonContext } from "./PokemonContext";
import { useState } from "react";

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
