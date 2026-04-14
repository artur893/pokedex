import { LoginContext } from "../../context/LoginContext";
import { PokemonContext } from "../../context/PokemonContext";
import useFetch from "../../hooks/useFetch";
import useMergePokemons from "../../hooks/useMergePokemons";
import usePokemon from "../../hooks/usePokemon";
import { useContext, useState } from "react";

function Ranking() {
  const [pokemons, setPokemons] = useState(null);
  const { user } = useContext(LoginContext);
  const { isLoading, isError } = usePokemon();
  const { pokemonsContextData } = useContext(PokemonContext);
  const {
    data: dbPokemons,
    isLoading: isLoadingDb,
    isError: isErrorDb,
  } = useFetch("http://localhost:3000/pokemons");
  const mergedPokemons = useMergePokemons(pokemonsContextData, dbPokemons);
  const [sortDescending, setSortDescending] = useState(true);
  const listToDisplay = pokemons ?? mergedPokemons;

  const sort = (key) => {
    setPokemons(
      [...mergedPokemons].sort((a, b) => {
        const valueA = a[key] ?? 0;
        const valueB = b[key] ?? 0;
        return sortDescending ? valueA - valueB : valueB - valueA;
      }),
    );
    setSortDescending((prev) => !prev);
  };

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
  if (!user)
    return (
      <p className="flex-1 flex justify-center items-center p-4">
        Zaloguj się, żeby zobaczyć listę ulubionych
      </p>
    );
  return (
    <div className="m-auto border-2 border-slate-800 dark:border-gray-400 text-xs sm:text-base">
      <table className="w-auto">
        <thead>
          <tr className="border-b border-slate-800 dark:border-gray-400">
            <th className="sm:px-2 py-2 text-center">LP</th>
            <th className="sm:px-2 py-2 text-left">Img</th>
            <th className="sm:px-2 py-2 text-left">Nazwa</th>
            <th
              className="sm:px-2 py-2 text-left hover:cursor-pointer"
              onClick={() => sort("exp")}
            >
              Exp
            </th>
            <th
              className="sm:px-2 py-2 text-left hover:cursor-pointer"
              onClick={() => sort("weight")}
            >
              Waga
            </th>
            <th
              className="sm:px-2 py-2 text-left hover:cursor-pointer"
              onClick={() => sort("height")}
            >
              Wzrost
            </th>
            <th
              className="sm:px-2 py-2 text-left hover:cursor-pointer"
              onClick={() => sort("win")}
            >
              Wygrane
            </th>
          </tr>
        </thead>
        <tbody>
          {listToDisplay.map((pokemon, i) => (
            <tr
              key={pokemon.id}
              className="border-b border-slate-800 dark:border-gray-400"
            >
              <td className="sm:px-2 py-2 text-center">{i + 1}</td>
              <td className="sm:px-2 py-2">
                <img src={pokemon.photo} alt={pokemon.name} className="h-8" />
              </td>
              <td className="sm:px-2 py-2 capitalize">{pokemon.name}</td>
              <td className="sm:px-2 py-2 text-center">{pokemon.exp}</td>
              <td className="sm:px-2 py-2 text-center">{pokemon.weight}</td>
              <td className="sm:px-2 py-2 text-center">{pokemon.height}</td>
              <td className="sm:px-2 py-2 text-center">{pokemon.win ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Ranking;
