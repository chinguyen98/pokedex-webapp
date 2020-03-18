import React, { useContext, useState } from 'react';

import { PokemonContext } from '../contexts/PokemonContext'

import { Link } from 'react-router-dom';

function Searchbar(props) {
    const { displayPokemonDataBySearch, reloadPokemonData } = useContext(PokemonContext);
    const [searchText, setSearchText] = useState('');

    function searchByPressEnter(event) {
        if (event.key === 'Enter') {
            displayPokemonDataBySearch(event.target.value);
        }
    }

    return (
        <div className='container mt-3 d-flex justify-content-center align-items-center'>
            <Link to='/'>
                <button className='reloadBtn mr-2' onClick={() => reloadPokemonData()}>Reload</button>
            </Link>
            <input type='text' onChange={(e) => setSearchText(e.target.value)} onKeyUp={e => searchByPressEnter(e)} placeholder='Enter pokémon name or ID'></input>
            <Link to='/'>
                <button className='searchBtn ml-2' onClick={() => displayPokemonDataBySearch(searchText)}>Search</button>
            </Link>
        </div>
    )
}

export default Searchbar;