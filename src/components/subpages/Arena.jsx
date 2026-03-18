import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { ArenaContext } from "../../context/ArenaContext";
import PokemonCard from "../shared/PokemonCard";

function Arena() {
  const { user } = useContext(LoginContext);
  const { arenaContextData, setArenaContextData } = useContext(ArenaContext);

  if (!user)
    return (
      <p className="flex-1 flex justify-center items-center p-4">
        Zaloguj się, żeby wejść na arenę
      </p>
    );
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-8 place-self-center">
      <PokemonCard
        pokemon={arenaContextData[0]}
        arena
        handleDelete={() => setArenaContextData((prev) => prev.slice(1))}
      />
      <div className="flex items-center gap-2 self-center">
        <span className="h-px w-8 bg-yellow-400"></span>
        <span className="text-2xl font-bold text-yellow-400">VS</span>
        <span className="h-px w-8 bg-yellow-400"></span>
      </div>
      <PokemonCard
        pokemon={arenaContextData[1]}
        arena
        handleDelete={() => setArenaContextData((prev) => prev.slice(0, -1))}
      />
    </div>
  );
}

export default Arena;
