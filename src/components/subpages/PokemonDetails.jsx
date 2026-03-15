import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import { useParams } from "react-router";

function PokemonDetails() {
  const [pokemon, setPokemon] = useState(null);
  const { pokemonsContextData } = useContext(PokemonContext);
  const { id } = useParams();

  useEffect(() => {
    setPokemon(pokemonsContextData.find((poke) => poke.id === Number(id)));
  }, [id, setPokemon, pokemonsContextData]);

  return (
    pokemon && (
      <>
        <div className="flex flex-col self-center justify-between sm:flex-row max-w-xl w-11/12 p-4 m-4 bg-gray-200 dark:bg-slate-900 rounded-xl">
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
