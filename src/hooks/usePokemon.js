import { PokemonContext } from "../context/PokemonContext";
import { useContext, useEffect, useState } from "react";

function usePokemon() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { pokemonsContextData, setPokemonsContextData } =
    useContext(PokemonContext);

  useEffect(() => {
    async function getPokemons() {
      try {
        setIsLoading(true);
        setIsError(false);
        const list = [];
        for (let i = 1; i <= 150; i++) {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
          const pokemon = await res.json();
          const pokemonObj = {
            id: pokemon.id,
            name: pokemon.name,
            photo: pokemon.sprites.other["official-artwork"].front_default,
            exp: pokemon.base_experience,
            height: pokemon.height,
            weight: pokemon.weight,
            ability: pokemon.abilities[0].ability.name,
          };
          list.push(pokemonObj);
        }
        setPokemonsContextData(list);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (pokemonsContextData.length === 0) {
      getPokemons();
    }
  }, [pokemonsContextData, setPokemonsContextData]);

  return { isLoading, isError };
}

export default usePokemon;
