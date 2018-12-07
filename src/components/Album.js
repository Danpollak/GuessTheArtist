import React, { Component } from 'react';

class Album extends Component {
  render() {
    const {albumName, show} = this.props;
    return (
      <div className="album">
      {show ? albumName : 'none'}
      </div>
    );
  }
}

export default Album;
