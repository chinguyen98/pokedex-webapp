import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { PokemonContext } from '../contexts/PokemonContext'
import loadingPokeball from '../images/loadingPokeball.gif';

function PokemonDetailContainer() {
    const { pokemonName } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const { changeId, renderPokemonType, convertImageUrl } = useContext(PokemonContext);

    async function getPokemonDetail() {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(result => {
                setPokemon(result.data);
            })
            .catch(err => console.log(err));
    }

    async function getEvolutionDetail(pokemon){
        console.log(pokemon.id)
    }

    function renderEvolutionDetail(id) {
        // let evolutionData = null;
        // axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
        //     .then(result => {
        //         return axios.get(result.data.evolution_chain.url);
        //     })
        //     .then(result => {
        //         evolutionData = result.data.chain;
        //     });

        return (
            <div>
                <h1>Evo</h1>
            </div>
        )
    }

    function getPokemonStat() {
        return (
            <h1>Stat</h1>
        )
    }

    useEffect(() => {
        getPokemonDetail();
    }, []);

    function renderPokemonDetail() {
        return (
            <div className='PokemonDetailContainer mt-4 mx-5 p-2'>
                <div className='d-flex flex-column align-items-center'>
                    <span className='PokemonDetailContainer__ID'>#{changeId(pokemon.id)}</span>
                    <h1 className='text-center'>{pokemon.name}</h1>
                    {renderPokemonType(pokemon.types)}
                </div>
                <div className='d-flex justify-content-around mt-4'>
                    {renderEvolutionDetail(pokemon.id)}
                    <div className='PokemonDetailContainer__imageContainer'>
                        <span className='PokemonDetailContainer__imageContainer--height'>{parseFloat(pokemon.height / 10) * 1.0}m</span>
                        <img className='PokemonDetailContainer__image' src={convertImageUrl(pokemon.name)}></img>
                        <span className='PokemonDetailContainer__imageContainer--weight'>{parseFloat(pokemon.weight / 10)}kg</span>
                    </div>
                    {getPokemonStat()}
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                pokemon === null && <div className='text-center'><img alt='loadingPokeball' className='loadingPokeball mt-5' src={loadingPokeball}></img></div>
            }
            {
                pokemon !== null && renderPokemonDetail()
            }
        </div>
    )

}

export default PokemonDetailContainer;