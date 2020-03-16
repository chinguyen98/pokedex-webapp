import React from 'react';

function PokemonItem(props) {
    const { pokemon } = props;

    function changeId(id) {
        if (id < 10) {
            return `00${id}`;
        }
        if (id < 100) {
            return `0${id}`;
        }
        return id;
    }

    function createUrl(id) {
        if (id < 10) {
            return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${changeId(id)}.png`
        }
        if (id < 100) {
            return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${changeId(id)}.png`
        }
        return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${changeId(id)}.png`
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

    return (
        <div className="PokemonItem d-flex flex-column justify-content-center align-items-center">
            <img src={createUrl(pokemon.data.id)} alt={pokemon.data.name}></img>
            <h2>{pokemon.data.name}</h2>
            {renderPokemonType(pokemon.data.types)}
            <span className='pokemonId'>#{changeId(pokemon.data.id)}</span>
        </div>
    )
}

export default PokemonItem;