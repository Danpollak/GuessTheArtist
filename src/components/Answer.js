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
    this.setState({guess: ''});
    }
  render() {
    const {points} = this.props;
    return (
      <div className="answer">
          {`For ${points} points:`}
          <br/>
          <textarea className="guessinput" rows="1" cols="30"  value={this.state.guess} onChange={this.handleChange.bind(this)}/>
          <br/>
          <button className="submitbutton" onClick={this.checkAnswer.bind(this)}>🎵 Hit me with your best shot 🎵</button>
      </div>
    );
  }
}

export default Answer;
