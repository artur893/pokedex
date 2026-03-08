import { useEffect, useState } from "react";

function usePokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
            photo: pokemon.sprites.back_default,
            exp: pokemon.base_experience,
            height: pokemon.height,
            weight: pokemon.weight,
            ability: pokemon.abilities[0].ability.name,
          };
          list.push(pokemonObj);
        }
        setPokemons(list);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getPokemons();
  }, []);

  return { pokemons, isLoading, isError };
}

export default usePokemon;
