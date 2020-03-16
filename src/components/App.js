import React from 'react';

import './css/App.css';

import Navbar from './Navbar';
import Searchbar from './Searchbar';
import PokeListContainer from '../components/PokeListContainer';
import { PokemonProvider } from '../contexts/PokemonContext';

function App() {
  return (
    <PokemonProvider>
      <div className="App">
        <Navbar></Navbar>
        <Searchbar></Searchbar>
        <PokeListContainer></PokeListContainer>
      </div>
    </PokemonProvider>
  );
}

export default App;
