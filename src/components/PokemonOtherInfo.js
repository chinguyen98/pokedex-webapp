import React from 'react';

function PokemonOtherInfo(props) {
    const { pokemon, pokemonSpecies } = props;
    let pokemonSpeciesName = pokemonSpecies.genera.filter(item => item.language.name === 'en').shift();

    return (
        <div className='PokemonOtherInfoContainer pt-2'>
            <h1 className='text-center'>Pokédex Data</h1>
            <div className='d-flex justify-content-between mt-1'>
                <span className='PokemonOtherInfoContainer__Heading'>Species: </span>
                <span className='PokemonOtherInfoContainer__Tailing'>{pokemonSpeciesName.genus}</span>
            </div>
            <div className='d-flex justify-content-between mt-1'>
                <span className='PokemonOtherInfoContainer__Heading'>Growth rate: </span>
                <span className='PokemonOtherInfoContainer__Tailing'>{pokemonSpecies.growth_rate.name}</span>
            </div>
            <div className='d-flex justify-content-between mt-1'>
                <span className='PokemonOtherInfoContainer__Heading'>Gender Rate: </span>
                {
                    pokemonSpecies.gender_rate === -1 && <span>Genderless</span>
                }
                {
                    pokemonSpecies.gender_rate !== -1 && (
                        <span className='PokemonOtherInfoContainer__Tailing'>
                            <span className='PokemonOtherInfoContainer__male mr-2'>{`${100 - (pokemonSpecies.gender_rate * 100 / 8)}% male`}</span>
                            <span className='PokemonOtherInfoContainer__female'>{`${(pokemonSpecies.gender_rate * 100 / 8)}% female`}</span>
                        </span>
                    )
                }
            </div>
            <div className='d-flex justify-content-between mt-1'>
                <span className='PokemonOtherInfoContainer__Heading'>Catch Rate: </span>
                <span className='PokemonOtherInfoContainer__Tailing'>
                    <span>{pokemonSpecies.capture_rate}</span>
                    <span className='PokemonOtherInfoContainer__catchWithPokeball ml-1'>({(pokemonSpecies.capture_rate * 33.3 / 255).toFixed(2)}% with PokéBall, full HP)</span>
                </span>
            </div>
            <div className='d-flex justify-content-between mt-1'>
                <span className='PokemonOtherInfoContainer__Heading'>Base Exp. : </span>
                <span className='PokemonOtherInfoContainer__Tailing'>{pokemon.base_experience}</span>
            </div>
        </div>
    )
}

export default PokemonOtherInfo;