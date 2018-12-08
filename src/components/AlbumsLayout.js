import React, { Component } from 'react';
import Album from './Album';

class AlbumsLayout extends Component {
  render() {
    const {roundData, strikes} = this.props;
    const {albumNames} = roundData;
    return (
      <div className="albumslayout">
        <Album albumName={albumNames[0]} show={true}/>
        <Album albumName={albumNames[1]} show={strikes > 0}/>
        <Album albumName={albumNames[2]} show={strikes > 1}/>
      </div>
    );
  }
}

export default AlbumsLayout;
