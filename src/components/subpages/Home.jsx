import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import usePokemon from "../../hooks/usePokemon";
import PokemonCard from "../shared/PokemonCard";
import Pagination from "../shared/Pagination";
import { Input } from "@material-tailwind/react";

function Home() {
  const { pokemonsContextData, setPokemonsContextData } =
    useContext(PokemonContext);
  const { pokemons, isLoading, isError } = usePokemon();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
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
      <div className="bg-gray-200 dark:bg-slate-900 rounded-xl w-[240px] mx-auto mb-4">
        <Input
          color="primary"
          placeholder="Wyszukaj pokemona"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[240px]"
        />
      </div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center">
        {pokemonsContextData
          .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase()),
          )
          .slice(
            itemsOnPage * (page - 1),
            itemsOnPage * (page - 1) + itemsOnPage,
          )
          .map((item) => (
            <PokemonCard key={item.id} pokemon={item} />
          ))}
      </div>
      <Pagination
        totalItems={
          pokemonsContextData.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase()),
          ).length
        }
        itemsOnPage={itemsOnPage}
        activePage={page}
        setPage={setPage}
      />
    </>
  );
}

export default Home;
