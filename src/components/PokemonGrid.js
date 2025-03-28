import React from "react";

const getPokemonId = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2]; // Extrae el ID real del Pokémon
};

const PokemonGrid = ({ pokemons, onImageClick }) => {
    return (
        <div className="row">
            {pokemons.map((pokemon) => {
                const pokemonId = getPokemonId(pokemon.url);
                return (
                    <div key={pokemonId} className="col-md-3 col-sm-6 mb-4">
                        <div className="card text-center">
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                                alt={pokemon.name}
                                className="card-img-top"
                                style={{ cursor: "pointer" }}
                                onDoubleClick={() => onImageClick(pokemon.name)}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{pokemon.name}</h5>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PokemonGrid;
