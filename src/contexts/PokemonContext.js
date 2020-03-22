import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const PokemonContext = React.createContext();

export function PokemonProvider(props) {
    const [pokemonDataList, setPokemonDataList] = useState([]);
    const [pokeNameList, setPokemonNameList] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isShowMoreBtn, setShowMoreBtn] = useState(true);
    const [listPokemonType, setListPokemonType] = useState(null);

    async function fetchPokemonDataList(beginId, endId, callback = (firstArr, lastArr) => { return firstArr.concat(lastArr) }) {
        const urlList = [];
        for (let id = beginId; id <= endId; id++) {
            urlList.push(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        };
        await Promise.all(urlList.map(url => axios.get(url)))
            .then(data => {
                setPokemonDataList(callback(pokemonDataList, data))
            })
            .catch(err => console.log(err));
    }

    async function getPokemonData() {
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964')
            .then(result => setPokemonNameList(result.data.results))
            .catch(err => console.log(err));
        fetchPokemonDataList(1, 20);
    }

    async function displayPokemonDataBySearch(searchText) {
        if (searchText === '') {
            setShowMoreBtn(false)
            setPokemonDataList([{ data: { id: 'blankText' } }]);
            return;
        }
        setLoading(true);
        setShowMoreBtn(false);
        setPokemonDataList([]);
        let listPokemon;
        if (isNaN(searchText)) {
            listPokemon = pokeNameList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
                .map(item => `https://pokeapi.co/api/v2/pokemon/${item.name}`);
        } else {
            listPokemon = (searchText <= 0 || searchText > 964) ? [] : [`https://pokeapi.co/api/v2/pokemon/${pokeNameList[searchText - 1].name}`];
        }
        if (listPokemon.length === 0) {
            setLoading(false)
            setPokemonDataList([{ data: { id: 'NotFound' } }]);
        } else {
            await Promise.all(listPokemon.map(item => axios.get(item)))
                .then(result => {
                    setLoading(false)
                    setPokemonDataList(result);
                })
                .catch(err => console.log(err))
        }
    }

    async function reloadPokemonData() {
        setShowMoreBtn(true)
        await fetchPokemonDataList(1, 20, (firstArr, lastArr) => { return lastArr });
    }

    function changeId(id) {
        if (id < 10) {
            return `00${id}`;
        }
        if (id < 100) {
            return `0${id}`;
        }
        return id;
    }

    function renderPokemonType(types) {
        return (
            <div className='pokemonType d-flex mt-1'>
                {
                    types.map(item => (
                        <span className={`mx-2 pokemonType__${item.type.name}`} key={item.type.name}>{item.type.name}</span>
                    ))
                }
            </div>
        )
    }

    function convertImageUrl(name) {
        if (name.includes('-alola')) {
            name = name.replace('-alola', '-alolan')
        }
        return `https://img.pokemondb.net/artwork/${name}.jpg`
    }

    async function getPokemonTypeData() {
        let urlList = [];
        for (let id = 1; id <= 18; id++) {
            urlList.push(`https://pokeapi.co/api/v2/type/${id}`);
        }
        await Promise.all(urlList.map(item => axios.get(item))).then(result => {
            setListPokemonType(result.map(item => item.data));
        })
    }

    useEffect(() => {
        getPokemonData();
        getPokemonTypeData()
    }, [])

    const contextValue = {
        pokemonDataList,
        fetchPokemonDataList,
        displayPokemonDataBySearch,
        isLoading,
        isShowMoreBtn,
        reloadPokemonData,
        changeId,
        renderPokemonType,
        convertImageUrl,
        listPokemonType,
    }

    return (
        <PokemonContext.Provider value={contextValue}>{props.children}</PokemonContext.Provider>
    )
}