import { ArenaContext } from "../../context/ArenaContext";
import { LoginContext } from "../../context/LoginContext";
import { PokemonContext } from "../../context/PokemonContext";
import useFetch from "../../hooks/useFetch";
import useMergePokemons from "../../hooks/useMergePokemons";
import usePokemon from "../../hooks/usePokemon";
import useRequest from "../../hooks/useRequest";
import { HeartIcon as HeartEmpty } from "@heroicons/react/24/outline";
import { HeartIcon as HeartFull } from "@heroicons/react/24/solid";
import { Sword } from "lucide-react";
import { useContext } from "react";
import { useParams } from "react-router";

function PokemonDetails() {
  const { pokemonsContextData } = useContext(PokemonContext);
  const { data: dbPokemons } = useFetch("http://localhost:3000/pokemons");
  const mergedPokemons = useMergePokemons(pokemonsContextData, dbPokemons);
  const { user } = useContext(LoginContext);
  const { arenaContextData, setArenaContextData } = useContext(ArenaContext);
  const { id } = useParams();
  const { isLoading, isError } = usePokemon();
  const { data, refetch } = useFetch(`http://localhost:3000/pokemons/${id}`);
  const { send } = useRequest();
  const pokemon = mergedPokemons.find((poke) => Number(poke.id) === Number(id));

  const handleFavorite = async () => {
    if (data) {
      await send(`http://localhost:3000/pokemons/${id}`, "PATCH", {
        favorite: !data.favorite,
      });
      refetch();
    } else {
      await send(`http://localhost:3000/pokemons`, "POST", {
        id: id,
        favorite: true,
      });
      refetch();
    }
  };

  const handleArena = (pokemon) => {
    if (arenaContextData.length < 2) {
      setArenaContextData([...arenaContextData, pokemon]);
    }
  };

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
    pokemon && (
      <>
        <div className="relative flex flex-col self-center justify-between sm:flex-row max-w-xl w-11/12 p-4 m-4 bg-gray-200 dark:bg-slate-900 rounded-xl">
          <img
            src={pokemon.photo}
            alt={pokemon.name}
            className="max-w-72 self-center"
          />
          <div className="place-content-center">
            <h3 className="capitalize font-bold text-xl text-center mb-2">
              {pokemon.name}
            </h3>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <div>
                <p className="text-center text-sm font-bold">Height</p>
                <p className="text-center text-sm">{pokemon.height}</p>
              </div>
              <div>
                <p className="text-center text-sm font-bold">Weight</p>
                <p className="text-center text-sm">{pokemon.weight}</p>
              </div>
              <div>
                <p className="text-center text-sm font-bold">Experience</p>
                <p className="text-center text-sm">
                  {data?.exp && user ? data.exp : pokemon.exp}
                </p>
              </div>
              <div>
                <p className="text-center text-sm font-bold">Ability</p>
                <p className="text-center text-sm">{pokemon.ability}</p>
              </div>
            </div>
          </div>
          {user && (
            <div className="h-10">
              <button
                onClick={handleFavorite}
                className="absolute top-4 right-4"
              >
                {data?.favorite ? (
                  <HeartFull className="w-8 h-8 text-red-500" />
                ) : (
                  <HeartEmpty className="w-8 h-8 text-gray-500" />
                )}
              </button>
              <button
                onClick={() => handleArena(pokemon)}
                className="flex absolute bottom-1 right-4"
              >
                <span className="self-center mr-2">{`${arenaContextData.length} / 2`}</span>
                <Sword className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </button>
              {data?.win || data?.lose ? (
                <div className="absolute bottom-0 left-0 p-1 border-2 border-current rounded-bl-lg rounded-tr-lg">
                  W: {data.win} | L: {data.lose}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </>
    )
  );
}

export default PokemonDetails;
