import React from 'react'

import pokedexLogo from '../images/pokedexLogo.png';

function Navbar(props) {
    return (
        <nav className='Navbar d-flex justify-content-center'>
            <img src={pokedexLogo} alt='Pokedex'></img>
        </nav>
    );
}

export default Navbar;