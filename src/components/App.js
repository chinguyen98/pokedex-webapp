import React from 'react';

import './css/App.css';

import Navbar from './Navbar';
import Searchbar from './Searchbar';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Searchbar></Searchbar>
    </div>
  );
}

export default App;
