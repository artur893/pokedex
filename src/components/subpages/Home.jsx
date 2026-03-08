import { useContext, useEffect } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import usePokemon from "../../hooks/usePokemon";
import PokemonCard from "../shared/PokemonCard";

function Home() {
  const { pokemonsContextData, setPokemonsContextData } =
    useContext(PokemonContext);
  const { pokemons, isLoading, isError } = usePokemon();

  useEffect(() => {
    setPokemonsContextData(pokemons);
  }, [pokemons, setPokemonsContextData]);

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

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center">
      {pokemonsContextData.map((item) => (
        <PokemonCard key={item.id} pokemon={item} />
      ))}
    </div>
  );
}

export default Home;
