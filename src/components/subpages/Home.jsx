import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import usePokemon from "../../hooks/usePokemon";
import PokemonCard from "../shared/PokemonCard";
import Pagination from "../shared/Pagination";
import { Input } from "@material-tailwind/react";
import { useSearchParams } from "react-router";
import { Link } from "react-router";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const searchFromUrl = searchParams.get("search") || "";
  const { pokemonsContextData, setPokemonsContextData } =
    useContext(PokemonContext);
  const { pokemons, isLoading, isError } = usePokemon();
  const [page, setPage] = useState(pageFromUrl);
  const [search, setSearch] = useState(searchFromUrl);
  const itemsOnPage = 15;

  useEffect(() => {
    setSearchParams({ page, search });
  }, [page, search, setSearchParams]);

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
            <Link key={item.id} to={`/pokemon/${item.id}`}>
              <PokemonCard key={item.id} pokemon={item} />
            </Link>
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
