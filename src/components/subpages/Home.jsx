import { useContext, useEffect } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import usePokemon from "../../hooks/usePokemon";

function Home() {
  const { pokemonsContextData, setPokemonsContextData } =
    useContext(PokemonContext);
  const { pokemons, isLoading, isError } = usePokemon();

  useEffect(() => {
    setPokemonsContextData(pokemons);
  }, []);

  if (isLoading)
    return (
      <p className="flex-1 flex justify-center items-center">
        Ładowanie danych...
      </p>
    );
  if (isError)
    return (
      <p className="flex-1 flex justify-center items-center">Wystąpił błąd</p>
    );

  return <></>;
}

export default Home;
