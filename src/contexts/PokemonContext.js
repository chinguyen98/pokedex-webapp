import React, { useState, useEffect } from 'react';

import axios from 'axios';

export const PokemonContext = React.createContext();

export function PokemonProvider(props) {
    const [pokemonData, setPokemonData] = useState([]);

    async function fetchPokemonData(beginId, endId) {
        const urlList = [];
        for (let id = beginId; id <= endId; id++) {
            urlList.push(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        };
        await Promise.all(urlList.map(url => axios.get(url)))
            .then(data => setPokemonData(pokemonData.concat(data)))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchPokemonData(1, 20);
    }, [])

    return (
        <PokemonContext.Provider value={{ pokemonData: pokemonData, fetchPokemonData: fetchPokemonData }}>{props.children}</PokemonContext.Provider>
    )
}