import React, { useContext } from 'react';

import { PokemonContext } from '../contexts/PokemonContext'
import PokemonItem from '../components/PokemonItem';

function renderPokemonItems(pokemonData) {
    return (
        <div className="PokeListContainer">
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
        <div>
            {
                pokemonData.length === 0 && <div>Loading</div>
            }
            {
                pokemonData.length !== 0 && renderPokemonItems(pokemonData)
            }
        </div>
    )
}

export default PokeListContainer;