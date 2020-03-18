import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { PokemonContext } from '../contexts/PokemonContext'
import PokemonItem from '../components/PokemonItem';

import LoadingPokeball from '../images/loadingPokeball.gif'

function renderPokemonItems(pokemonData) {
    return (
        <div className="PokeListContainer d-flex flex-wrap">
            {
                pokemonData.map(pokemon => (
                    <Link key={pokemon.data.id} className='pokemonLink' to={`/pokemon/${pokemon.data.name}`} style={{ textDecoration: 'none' }}>
                        <PokemonItem pokemon={pokemon}></PokemonItem>
                    </Link>
                ))
            }
        </div>
    )
}

function renderQuantity(pokemonDataList, isShowMoreBtn) {
    if (pokemonDataList.length !== 0 && isShowMoreBtn === false && pokemonDataList[0].data.id !== 'NotFound' && pokemonDataList[0].data.id !== 'blankText') {
        return (
            <h2 className='mt-4'>{`${pokemonDataList.length} Pokemon(s) found!`}</h2>
        )
    }
}

function PokeListContainer(props) {
    const { pokemonDataList, fetchPokemonDataList, isLoading, isShowMoreBtn } = useContext(PokemonContext);
    return (
        <div className='text-center mb-5'>
            {
                renderQuantity(pokemonDataList, isShowMoreBtn)
            }
            {
                (pokemonDataList.length === 0 || isLoading === true) && <img alt='loadingPokeball' className='loadingPokeball mt-5' src={LoadingPokeball}></img>
            }
            {
                pokemonDataList.length !== 0 && pokemonDataList[0].data.id === 'NotFound' && <h1 className='my-5'>Can not found!</h1>
            }
            {
                pokemonDataList.length !== 0 && pokemonDataList[0].data.id === 'blankText' && <h1 className='my-5'>Please enter Pokemon name or ID!</h1>
            }
            {
                pokemonDataList.length !== 0 && pokemonDataList[0].data.id !== 'NotFound' && pokemonDataList[0].data.id !== 'blankText' && renderPokemonItems(pokemonDataList)
            }
            {
                (pokemonDataList.length !== 0 && isShowMoreBtn === true) && <button className='loadMorebtn btn btn-primary my-5' onClick={() => fetchPokemonDataList(pokemonDataList.length + 1, pokemonDataList.length + 20)}>Load more Pokemon</button>
            }

        </div>
    )
}

export default PokeListContainer;