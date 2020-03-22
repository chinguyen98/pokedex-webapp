import React from 'react';

function BaseStatContainer(props) {
    const { pokemon } = props;

    const arrReverse = [...pokemon.stats].reverse();

    const totalStat = arrReverse.reduce((total, item) => {
        return total + item.base_stat;
    }, 0)

    function getBarChartWidthByMaxStat(pokemonStat) {
        let percent = (pokemonStat.base_stat * 100 / 194).toFixed(2);
        if (percent >= 100)
            percent = 104;
        return percent;
    }

    function renderColorBarChart(percent) {
        percent = parseInt(percent)
        if (percent <= 10) {
            return 'red';
        }
        if (percent > 10 && percent <= 20) {
            return 'orange'
        }
        if (percent > 20 && percent < 45) {
            return 'yellow'
        }
        if (percent >= 45 && percent < 60) {
            return '#a0e515'
        }
        if (percent >= 60 && percent <= 80) {
            return '#23cd5e'
        }
        if (percent > 80) {
            return '#00c2b8';
        }
    }

    function renderAllStat() {
        return (
            <tbody>
                {
                    arrReverse.map(item => (
                        <tr key={item.stat.name}>
                            <th>
                                {item.stat.name === 'special-attack' && 'Sp. Atk'}
                                {item.stat.name === 'special-defense' && 'Sp. Def'}
                                {(item.stat.name !== 'special-attack' && item.stat.name !== 'special-defense') && item.stat.name}
                            </th>
                            <td><span style={{ marginLeft: '2rem', fontSize: '1.3rem' }}>{item.base_stat}</span></td>
                            <td>
                                <div className='BaseStatContainer__cell-barChart'>
                                    <div className='BaseStatContainer__barChart'
                                        style={{ width: `${getBarChartWidthByMaxStat(item)}%`, backgroundColor: `${renderColorBarChart(getBarChartWidthByMaxStat(item))}` }}>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        )
    }

    return (
        <div className='BaseStatContainer pt-2'>
            <h1 className='text-center'>Base Stat</h1>
            <table>
                {renderAllStat()}
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <td><span style={{ marginLeft: '2rem', fontSize: '1.3rem', fontWeight: 'bold' }}>{totalStat}</span></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default BaseStatContainer;