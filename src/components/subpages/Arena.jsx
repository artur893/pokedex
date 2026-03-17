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
    <div className="flex">
      <PokemonCard pokemon={arenaContextData[0]} />
      <PokemonCard pokemon={arenaContextData[1]} />
    </div>
  );
}

export default Arena;
