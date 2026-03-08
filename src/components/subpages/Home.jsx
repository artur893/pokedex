import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";

function Home() {
  const { pokemonsData, setPokemonsData } = useContext(PokemonContext);

  return <></>;
}

export default Home;
