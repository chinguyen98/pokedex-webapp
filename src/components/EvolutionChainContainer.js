import React from 'react';

function EvolutionChainContainer(props) {
    const { evolutionChainData } = props;

    function mapEvolutionChain() {
        let evolutionChain = [];
        let evolutionData = evolutionChainData;

        // /console.log(evolutionChainData)

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

        //console.log(evolutionChain)
    }

    // function mapEvolutionChain() {
    //     let evolutionChain = [];
    //     let evolutionData = evolutionChainData;

    //     do {
    //         var evolutionDetails = evolutionData['evolution_details'][0];
    //         let numberOfEvolution = evolutionData.evolves_to.length;

    //         evolutionChain.push({
    //             'pokemonName': evolutionData.species.name,
    //             'minLevel': !evolutionDetails ? 1 : evolutionDetails.min_level,
    //             'trigger': !evolutionDetails ? null : evolutionDetails.trigger.name,
    //             'min_happiness': !evolutionDetails ? null : evolutionDetails.min_happiness,
    //             'item': !evolutionDetails ? null : evolutionDetails.item
    //         });

    //         // if (numberOfEvolution > 1) {
    //         //     console.log('qwew')
    //         //     let extraEvo = [];
    //         //     for (let i = 1; i < numberOfEvolution; i++) {
    //         //         extraEvo.push({
    //         //             'pokemonName': evolutionData.evolves_to[i].species.name,
    //         //             'minLevel': !evolutionData.evolves_to[i] ? 1 : evolutionData.evolves_to[i].min_level,
    //         //             'trigger': !evolutionData.evolves_to[i] ? null : evolutionData.evolves_to[i].trigger.name,
    //         //             'min_happiness': !evolutionData.evolves_to[i] ? null : evolutionData.evolves_to[i].min_happiness,
    //         //             'item': !evolutionData.evolves_to[i] ? null : evolutionData.evolves_to[i].item
    //         //         })
    //         //     }
    //         //     evolutionChain.push(extraEvo)
    //         // }

    //         evolutionData = evolutionData['evolves_to'][0];
    //     } while (!!evolutionData && evolutionData.hasOwnProperty('evolves_to'));

    //     console.log(evolutionChainData)
    //     //console.log(evolutionChain)
    // }

    return (
        <div>
            <h1>Evo</h1>
            {
                mapEvolutionChain()
            }
        </div>
    )
}

export default EvolutionChainContainer;