import React, { Component } from 'react';

class Score extends Component {
  render() {
    const {score, hasEnded} = this.props;
    return (
      <div className="score">
      {hasEnded ? 'Game Over!' : ''}
      <br/>
      {`Score: ${score}`}
      </div>
    );
  }
}

export default Score;
