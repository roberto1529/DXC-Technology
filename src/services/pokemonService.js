const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemons = async (offset = 0, limit = 10) => {
    const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    return response.json();
};

export const getPokemonDetails = async (name) => {
    const response = await fetch(`${BASE_URL}/pokemon/${name}`);
    return response.json();
};
