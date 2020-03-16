import React from 'react';

function Searchbar(props) {
    return (
        <div className='container mt-5 d-flex justify-content-center align-items-center'>
            <input type='text' placeholder='Enter pokémon name or ID'></input>
            <button className='searchBtn ml-2'>Search</button>
        </div>
    )
}

export default Searchbar;