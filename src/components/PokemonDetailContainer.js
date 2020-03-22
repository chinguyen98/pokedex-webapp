import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { PokemonContext } from '../contexts/PokemonContext'
import loadingPokeball from '../images/loadingPokeball.gif';
import EvolutionChainContainer from '../components/EvolutionChainContainer';
import PokemonOtherInfo from '../components/PokemonOtherInfo';
import BaseStatContainer from '../components/BaseStatContainer';
import TypeDefenseContainer from '../components/TypeDefenseContainer';

function PokemonDetailContainer() {
    const { pokemonName } = useParams();

    const [pokemon, setPokemon] = useState(null);
    const [evolutionChainData, setEvolutionChainData] = useState(null);
    const [pokemonSpecies, setPokemonSpecies] = useState(null);

    const { changeId, renderPokemonType, convertImageUrl, listPokemonType } = useContext(PokemonContext);

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
            <div className='PokemonIntroContainer pt-2'>
                <h1 className='text-center'>Intro</h1>
                <p>
                    {pokemonIntroInEnglish[0].flavor_text}
                </p>
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
                        <img className='PokemonDetailContainer__image' src={convertImageUrl(pokemon.name)} alt={pokemon.name}></img>
                        <span className='PokemonDetailContainer__imageContainer--weight'>{parseFloat(pokemon.weight / 10)}kg</span>
                    </div>
                    <PokemonOtherInfo pokemonSpecies={pokemonSpecies} pokemon={pokemon}></PokemonOtherInfo>
                </div>
                <div className='d-flex justify-content-between my-5'>
                    <BaseStatContainer pokemon={pokemon}></BaseStatContainer>
                    <TypeDefenseContainer pokemon={pokemon} listPokemonType={listPokemonType}></TypeDefenseContainer>
                </div>
                <EvolutionChainContainer evolutionChainData={evolutionChainData}></EvolutionChainContainer>
            </div>
        )
    }

    return (
        <div>
            {
                (evolutionChainData === null || pokemon === null || pokemonSpecies === null || listPokemonType === null)
                && <div className='text-center'><img alt='loadingPokeball' className='loadingPokeball mt-5' src={loadingPokeball}></img></div>
            }
            {
                (evolutionChainData !== null && pokemon !== null && pokemonSpecies !== null && listPokemonType !== null)
                && renderPokemonDetail()
            }
        </div>
    )

}

export default PokemonDetailContainer;