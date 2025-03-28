import { useState, useEffect } from "react";
import { getPokemons } from "../services/pokemonService";

export const usePokemon = (offset = 0, limit = 10) => {
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPokemons, setTotalPokemons] = useState(0);

    useEffect(() => {
        setLoading(true);
        getPokemons(offset, limit).then((data) => {
            setPokemons(data.results);
            setFilteredPokemons(data.results);
            setTotalPokemons(data.count); // Almacena el total de Pokémon disponibles
            setLoading(false);
        });
    }, [offset, limit]);

    const filterPokemons = (search) => {
        const filtered = pokemons.filter((p) => 
            p.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredPokemons(filtered);
    };

    return { pokemons: filteredPokemons, loading, filterPokemons, totalPokemons };
};
