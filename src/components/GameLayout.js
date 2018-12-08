import React, { Component } from 'react';
import AlbumsLayout from './AlbumsLayout';
import Answer from './Answer';
import Hint from './Hint';
import Score from './Score';
import {getQuizData, getPointsByStrikes} from '../utils';
import {NUM_OF_ROUNDS, MAX_STRIKES} from '../constants';

class GameLayout extends Component {

    constructor() {
        super();
        this.state = {
          round: 0,
          loaded: false,
          quizData: {},
          strikes: 0,
          score:0, 
          hasEnded: false};
    }

    componentWillMount() {
      getQuizData(NUM_OF_ROUNDS).then((res) => this.startGame(res));
    }

    startGame(quizData) {
      this.setState({loaded: true, quizData, round:1, strikes: 0});
    }

    advanceRound() {
      const {round} = this.state;
      if(round+1 > NUM_OF_ROUNDS){
        this.setState({hasEnded: true});
      } else {
        this.setState({round: round+1, strikes: 0});
      }
    }

    correctGuess() {
      const {strikes, score} = this.state;
      // update points
      const pointsAwarded = getPointsByStrikes(strikes);
      this.setState({score: score+pointsAwarded});
      // advance round
      this.advanceRound();
    }

    incorrectGuess() {
      const {strikes} = this.state;
      if(strikes === MAX_STRIKES-1){
        this.advanceRound();
      }
      else {
        this.setState({strikes: strikes+1});
      }
    }

    shouldShowHint() {
      return this.state.strikes === 2;
    }
  render() {
    const {loaded, quizData,round, strikes, score, hasEnded} = this.state;
    if(!loaded){
      // TODO: Add loading page
      return null;
    }
    if(hasEnded){
      return (<Score score={score} hasEnded={hasEnded}/>)
    }
    const roundData = quizData[round-1];
    const shouldShowHint = this.shouldShowHint();
    return (
      [<div className="gamelayout">
        <AlbumsLayout roundData={roundData} strikes={strikes}/>
        <div className="submitpanel">
          <Answer
            roundData={roundData}
            correctGuess={this.correctGuess.bind(this)}
            incorrectGuess={this.incorrectGuess.bind(this)}
            points={getPointsByStrikes(strikes)}
          />
          <Hint roundData={roundData} show={shouldShowHint}/>
        </div>
      </div>,
        <Score score={score} hasEnded={hasEnded}/>
    ]
    );
  }
}

export default GameLayout;
