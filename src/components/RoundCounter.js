import React, { Component } from 'react';

class RoundCounter extends Component {
  createRound(val, roundNum) {
    let color = '#fff';
    if(val >= 0) {
      if(val === 0){
        color = '#d00';
      }
      else {
        color = '#0d0';
      }
    }
    return (<svg height="40" width="40" className='roundCircle' key={`roundCircle${roundNum}`}>
    <circle cx="20" cy="20" r="18" stroke="#d7d7d7" strokeWidth="3" fill={color} />
    </svg>)
  }
  render() {
    const {roundScores} = this.props;
    return (
      <div className="roundcounter"> 
      {roundScores.map((round,i) => this.createRound(round,i))}
      </div>
    );
  }
}

export default RoundCounter;
