import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Importar animaciones

const PokemonDetail = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [abilityEffects, setAbilityEffects] = useState({});

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = await response.json();
                setPokemon(data);
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [name]);

    const fetchAbilityEffect = async (abilityName, url) => {
        if (abilityEffects[abilityName]) return; // Si ya se cargó, no volver a llamar

        try {
            const response = await fetch(url);
            const data = await response.json();
            const effectEntry = data.effect_entries.find(entry => entry.language.name === "es") || 
                                data.effect_entries.find(entry => entry.language.name === "en");
            setAbilityEffects(prev => ({ ...prev, [abilityName]: effectEntry ? effectEntry.effect : "No disponible." }));
        } catch (error) {
            console.error("Error fetching ability:", error);
            setAbilityEffects(prev => ({ ...prev, [abilityName]: "No disponible." }));
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (!pokemon) return <p>No se encontró el Pokémon.</p>;

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate("/")}>
                ⬅ Volver
            </button>
            <h2 className="text-center">{pokemon.name.toUpperCase()}</h2>
            <div className="text-center">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="img-fluid" />
            </div>

            <h3>Tipo:</h3>
            <ul>
                {pokemon.types.map((type) => (
                    <li key={type.type.name}>{type.type.name}</li>
                ))}
            </ul>

            <h3>Peso:</h3>
            <p>{pokemon.weight} kg</p>

            <h3>Habilidades:</h3>
            <ul>
                {pokemon.abilities.map((ability) => (
                    <li key={ability.ability.name}>
                        <button
                            className="btn btn-link"
                            onClick={() => fetchAbilityEffect(ability.ability.name, ability.ability.url)}
                        >
                            {ability.ability.name}
                        </button>
                        <AnimatePresence>
                            {abilityEffects[ability.ability.name] && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="alert alert-info mt-2"
                                >
                                    <strong>Efecto:</strong> {abilityEffects[ability.ability.name]}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonDetail;
