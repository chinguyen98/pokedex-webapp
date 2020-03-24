import React, { useState, useEffect } from 'react';
import loadingPokeball from '../images/loadingPokeball.gif';
import axios from 'axios';

function EvolutionChainContainer(props) {
    const { evolutionChainData, convertImageUrl } = props;
    const [listEvolPokemon, setListEvolPokemon] = useState(null);

    function mapEvolutionChain() {
        let evolutionChain = [];
        let evolutionData = evolutionChainData;

        do {
            let numberOfEvolution = evolutionData.evolves_to.length;
            evolutionChain.push({
                'pokemonName': evolutionData.species.name,
                'minLevel': !evolutionData['evolution_details'][0] ? 1 : evolutionData['evolution_details'][0].min_level,
                'trigger': !evolutionData['evolution_details'][0] ? null : evolutionData['evolution_details'][0].trigger.name,
                'min_happiness': !evolutionData['evolution_details'][0] ? null : evolutionData['evolution_details'][0].min_happiness,
                'item': !evolutionData['evolution_details'][0] ? null : evolutionData['evolution_details'][0].item
            });

            if (numberOfEvolution > 1) {
                let extraEvo = [];
                for (let i = 0; i < numberOfEvolution; i++) {
                    extraEvo.push({
                        'pokemonName': evolutionData.evolves_to[i].species.name,
                        'minLevel': !evolutionData.evolves_to[i]['evolution_details'][0] ? 1 : evolutionData.evolves_to[i]['evolution_details'][0].min_level,
                        'trigger': !evolutionData.evolves_to[i]['evolution_details'][0] ? null : evolutionData.evolves_to[i]['evolution_details'][0].trigger.name,
                        'min_happiness': !evolutionData.evolves_to[i]['evolution_details'][0] ? null : evolutionData.evolves_to[i]['evolution_details'][0].min_happiness,
                        'item': !evolutionData.evolves_to[i]['evolution_details'][0] ? null : evolutionData.evolves_to[i]['evolution_details'][0].item
                    })
                }
                evolutionChain.push(extraEvo);
            }

            evolutionData = evolutionData['evolves_to'][0];
        } while (!!evolutionData && evolutionData.hasOwnProperty('evolves_to'));

        if (typeof evolutionChain[evolutionChain.length - 1] === 'object' && Array.isArray(evolutionChain[evolutionChain.length - 2])) {
            evolutionChain.pop();
        }

        return evolutionChain;
    }

    function getPokemonIdAndType(pokemonName) {
        let idAndType = listEvolPokemon.filter(item => item.name === pokemonName).map(item => { return { id: item.id, types: item.types } })[0];
        return idAndType;
    }

    function renderChainItem(item, index) {
        return (
            <div key={index} className='EvolutionChart__Item'>
                {
                    Array.isArray(item) &&
                    <div>

                        {
                            item.map((subitem, index) => (
                                <div key={subitem.pokemonName} className='d-flex flex-column justity-content-center align-items-center mb-5'>
                                    <p>{`#${getPokemonIdAndType(subitem.pokemonName).id}`}</p>
                                    <img src={convertImageUrl(subitem.pokemonName)} alt={subitem.pokemonName}></img>
                                    <p className='mt-2'>{subitem.pokemonName}</p>
                                    <div className='d-flex flex-row'>
                                        {getPokemonIdAndType(subitem.pokemonName).types.map(item => <div className={`mx-1 text-center  pokemonType__${item.type.name} EvolutionChart__Item__types`} key={item.type.name}>
                                            {item.type.name}
                                        </div>)}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
                {
                    !Array.isArray(item) &&
                    <div className='d-flex flex-column justity-content-center align-items-center'>
                        <p>{`#${getPokemonIdAndType(item.pokemonName).id}`}</p>
                        <img src={convertImageUrl(item.pokemonName)} alt={item.pokemonName}></img>
                        <p>{item.pokemonName}</p>
                        <div className='d-flex flex-row'>
                            {getPokemonIdAndType(item.pokemonName).types.map(item => <div className={`mx-1 text-center  pokemonType__${item.type.name} EvolutionChart__Item__types`} key={item.type.name}>
                                {item.type.name}
                            </div>)}
                        </div>
                    </div>
                }
            </div>
        )
    }

    function renderEvolutionChain(evolutionChain) {
        console.log(evolutionChain)
        return (
            <div className='EvolutionChart container d-flex justify-content-around align-items-center'>
                {
                    evolutionChain.map((item, index) => renderChainItem(item, index))
                }
            </div>
        )
    }

    async function getEvolChainInfo() {
        let evoChain = JSON.parse(JSON.stringify(mapEvolutionChain())).flat().map(item => item.pokemonName);
        let data = await Promise.all(evoChain.map(item => axios.get(`https://pokeapi.co/api/v2/pokemon/${item}/`)));
        setListEvolPokemon(data.map(item => item.data))
    }

    useEffect(() => {
        getEvolChainInfo();
    }, [])

    return (
        <div>
            <h1 className='text-center my-5'>Evolution Chart</h1>
            {
                listEvolPokemon === null && <div className='text-center'><img alt='loadingPokeball' className='loadingPokeball mt-5' src={loadingPokeball}></img></div>
            }
            {
                listEvolPokemon !== null && renderEvolutionChain(mapEvolutionChain())
            }
        </div>
    )
}

export default EvolutionChainContainer;