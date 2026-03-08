import { useContext, useEffect } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import usePokemon from "../../hooks/usePokemon";

function Home() {
  const { pokemonsData, setPokemonsData } = useContext(PokemonContext);
  const { pokemons } = usePokemon();

  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);

  return <></>;
}

export default Home;
