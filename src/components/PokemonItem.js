import React, { useContext } from 'react';

import { PokemonContext } from '../contexts/PokemonContext'

function PokemonItem(props) {
    const { pokemon } = props;
    const { changeId, renderPokemonType, convertImageUrl } = useContext(PokemonContext);

    return (
        <div className="PokemonItem d-flex flex-column justify-content-center align-items-center">
            <img src={convertImageUrl(pokemon.data.name)} alt={pokemon.data.name}></img>
            <h2>{pokemon.data.name}</h2>
            {renderPokemonType(pokemon.data.types)}
            <span className='pokemonId'>#{changeId(pokemon.data.id)}</span>
        </div>
    )
}

export default PokemonItem;