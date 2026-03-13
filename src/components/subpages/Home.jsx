import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import usePokemon from "../../hooks/usePokemon";
import PokemonCard from "../shared/PokemonCard";
import Pagination from "../shared/Pagination";

function Home() {
  const { pokemonsContextData, setPokemonsContextData } =
    useContext(PokemonContext);
  const { pokemons, isLoading, isError } = usePokemon();
  const [page, setPage] = useState(1);
  const itemsOnPage = 15;

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
    <>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center">
        {pokemonsContextData
          .slice(
            itemsOnPage * (page - 1),
            itemsOnPage * (page - 1) + itemsOnPage,
          )
          .map((item) => (
            <PokemonCard key={item.id} pokemon={item} />
          ))}
      </div>
      <Pagination
        totalItems={pokemonsContextData.length}
        itemsOnPage={itemsOnPage}
        activePage={page}
        setPage={setPage}
      />
    </>
  );
}

export default Home;
