import logo from "../../icons/logo.png";

function PokemonCard({ pokemon }) {
  return (
    <>
      {pokemon ? (
        <div className="flex flex-col w-60 p-4 bg-gray-200 dark:bg-slate-900 rounded-xl transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
          <img src={pokemon?.photo} alt={pokemon?.name} />
          <h3 className="capitalize font-bold text-xl text-center mb-2">
            {pokemon?.name}
          </h3>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div>
              <p className="text-center text-sm font-bold">Height</p>
              <p className="text-center text-sm">{pokemon?.height}</p>
            </div>
            <div>
              <p className="text-center text-sm font-bold">Weight</p>
              <p className="text-center text-sm">{pokemon?.weight}</p>
            </div>
            <div>
              <p className="text-center text-sm font-bold">Experience</p>
              <p className="text-center text-sm">{pokemon?.exp}</p>
            </div>
            <div>
              <p className="text-center text-sm font-bold">Ability</p>
              <p className="text-center text-sm">{pokemon?.ability}</p>
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
