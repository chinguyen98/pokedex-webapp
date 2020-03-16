import React, { useState, useEffect } from 'react';

import axios from 'axios';

export const PokemonContext = React.createContext();

export function PokemonProvider(props) {
    const [pokemonDataList, setPokemonDataList] = useState([]);

    async function fetchPokemonDataList(beginId, endId) {
        const urlList = [];
        for (let id = beginId; id <= endId; id++) {
            urlList.push(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        };
        await Promise.all(urlList.map(url => axios.get(url)))
            .then(data => setPokemonDataList(pokemonDataList.concat(data)))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchPokemonDataList(1, 20);
    }, [])



    const contextValue = {
        pokemonDataList,
        fetchPokemonDataList
    }

    return (
        <PokemonContext.Provider value={contextValue}>{props.children}</PokemonContext.Provider>
    )
}