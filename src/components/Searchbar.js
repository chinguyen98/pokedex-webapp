import React, { useContext, useState } from 'react';

import { PokemonContext } from '../contexts/PokemonContext'

function Searchbar(props) {
    const { displayDetailPokemonData } = useContext(PokemonContext);
    const [searchText, setSearchText] = useState('');

    return (
        <div className='container mt-5 d-flex justify-content-center align-items-center'>
            <input type='text' onChange={(e) => setSearchText(e.target.value)} placeholder='Enter pokémon name or ID'></input>
            <button className='searchBtn ml-2' onClick={() => displayDetailPokemonData(searchText)}>Search</button>
        </div>
    )
}

export default Searchbar;