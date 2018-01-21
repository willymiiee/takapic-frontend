import React, { Component } from 'react';
import Gallery from '../../react-grid-gallery/Gallery';
import cloudinary from 'cloudinary-core';
import { database } from "../../services/firebase";

import Page from '../Page';
import UserAccountPanel from './UserAccountPanel';

class PhotoAlbumDetailConsumer extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      reservationId: '',
      isDownloading: false
    };

    this.cloudinaryInstance = cloudinary.Cloudinary.new({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      secure: true
    });
  }

  componentDidMount() {
    const { match: { params: { reservationId } } } = this.props;
    this.setState({ reservationId, isDownloading: true });

    database
      .database()
      .ref('albums')
      .child(reservationId)
      .once('value')
      .then((result) => {
        const images = result.val();
        this.setState({ images: images || [], isDownloading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isDownloading: false });
      });
  }

  componentWillUnmount() {
    this.cloudinaryInstance = null;
  }

  render() {
    const images = this.state.images.map((item) => {
      return {
        src: this.cloudinaryInstance.url(item.publicId, { width: 1024, crop: 'scale', quality: 'auto:best' }),
        thumbnail: this.cloudinaryInstance.url(item.publicId, { width: 320, crop: 'scale', quality: 'auto:best' }),
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        isSelected: item.isSelected
      };
    });

    return (
      <Page style={{ whiteSpace:'normal' }}>
        <UserAccountPanel>
          <div className="photo-album-list-header">
            <h3 className="margin-top-0">Photo Album</h3>
          </div>

          <hr/>
          <p className="photo-album-length"><span>{ this.state.images.length }</span></p>

          {
            this.state.images.length > 0
              ? (
                <div className="photo-album-gallery traveller">
                  <Gallery
                    images={images}
                    enableImageSelection={false}
                  />
                </div>
              )
              : (
                <p>No photos available.</p>
              )
          }

          <div style={{ clear: 'both' }}/>
        </UserAccountPanel>
      </Page>
    )
  }
}

export default PhotoAlbumDetailConsumer;
