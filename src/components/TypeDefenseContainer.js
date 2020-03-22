import React from 'react';

function TypeDefenseContainer(props) {
    const { pokemon } = props;

    return (
        <div className='TypeDefenseContainer pt-2'>
            <h1 className='text-center'>Type Defenses</h1>
            <p className='text-center'>The effectiveness of each type on {pokemon.name}</p>
        </div>
    )
}

export default TypeDefenseContainer;