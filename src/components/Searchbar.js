import React, { useContext, useState } from 'react';

import { PokemonContext } from '../contexts/PokemonContext'

function Searchbar(props) {
    const { displayPokemonDataBySearch, reloadPokemonData } = useContext(PokemonContext);
    const [searchText, setSearchText] = useState('');

    function searchByPressEnter(event) {
        if (event.key === 'Enter') {
            displayPokemonDataBySearch(event.target.value);
        }
    }

    return (
        <div className='container mt-5 d-flex justify-content-center align-items-center'>
            <button className='reloadBtn mr-2' onClick={() => reloadPokemonData()}>Reload</button>
            <input type='text' onChange={(e) => setSearchText(e.target.value)} onKeyUp={e => searchByPressEnter(e)} placeholder='Enter pokémon name or ID'></input>
            <button className='searchBtn ml-2' onClick={() => displayPokemonDataBySearch(searchText)}>Search</button>
        </div>
    )
}

export default Searchbar;