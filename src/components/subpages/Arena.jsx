import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { ArenaContext } from "../../context/ArenaContext";
import PokemonCard from "../shared/PokemonCard";

function Arena() {
  const { user } = useContext(LoginContext);
  const { arenaContextData } = useContext(ArenaContext);
  if (!user)
    return (
      <p className="flex-1 flex justify-center items-center p-4">
        Zaloguj się, żeby wejść na arenę
      </p>
    );
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-8 place-self-center">
      <PokemonCard pokemon={arenaContextData[0]} />
      <div class="flex items-center gap-2 self-center">
        <span class="h-px w-8 bg-yellow-400"></span>
        <span class="text-2xl font-bold text-yellow-400">VS</span>
        <span class="h-px w-8 bg-yellow-400"></span>
      </div>

      <PokemonCard pokemon={arenaContextData[1]} />
    </div>
  );
}

export default Arena;
