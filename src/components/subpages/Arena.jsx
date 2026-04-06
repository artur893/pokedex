import { ArenaContext } from "../../context/ArenaContext";
import { LoginContext } from "../../context/LoginContext";
import useFetch from "../../hooks/useFetch";
import useRequest from "../../hooks/useRequest";
import PokemonCard from "../shared/PokemonCard";
import { Button } from "@material-tailwind/react";
import { useContext, useState } from "react";

function Arena() {
  const { user } = useContext(LoginContext);
  const { arenaContextData, setArenaContextData } = useContext(ArenaContext);
  const [message, setMessage] = useState("");
  const [isOver, setIsOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const { data: pokemon1 } = useFetch(
    arenaContextData[0]?.id
      ? `http://localhost:3000/pokemons/${arenaContextData[0].id}`
      : null,
  );
  const { data: pokemon2 } = useFetch(
    arenaContextData[1]?.id
      ? `http://localhost:3000/pokemons/${arenaContextData[1].id}`
      : null,
  );
  const { send } = useRequest();

  const handleUpdateDB = async (data, index, won) => {
    if (data) {
      await send(
        `http://localhost:3000/pokemons/${arenaContextData[index].id}`,
        "PATCH",
        {
          win: won ? (data.win ?? 0) + 1 : (data.win ?? 0),
          lose: won ? (data.lose ?? 0) : (data.lose ?? 0) + 1,
          exp: won
            ? arenaContextData[index].exp + 10
            : arenaContextData[index].exp,
        },
      );
    } else {
      await send(`http://localhost:3000/pokemons`, "POST", {
        id: String(arenaContextData[index].id),
        win: won ? 1 : 0,
        lose: won ? 0 : 1,
        exp: won
          ? arenaContextData[index].exp + 10
          : arenaContextData[index].exp,
      });
    }
  };

  const handleBattle = async () => {
    const powerPokemon1 =
      (pokemon1?.exp || arenaContextData[0].exp) + arenaContextData[0].weight;
    const powerPokemon2 =
      (pokemon2?.exp || arenaContextData[1].exp) + arenaContextData[1].weight;
    if (powerPokemon1 === powerPokemon2) {
      setMessage("REMIS");
      setIsOver(true);
      return;
    }
    if (powerPokemon1 > powerPokemon2) {
      await handleUpdateDB(pokemon1, 0, true);
      await handleUpdateDB(pokemon2, 1, false);
      setMessage(`${arenaContextData[0].name} won`);
      setWinner(1);
      setIsOver(true);
      return;
    }
    if (powerPokemon1 < powerPokemon2) {
      await handleUpdateDB(pokemon1, 0, false);
      await handleUpdateDB(pokemon2, 1, true);
      setMessage(`${arenaContextData[1].name} won`);
      setWinner(2);
      setIsOver(true);
      return;
    }
  };

  const handleLeave = () => {
    setArenaContextData([]);
    setWinner(null);
    setIsOver(false);
    setMessage("");
  };

  if (!user)
    return (
      <p className="flex-1 flex justify-center items-center p-4">
        Zaloguj się, żeby wejść na arenę
      </p>
    );
  return (
    <>
      <p className="flex justify-center items-center h-16 text-3xl capitalize">
        {message}
      </p>
      <div className="flex flex-col md:flex-row gap-4 place-self-center">
        <PokemonCard
          pokemon={arenaContextData[0]}
          arena
          handleDelete={() => setArenaContextData((prev) => prev.slice(1))}
          opacity={winner === 2}
        />
        <div className="flex flex-col gap-4 self-center">
          <div className="flex items-center gap-2 self-center">
            <span className="h-px w-8 bg-yellow-400"></span>
            <span className="text-2xl font-bold text-yellow-400">VS</span>
            <span className="h-px w-8 bg-yellow-400"></span>
          </div>
          {isOver ? (
            <Button variant="outline" onClick={() => handleLeave()}>
              Opuść arenę
            </Button>
          ) : (
            <Button
              variant="outline"
              color="error"
              disabled={arenaContextData.length !== 2}
              onClick={() => handleBattle()}
            >
              WALCZ!
            </Button>
          )}
        </div>
        <PokemonCard
          pokemon={arenaContextData[1]}
          arena
          handleDelete={() => setArenaContextData((prev) => prev.slice(0, -1))}
          opacity={winner === 1}
        />
      </div>
    </>
  );
}

export default Arena;
