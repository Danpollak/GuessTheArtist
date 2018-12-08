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
          hasEnded: false,
          roundScores: [-1,-1,-1,-1,-1]
        };
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
      const {strikes, score, round} = this.state;
      // update points
      const pointsAwarded = getPointsByStrikes(strikes);
      this.updateRoundScore(round,pointsAwarded);
      this.setState({score: score+pointsAwarded});
      // advance round
      this.advanceRound();
    }

    incorrectGuess() {
      const {strikes, round} = this.state;
      if(strikes === MAX_STRIKES-1){
        this.updateRoundScore(round,0);
        this.advanceRound();
      }
      else {
        this.setState({strikes: strikes+1});
      }
    }

    updateRoundScore(round, points) {
      const {roundScores} = this.state;
      let newScores = roundScores.slice();
      newScores[round-1] = points;
      this.setState({roundScores: newScores})
    }

    shouldShowHint() {
      return this.state.strikes === 2;
    }
  render() {
    const {loaded, quizData,round, strikes, score, hasEnded, roundScores} = this.state;
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
        <AlbumsLayout roundData={roundData} round={round} roundScores={roundScores} strikes={strikes}/>
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
