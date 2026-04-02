import logo from "../../icons/logo.png";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

function PokemonCard({ pokemon, arena, handleDelete, opacity }) {
  const { user } = useContext(LoginContext);
  return (
    <>
      {pokemon ? (
        <div
          className={`relative flex flex-col w-60 p-4 bg-gray-200 dark:bg-slate-900 rounded-xl transition-transform duration-300 ${arena ? "" : "hover:scale-105 hover:cursor-pointer"} ${opacity ? "opacity-50" : ""}`}
        >
          {arena && (
            <button
              onClick={() => handleDelete()}
              className="flex absolute top-4 right-4"
            >
              <XMarkIcon className="w-8 h-8 text-red-500" />
            </button>
          )}
          {pokemon?.win !== undefined && user && (
            <div className="absolute top-0 left-0 p-1 border-2 border-current rounded-tl-lg rounded-br-lg text-xs">
              W: {pokemon.win} | L: {pokemon.lose}
            </div>
          )}
          <img src={pokemon?.photo} alt={pokemon?.name} />
          <h3 className="capitalize font-bold text-xl text-center mb-2">
            {pokemon?.name}
          </h3>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div>
              <p className="text-center text-xs font-bold">Height</p>
              <p className="text-center text-xs">{pokemon?.height}</p>
            </div>
            <div>
              <p className="text-center text-xs font-bold">Weight</p>
              <p className="text-center text-xs">{pokemon?.weight}</p>
            </div>
            <div>
              <p className="text-center text-xs font-bold">Experience</p>
              <p className="text-center text-xs">{pokemon?.exp}</p>
            </div>
            <div>
              <p className="text-center text-xs font-bold">Ability</p>
              <p className="text-center text-xs">
                {pokemon?.ability ?? "none"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col w-60 h-96 p-4 
            bg-gradient-to-b from-yellow-200 to-yellow-400 border-2 border-yellow-500
            rounded-xl"
        >
          <img src={logo} alt="pokemon-logo" />
        </div>
      )}
    </>
  );
}

export default PokemonCard;
