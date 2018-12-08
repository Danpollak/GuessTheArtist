import React, { Component } from 'react';

class RoundCounter extends Component {
  createRound(val) {
    let color = '#fff';
    if(val >= 0) {
      if(val === 0){
        color = '#d00';
      }
      else {
        color = '#0d0';
      }
    }
    return (<svg height="60" width="60">
    <circle cx="20" cy="20" r="20" stroke="black" stroke-width="3" fill={color} />
    </svg>)
  }
  render() {
    const {roundScores} = this.props;
    return (
      <div className="roundcounter"> 
      {roundScores.map((round) => this.createRound(round))}
      </div>
    );
  }
}

export default RoundCounter;
