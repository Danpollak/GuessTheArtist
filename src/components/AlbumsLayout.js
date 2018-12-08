import React, { Component } from 'react';
import RoundCounter from './RoundCounter';
import Album from './Album';

class AlbumsLayout extends Component {
  generateAlbums() {
    const {roundData, strikes} = this.props;
    const {albumNames} = roundData;
    return albumNames.map((name, i) => {
      return <Album key={name} albumName={name} show={strikes > i-1}/>
    }) 
  }
  render() {
    const {roundData, strikes, round, roundScores} = this.props;
    return (
      <div className="albumslayout">
        <RoundCounter key='counter' roundScores={roundScores} />
        {`Round ${round}`}
        <br/>
        {this.generateAlbums()}
      </div>
    );
  }
}

export default AlbumsLayout;
