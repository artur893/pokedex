import { createContext, useState } from "react";

export const PokemonContext = createContext();

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
