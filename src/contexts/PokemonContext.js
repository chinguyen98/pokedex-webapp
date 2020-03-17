import React, { useState, useEffect } from 'react';

import axios from 'axios';

export const PokemonContext = React.createContext();

export function PokemonProvider(props) {
    const [pokemonDataList, setPokemonDataList] = useState([]);
    const [pokeNameList, setPokemonNameList] = useState(null);

    async function fetchPokemonDataList(beginId, endId) {
        const urlList = [];
        for (let id = beginId; id <= endId; id++) {
            urlList.push(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        };
        await Promise.all(urlList.map(url => axios.get(url)))
            .then(data => setPokemonDataList(pokemonDataList.concat(data)))
            .catch(err => console.log(err));
    }

    async function getPokemonData() {
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964')
            .then(result => setPokemonNameList(result.data.results))
            .catch(err => console.log(err));
        fetchPokemonDataList(1, 20);
    }

    async function displayDetailPokemonData(searchText) {
        let listPokemon;
        if (isNaN(searchText)) {
            listPokemon = pokeNameList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
                .map(item => `https://pokeapi.co/api/v2/pokemon/${item.name}`);
        } else {
            listPokemon = (searchText <= 0 || searchText > 964) ? [] : [`https://pokeapi.co/api/v2/pokemon/${pokeNameList[searchText - 1].name}`];
        }
        console.log(listPokemon)
        if (listPokemon.length === 0) {
            console.log('No result!')
        } else {
            await Promise.all(listPokemon.map(item => axios.get(item)))
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        getPokemonData()
    }, [])

    const contextValue = {
        pokemonDataList,
        fetchPokemonDataList,
        displayDetailPokemonData,
    }

    return (
        <PokemonContext.Provider value={contextValue}>{props.children}</PokemonContext.Provider>
    )
}