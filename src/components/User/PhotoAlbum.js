import React, { Component } from 'react';

import Page from '../Page';
import UserAccountPanel from './UserAccountPanel';

class PhotoAlbum extends Component {
  render() {
    return (
      <Page style={{whiteSpace:'normal'}}>
        <UserAccountPanel>
          <h3 className="margin-top-0">Photo Album</h3>
          <hr/>
        </UserAccountPanel>
      </Page>
    )
  }
}

export default PhotoAlbum;
