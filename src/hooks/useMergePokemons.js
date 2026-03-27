function useMergePokemons(apiPokemons, dbPokemons) {
  if (!apiPokemons) return [];
  if (!dbPokemons) return apiPokemons;
  const mergedList = apiPokemons.map((apiPokemon) => {
    const dbPokemon = dbPokemons.find(
      (dbPokemon) => Number(dbPokemon.id) === Number(apiPokemon.id),
    );

    return { ...apiPokemon, ...dbPokemon };
  });

  return mergedList;
}

export default useMergePokemons;
