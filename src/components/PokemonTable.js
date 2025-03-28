import React from "react";

const getPokemonId = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2]; // Extrae el ID del Pokémon
};

const PokemonTable = ({ pokemons }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody>
                {pokemons.map((pokemon) => {
                    const pokemonId = getPokemonId(pokemon.url);
                    return (
                        <tr key={pokemonId}>
                            <td>{pokemon.name}</td>
                            <td>
                                <img 
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} 
                                    alt={pokemon.name} 
                                    width="50"
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default PokemonTable;
