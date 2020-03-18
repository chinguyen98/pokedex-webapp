import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './css/App.css';

import Navbar from './Navbar';
import Searchbar from './Searchbar';
import PokeListContainer from '../components/PokeListContainer';
import PokemonDetailContainer from '../components/PokemonDetailContainer';
import { PokemonProvider } from '../contexts/PokemonContext';

function App() {
  return (
    <Router>
      <PokemonProvider>
        <div className="App">
          <Navbar></Navbar>
          <Searchbar></Searchbar>
          <Switch>
            <Route exact path='/'>
              <PokeListContainer></PokeListContainer>
            </Route>
            <Route path='/pokemon/:pokemonName'><PokemonDetailContainer></PokemonDetailContainer></Route>
          </Switch>
        </div>
      </PokemonProvider>
    </Router>
  );
}

export default App;
