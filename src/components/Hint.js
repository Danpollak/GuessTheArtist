import React, { Component } from 'react';

class Hint extends Component {
  render() {
    const {show, roundData} = this.props;
    const {albumArtwork} = roundData;
    return (
      <div className="hint">
        {show ? 
        <img src={albumArtwork} /> :
        'no hint'}
      </div>
    );
  }
}

export default Hint;
