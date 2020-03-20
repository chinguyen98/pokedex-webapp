import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { PokemonContext } from '../contexts/PokemonContext'
import loadingPokeball from '../images/loadingPokeball.gif';
import EvolutionChainContainer from '../components/EvolutionChainContainer';

function PokemonDetailContainer() {
    const { pokemonName } = useParams();

    const [pokemon, setPokemon] = useState(null);
    const [evolutionChainData, setEvolutionChainData] = useState(null);
    const [pokemonSpecies, setPokemonSpecies] = useState(null);

    const { changeId, renderPokemonType, convertImageUrl } = useContext(PokemonContext);

    async function getPokemonDetail() {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(result => {
                setPokemon(result.data);
                axios.get(result.data.species.url)
                    .then(result2 => { setPokemonSpecies(result2.data) })
                return axios.get(result.data.species.url);
            })
            .then(result => {
                return axios.get(result.data.evolution_chain.url);
            })
            .then(result => {
                setEvolutionChainData(result.data.chain);
            })
            .catch(err => console.log(err));
    }

    function renderPokemonDescription() {
        let pokemonIntroInEnglish = pokemonSpecies.flavor_text_entries.filter(item => item.language.name === 'en');
        return (
            <div className='PokemonIntroContainer'>
                <h1 className='text-center'>Intro</h1>
                <p>
                    {pokemonIntroInEnglish[0].flavor_text}
                </p>
            </div>
        )
    }

    function renderPokemonOtherInfo() {
        return (
            <div className='PokemonOtherInfoContainer'>
                <h1 className='text-center'>Some Info</h1>
                <div>
                    <span className='PokemonOtherInfoContainer__Heading'>Growth rate: </span>
                    <span className='PokemonOtherInfoContainer__Tailing'>{pokemonSpecies.growth_rate.name}</span>
                </div>
            </div>
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
                <div className='d-flex justify-content-between mt-4 p-2'>
                    {renderPokemonDescription()}
                    <div className='PokemonDetailContainer__imageContainer'>
                        <span className='PokemonDetailContainer__imageContainer--height'>{parseFloat(pokemon.height / 10) * 1.0}m</span>
                        <img className='PokemonDetailContainer__image' src={convertImageUrl(pokemon.name)}></img>
                        <span className='PokemonDetailContainer__imageContainer--weight'>{parseFloat(pokemon.weight / 10)}kg</span>
                    </div>
                    {renderPokemonOtherInfo()}
                </div>
                <EvolutionChainContainer evolutionChainData={evolutionChainData}></EvolutionChainContainer>
            </div>
        )
    }

    return (
        <div>
            {
                (evolutionChainData === null || pokemon === null || pokemonSpecies === null) && <div className='text-center'><img alt='loadingPokeball' className='loadingPokeball mt-5' src={loadingPokeball}></img></div>
            }
            {
                (evolutionChainData !== null && pokemon !== null && pokemonSpecies !== null) && renderPokemonDetail()
            }
        </div>
    )

}

export default PokemonDetailContainer;