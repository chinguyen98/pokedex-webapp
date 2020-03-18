import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { PokemonContext } from '../contexts/PokemonContext'
import loadingPokeball from '../images/loadingPokeball.gif';

function PokemonDetailContainer() {
    const { pokemonName } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const { changeId, renderPokemonType, convertImageUrl } = useContext(PokemonContext);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(result => {
                setPokemon(result.data);
            })
            .catch(err => console.log(err));
    }, []);

    function renderPokemonDetail() {
        console.log(pokemon)
        return (
            <div className='PokemonDetailContainer mt-4 mx-5 p-3'>
                <img className='PokemonDetailContainer__image' src={convertImageUrl(pokemon.name)}></img>
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