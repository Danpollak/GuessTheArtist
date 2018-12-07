import React, { Component } from 'react';
import {artistNames} from '../constants';
import AlbumsLayout from './AlbumsLayout';
import Answer from './Answer';

class GameLayout extends Component {

    constructor() {
        super();
        this.state = {round: 1};
    }

  render() {
      console.log(artistNames);
    return (
      <div className="gameLayout">
        <AlbumsLayout/>
        <Answer/>
      </div>
    );
  }
}

export default GameLayout;
