import React, { useContext } from 'react';

import { PokemonContext } from '../contexts/PokemonContext'
import PokemonItem from '../components/PokemonItem';

import LoadingPokeball from '../images/loadingPokeball.gif'

function renderPokemonItems(pokemonData) {
    return (
        <div className="PokeListContainer d-flex flex-wrap">
            {
                pokemonData.map(pokemon => (
                    <PokemonItem key={pokemon.data.id} pokemon={pokemon}></PokemonItem>
                ))
            }
        </div>
    )
}

function PokeListContainer(props) {
    const { pokemonData } = useContext(PokemonContext);
    console.log(pokemonData)
    return (
        <div className='PokeListContainer text-center'>
            {
                pokemonData.length === 0 && <img className='loadingPokeball' src={LoadingPokeball}></img>
            }
            {
                pokemonData.length !== 0 && renderPokemonItems(pokemonData)
            }
        </div>
    )
}

export default PokeListContainer;