import React, { Component } from 'react';

class Answer extends Component {  
  constructor() {
    super();
    this.state = {guess: ''};
  }

  handleChange(e) {
    this.setState({guess: e.target.value});
  }
  checkAnswer() {
    const {correctGuess, incorrectGuess, roundData} = this.props;
    const correctAnswer = roundData.artist;
    const {guess} = this.state;
    if(guess === correctAnswer){
      console.log("yes!")
      correctGuess();
    } else {
      console.log("no!", correctAnswer, guess);
      incorrectGuess();
    }
    }
  render() {
    return (
      <div className="answer">
          <input type='text' name='guess' value={this.state.guess} onChange={this.handleChange.bind(this)}/>
          <button onClick={this.checkAnswer.bind(this)}>Check Me!</button>
      </div>
    );
  }
}

export default Answer;
