import React from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetailContainer() {
    const { pokemonName } = useParams()

    return (
        <div className='PokemonDetailContainer mt-4'>
            <h1 className='text-center'>{pokemonName}</h1>
        </div>
    )
}

export default PokemonDetailContainer;