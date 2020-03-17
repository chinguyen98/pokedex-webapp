import React, { useState } from 'react';

function PokemonItem(props) {
    const { pokemon } = props;
    const [imgSrcStatus, setimgSrcStatus] = useState({ src: pokemon.data.sprites.front_default, errored: false })

    function changeId(id) {
        if (id < 10) {
            return `00${id}`;
        }
        if (id < 100) {
            return `0${id}`;
        }
        return id;
    }

    function renderPokemonType(types) {
        return (
            <div className='pokemonType d-flex mt-3'>
                {
                    types.map(item => (
                        <span className={`mx-2 pokemonType__${item.type.name}`} key={item.type.name}>{item.type.name}</span>
                    ))
                }
            </div>
        )
    }

    function convertImageUrl(name) {
        if (name.includes('-alola')) {
            name = name.replace('-alola', '-alolan')
        }
        return `https://img.pokemondb.net/artwork/${name}.jpg`
    }

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