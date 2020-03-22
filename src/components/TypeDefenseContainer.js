import React from 'react';

function TypeDefenseContainer(props) {
    const { pokemon, listPokemonType } = props;

    function convertTypeName(type) {
        return type.slice(0, 3).toUpperCase();
    }

    function renderTypeDefenseDetail() {
        return (
            <div className='TypeDefenseContainer__Grid text-center'>
                {
                    listPokemonType.map(type => (
                        <div key={type.name} className='TypeDefenseContainer__Grid__Item'>
                            <div className={`pokemonType__${type.name}`}>{convertTypeName(type.name)}</div>
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className='TypeDefenseContainer pt-2'>
            <h1 className='text-center'>Type Defenses</h1>
            <p className='text-center'>The effectiveness of each type on {pokemon.name}</p>
            {renderTypeDefenseDetail()}
        </div>
    )
}

export default TypeDefenseContainer;