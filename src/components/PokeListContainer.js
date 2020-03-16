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
    const { pokemonDataList, fetchPokemonDataList } = useContext(PokemonContext);
    console.log(pokemonDataList)
    return (
        <div className='PokeListContainer text-center'>
            <div className='text-center mb-5'>
                {
                    pokemonDataList.length === 0 && <img alt='loadingPokeball' className='loadingPokeball' src={LoadingPokeball}></img>
                }
                {
                    pokemonDataList.length !== 0 && renderPokemonItems(pokemonDataList)
                }
            </div>
            <button className='loadMorebtn btn btn-primary mb-5' onClick={() => fetchPokemonDataList(pokemonDataList.length + 1, pokemonDataList.length + 20)}>Load more Pokemon</button>
        </div>
    )
}

export default PokeListContainer;