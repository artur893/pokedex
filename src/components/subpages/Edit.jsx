import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import usePokemon from "../../hooks/usePokemon";
import useFetch from "../../hooks/useFetch";
import { LoginContext } from "../../context/LoginContext";
import useMergePokemons from "../../hooks/useMergePokemons";
import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import Modal from "../shared/Modal";

function Edit() {
  const [pokemons, setPokemons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateMode, setIsModalCreateMode] = useState(false);
  const [pokemon, setPokemon] = useState();
  const { user } = useContext(LoginContext);
  const { isLoading, isError } = usePokemon();
  const { pokemonsContextData } = useContext(PokemonContext);
  const {
    data: dbPokemons,
    isLoading: isLoadingDb,
    isError: isErrorDb,
  } = useFetch("http://localhost:3000/pokemons");
  const mergedPokemons = useMergePokemons(pokemonsContextData, dbPokemons);

  useEffect(() => {
    setPokemons(mergedPokemons);
  }, [pokemonsContextData, dbPokemons]);

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
    <>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isModalCreateMode={isModalCreateMode}
        pokemon={pokemon}
      />
      <div className="m-auto text-xs sm:text-base">
        <Button
          className="w-full mb-4 text-xs sm:text-base"
          onClick={() => {
            setPokemon(null);
            setIsModalOpen(true);
            setIsModalCreateMode(true);
          }}
        >
          Stwórz pokemona
        </Button>
        <table className="w-auto border-2">
          <thead>
            <tr className="border-b">
              <th className="px-2 py-2 text-center">LP</th>
              <th className="px-2 py-2 text-left">Img</th>
              <th className="px-2 py-2 text-left">Nazwa</th>
              <th className="px-2 py-2 text-left">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map((pokemon, i) => (
              <tr key={pokemon.id} className="border-b">
                <td className="px-2 py-2 text-center">{i + 1}</td>
                <td className="px-2 py-2">
                  <img src={pokemon.photo} alt={pokemon.name} className="h-8" />
                </td>
                <td className="px-2 py-2 capitalize">{pokemon.name}</td>
                <td
                  className="px-2 py-2 cursor-pointer hover:text-primary-foreground hover:bg-primary rounded transition-colors"
                  onClick={() => {
                    setPokemon(pokemon);
                    setIsModalOpen(true);
                    setIsModalCreateMode(false);
                  }}
                >
                  Edytuj
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Edit;
