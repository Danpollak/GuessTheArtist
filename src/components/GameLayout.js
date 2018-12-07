import React, { Component } from 'react';
import AlbumsLayout from './AlbumsLayout';
import Answer from './Answer';
import Hint from './Hint';
import Score from './Score';
import {getQuizData} from '../utils';

class GameLayout extends Component {

    constructor() {
        super();
        this.state = {round: 0, loaded: false, quizData: {}, strikes: 2, score:0};
    }

    componentWillMount() {
      getQuizData().then((res) => this.startGame(res));
    }

    startGame(quizData) {
      this.setState({loaded: true, quizData, round:1, strikes: 0});
    }

    advanceRound() {
      const round = this.state.round;
      this.setState({round: round+1});
    }

    shouldShowHint() {
      // TODO: Complete
      return true;
    }
  render() {
    const {loaded, quizData,round, strikes, score} = this.state;
    if(!loaded){
      // TODO: Add loading page
      return null;
    }
    const roundData = quizData[round-1];
    const shouldShowHint = this.shouldShowHint();
    return (
      <div className="gameLayout">
        <AlbumsLayout roundData={roundData} strikes={strikes}/>
        <Answer roundData={roundData}/>
        <Hint roundData={roundData} show={this.shouldShowHint}/>
        <Score score/>
      </div>
    );
  }
}

export default GameLayout;
