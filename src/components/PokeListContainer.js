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
            <div className='text-center mb-5'>
                {
                    pokemonDataList.length === 0 && <img alt='loadingPokeball' className='loadingPokeball' src={LoadingPokeball}></img>
                }
                {
                    pokemonDataList.length !== 0 && pokemonDataList[0].data.id === -1 && <h1 className='my-5'>No result!</h1>
                }
                {
                    pokemonDataList.length !== 0 && pokemonDataList[0].data.id !== -1 && renderPokemonItems(pokemonDataList)
                }
            <button className='loadMorebtn btn btn-primary my-5' onClick={() => fetchPokemonDataList(pokemonDataList.length + 1, pokemonDataList.length + 20)}>Load more Pokemon</button>
        </div>
    )
}

export default PokeListContainer;