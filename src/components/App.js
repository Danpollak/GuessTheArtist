import React, { Component } from 'react';
import GameLayout from './GameLayout';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="gametitle">
          Guess The Artist
        </div>
        <GameLayout/>
      </div>
    );
  }
}

export default App;
