import React from 'react';

function PokemonItem(props) {
    const { pokemon } = props;

    return (
        <div><h1>{pokemon.data.name}</h1></div>
    )
}

export default PokemonItem;