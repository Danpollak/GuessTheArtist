import React, { Component } from 'react';
import AlbumsLayout from './AlbumsLayout';
import Answer from './Answer';
import Hint from './Hint';
import Score from './Score';
import {startGame} from '../utils';

class GameLayout extends Component {

    constructor() {
        super();
        this.state = {round: 1};
    }

  render() {
    startGame();
    return (
      <div className="gameLayout">
        <AlbumsLayout/>
        <Answer/>
        <Hint/>
        <Score/>
      </div>
    );
  }
}

export default GameLayout;
