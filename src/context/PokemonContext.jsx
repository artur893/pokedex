import { createContext, useState } from "react";

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemonsData, setPokemonsData] = useState([]);

  return (
    <PokemonContext.Provider value={{ pokemonsData, setPokemonsData }}>
      {children}
    </PokemonContext.Provider>
  );
}
