import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cloudinary from 'cloudinary-core';
import orderBy from "lodash/orderBy";
import moment from 'moment';
import { database } from "../../services/firebase";
import { USER_PHOTOGRAPHER, RESERVATION_COMPLETED } from "../../services/userTypes";

import Page from '../Page';
import UserAccountPanel from './UserAccountPanel';

const retrieveAlbums = async (uid, userType) => {
  let ref = null;
  if (userType === USER_PHOTOGRAPHER) {
    ref = database
      .database()
      .ref('reservations')
      .orderByChild('photographerId')
      .equalTo(uid);

  } else {
    ref = database
      .database()
      .ref('reservations')
      .orderByChild('travellerId')
      .equalTo(uid);
  }

  try {
    const retrieve = await ref.once('value');
    const vals = await retrieve.val();
    const results = orderBy(vals, ['created'], ['desc']);
    const resultsFiltered = [];

    Object.keys(results).forEach((item) => {
      const reservation = results[item];
      if (reservation.status === RESERVATION_COMPLETED) {
        resultsFiltered.push(reservation);
      }
    });

    return resultsFiltered;

  } catch (error) {
    throw error;
  }
};

class PhotoAlbum extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      isDownloading: false
    };

    this.cloudinaryInstance = cloudinary.Cloudinary.new({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      secure: true
    });
  }

  componentDidMount() {
    const {
      user: { uid, userMetadata: { userType } }
    } = this.props;

    this.setState({ isDownloading: true });

    retrieveAlbums(uid, userType)
      .then((data) => {
        this.setState({ albums: data, isDownloading: false });
      })
      .catch((error) => {
        this.setState({ isDownloading: false });
        console.log(error);
      });
  }

  componentWillUnmount() {
    this.cloudinaryInstance = null;
  }

  render() {
    const {
      user: { userMetadata: { userType } }
    } = this.props;

    return (
      <Page style={{ whiteSpace:'normal' }}>
        <UserAccountPanel>
          <div>
            <h3 className="margin-top-0">Photo Album</h3>
            {
              this.state.albums.length > 0
                ? (<p>Recent</p>)
                : null
            }
          </div>

          <div className="user-dashboard-albums-list">
            {
              !this.state.isDownloading && this.state.albums.length > 0
                ? this.state.albums.map((album, index) => {
                  const albumOwnerName = userType === USER_PHOTOGRAPHER ? album.uidMapping[album.travellerId].displayName : album.uidMapping[album.photographerId].displayName;
                  const albumDate = moment(album.startDateTime).format('MMMM Do YYYY');

                  return (
                    <div key={index} className="albums-item">
                      <div className="albums-item-default-picture">
                        <Link to={`/me/albums/${album.reservationId}`}>
                          <img
                            src={this.cloudinaryInstance.url(album.hasOwnProperty('defaultAlbumPhotoPublicId') ? album.defaultAlbumPhotoPublicId : 'assets/empty-album_q14ui1', { width: 320, crop: 'scale', quality: 'auto:best' })}
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="albums-item-information">
                        <p>{ albumOwnerName.charAt(0).toUpperCase() + albumOwnerName.slice(1) }</p>
                        <p>Destination: { album.destination }</p>
                        <p>{ albumDate }</p>
                        <p>{ album.hasOwnProperty('defaultAlbumPhotoPublicId') ? 'Delivered' : 'Waiting' }</p>
                      </div>
                    </div>
                  )
                })
                : (
                  <div>
                    {
                      this.state.isDownloading
                        ? (
                          <p>Retrieving albums, Please wait...</p>
                        )
                        : (
                          <p>No albums available</p>
                        )
                    }
                  </div>
                )
            }

          </div>
        </UserAccountPanel>
      </Page>
    )
  }
}

export default connect(
  (state) => ({ user: state.userAuth })
)(PhotoAlbum);
