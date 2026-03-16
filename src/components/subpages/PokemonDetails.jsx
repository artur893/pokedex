import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import { useParams } from "react-router";
import usePokemon from "../../hooks/usePokemon";
import { HeartIcon as HeartEmpty } from "@heroicons/react/24/outline";
import { HeartIcon as HeartFull } from "@heroicons/react/24/solid";
import useRequest from "../../hooks/useRequest";
import useFetch from "../../hooks/useFetch";

function PokemonDetails() {
  const [pokemon, setPokemon] = useState(null);
  const { pokemonsContextData } = useContext(PokemonContext);
  const { id } = useParams();
  const { isLoading, isError } = usePokemon();
  const { data, refetch } = useFetch(`http://localhost:3000/pokemons/${id}`);
  const { send } = useRequest();

  useEffect(() => {
    setPokemon(pokemonsContextData.find((poke) => poke.id === Number(id)));
  }, [id, setPokemon, pokemonsContextData]);

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
          <button onClick={handleFavorite} className="absolute top-4 right-4">
            {data?.favorite ? (
              <HeartFull className="w-8 h-8 text-red-500" />
            ) : (
              <HeartEmpty className="w-8 h-8 text-gray-500" />
            )}
          </button>
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
                <p className="text-center text-sm">{pokemon.exp}</p>
              </div>
              <div>
                <p className="text-center text-sm font-bold">Ability</p>
                <p className="text-center text-sm">{pokemon.ability}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default PokemonDetails;
