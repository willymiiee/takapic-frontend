import React from 'react';
import { connect } from 'react-redux';
import { USER_PHOTOGRAPHER } from "../../services/userTypes";

import PhotoAlbumDetailPhotographer from './PhotoAlbumDetailPhotographer';
import PhotoAlbumDetailConsumer from './PhotoAlbumDetailConsumer';

const PhotoAlbumDetail = (props) => {
  const {
    user: { userMetadata: { userType } }
  } = props;

  if (userType === USER_PHOTOGRAPHER) {
    return <PhotoAlbumDetailPhotographer { ...props }/>
  }
  return <PhotoAlbumDetailConsumer { ...props }/>
};

export default connect(
  (state) => ({ user: state.userAuth })
)(PhotoAlbumDetail);

