import React, { Component } from 'react';

class Hint extends Component {
  render() {
    const {show, roundData} = this.props;
    const {albumArtwork} = roundData;
    const imageSrc = show ? albumArtwork : `/nohint.png`
    return (
      <div className="hint">
        Hint: <img src={imageSrc} className="hintimage"/> 
      </div>
    );
  }
}

export default Hint;
