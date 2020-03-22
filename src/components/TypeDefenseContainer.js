import React from 'react';

function TypeDefenseContainer(props) {
    const { pokemon, listPokemonType } = props;

    function convertTypeName(type) {
        return type.slice(0, 3).toUpperCase();
    }

    function getTypeDefense() {
        let ownerTypeData = null
        if (pokemon.types.length === 1) {
            ownerTypeData = listPokemonType.filter(item => {
                return item.name === pokemon.types[0].type.name;
            }).map(item => {
                return {
                    'double_damage_from': item.damage_relations.double_damage_from,
                    'half_damage_from': item.damage_relations.half_damage_from,
                    'no_damage_from': item.damage_relations.no_damage_from,
                }
            })
        } else {
            ownerTypeData = listPokemonType.filter(item => {
                return item.name === pokemon.types[0].type.name || item.name === pokemon.types[1].type.name;
            }).map(item => {
                return {
                    'double_damage_from': item.damage_relations.double_damage_from,
                    'half_damage_from': item.damage_relations.half_damage_from,
                    'no_damage_from': item.damage_relations.no_damage_from,
                }
            })
        }
        return ownerTypeData;
    }

    function calcDoubleDamageDefenseType(typeData) {
        let tempCalcDamageArr = [];
        typeData.forEach(item => {
            let calcNumberArr = [...item.double_damage_from].map(item => {
                return { 'name': item.name, 'calc': 2 }
            }).reduce((result, item) => {
                return result.concat(item);
            }, []);
            tempCalcDamageArr.push(calcNumberArr)
        })
        let calcDamageArr = tempCalcDamageArr.flat().reduce((result, item) => {
            let index = result.findIndex(el => el.name === item.name);
            return index === -1 ? result.concat(item)
                : [...result.slice(0, index), { 'name': item.name, 'calc': item.calc * 2 }, ...result.slice(index + 1)]
        }, [])
        return calcDamageArr;
    }

    function calcHalfDamageDefenseType(typeData) {
        let tempCalcDamageArr = [];
        typeData.forEach(item => {
            let calcNumberArr = [...item.half_damage_from].map(item => {
                return { 'name': item.name, 'calc': 0.5 }
            }).reduce((result, item) => {
                return result.concat(item);
            }, []);
            tempCalcDamageArr.push(calcNumberArr)
        })
        let calcDamageArr = tempCalcDamageArr.flat().reduce((result, item) => {
            let index = result.findIndex(el => el.name === item.name);
            return index === -1 ? result.concat(item)
                : [...result.slice(0, index), { 'name': item.name, 'calc': item.calc * 0.5 }, ...result.slice(index + 1)]
        }, [])
        return calcDamageArr;
    }

    function calcNoDamageDefenseType(typeData) {
        let tempCalcDamageArr = [];
        typeData.forEach(item => {
            let calcNumberArr = [...item.no_damage_from].map(item => {
                return { 'name': item.name, 'calc': 0 }
            }).reduce((result, item) => {
                return result.concat(item);
            }, []);
            tempCalcDamageArr.push(calcNumberArr)
        })
        let calcDamageArr = tempCalcDamageArr.flat().reduce((result, item) => {
            let index = result.findIndex(el => el.name === item.name);
            return index === -1 ? result.concat(item)
                : [...result.slice(0, index), { 'name': item.name, 'calc': item.calc * 0 }, ...result.slice(index + 1)]
        }, [])
        return calcDamageArr;
    }

    function totalDamageDefenseType() {
        let halfDamageArr = calcHalfDamageDefenseType(getTypeDefense());
        let doubleDamageArr = calcDoubleDamageDefenseType(getTypeDefense());
        let noDamageArr = calcNoDamageDefenseType(getTypeDefense());
        let totalDamgeType = [...halfDamageArr, ...doubleDamageArr, ...noDamageArr].reduce((result, item) => {
            let index = result.findIndex(el => el.name === item.name);
            return index === -1 ? result.concat(item)
                : [...result.slice(0, index), { 'name': item.name, 'calc': item.calc * result[index].calc }, ...result.slice(index + 1)]
        }, []).filter(item => item.calc !== 1)
        return totalDamgeType;
    }

    function renderCalcDamage(calcDamageArr, type) {
        let obj = calcDamageArr.filter(item => item.name === type);
        let configData = null;

        if (obj[0] !== undefined) {
            switch (obj[0].calc) {
                case 2: {
                    configData = { bgColor: '#4e9a06', calc: '2' };
                    break;
                }
                case 4: {
                    configData = { bgColor: '#73d216', calc: '4' };
                    break;
                }
                case 0.5: {
                    configData = { bgColor: '#a40000', calc: '1/2' };
                    break;
                }
                case 0.25: {
                    configData = { bgColor: '#7c0000', calc: '1/4' };
                    break;
                }
                case 0: {
                    configData = { bgColor: 'black', calc: '0' };
                    break;
                }
                default: {
                    configData = { bgColor: 'blue', calc: obj[0].calc };
                    break;
                }
            }
        }

        return (
            <div>
                {
                    obj[0] === undefined ? <div></div> :
                        <div className='TypeDefenseContainer__Grid__CalcNum' style={{ backgroundColor: configData.bgColor }}>
                            {configData.calc}
                        </div>
                }
            </div>
        )
    }

    function renderTypeDefenseDetail() {
        const calcDamageArr = totalDamageDefenseType();
        return (
            <div className='TypeDefenseContainer__Grid text-center'>
                {
                    listPokemonType.map(type => (
                        <div key={type.name} className='TypeDefenseContainer__Grid__Item mb-3'>
                            <div className={`pokemonType__${type.name}`}>{convertTypeName(type.name)}</div>
                            {renderCalcDamage(calcDamageArr, type.name)}
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className='TypeDefenseContainer pt-2'>
            <h1 className='text-center'>Type Defenses</h1>
            <p className='text-center'>The effectiveness of each type on {pokemon.name}</p>
            {renderTypeDefenseDetail()}
        </div>
    )
}

export default TypeDefenseContainer;