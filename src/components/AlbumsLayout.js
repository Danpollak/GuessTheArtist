import React, { Component } from 'react';
import Album from './Album';

class AlbumsLayout extends Component {
  render() {
    return (
      <div className="albumLayout">
      This is the album layout.
        <Album/>
        <Album/>
        <Album/>
      </div>
    );
  }
}

export default AlbumsLayout;
