import { LoginContext } from "../../context/LoginContext";
import { PokemonContext } from "../../context/PokemonContext";
import useFetch from "../../hooks/useFetch";
import useMergePokemons from "../../hooks/useMergePokemons";
import usePokemon from "../../hooks/usePokemon";
import Pagination from "../shared/Pagination";
import PokemonCard from "../shared/PokemonCard";
import { Input } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

function Home({ favorite }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const searchFromUrl = searchParams.get("search") || "";
  const itemsOnPage = 15;
  const [page, setPage] = useState(pageFromUrl);
  const [search, setSearch] = useState(searchFromUrl);
  const { pokemonsContextData } = useContext(PokemonContext);
  const { user } = useContext(LoginContext);
  const { isLoading, isError } = usePokemon();
  const {
    data: dbPokemons,
    isLoading: isLoadingDb,
    isError: isErrorDb,
  } = useFetch("http://localhost:3000/pokemons");

  const mergedList = useMergePokemons(pokemonsContextData, dbPokemons);
  const listToDisplay = favorite
    ? mergedList.filter((pokemon) => pokemon.favorite)
    : mergedList;

  useEffect(() => {
    setSearchParams({ page, search });
  }, [page, search, setSearchParams]);

  if (isLoading || isLoadingDb)
    return (
      <p className="flex-1 flex justify-center items-center">
        Ładowanie danych...
      </p>
    );
  if (isError || isErrorDb)
    return (
      <p className="flex-1 flex justify-center items-center">Wystąpił błąd</p>
    );
  if (!user && favorite)
    return (
      <p className="flex-1 flex justify-center items-center p-4">
        Zaloguj się, żeby zobaczyć listę ulubionych
      </p>
    );

  return (
    <>
      {listToDisplay.length > 0 ? (
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
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] place-items-center">
            {listToDisplay
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
              listToDisplay.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(search.toLowerCase()),
              ).length
            }
            itemsOnPage={itemsOnPage}
            activePage={page}
            setPage={setPage}
          />
        </>
      ) : (
        <p className="flex-1 flex justify-center items-center p-4">
          Dodaj pokemony do ulubionych, żeby wyświetlić listę
        </p>
      )}
    </>
  );
}

export default Home;
