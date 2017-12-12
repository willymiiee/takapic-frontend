import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar, Button } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';

import { uploadPhotosPortfolio } from '../../store/actions/profileUpdateActions';
import { updateUserMetadataDefaultDisplayPicture } from "../../store/actions/photographerServiceInfoActionsStep2";

class PhotosPortofolio extends Component {
  constructor() {
    super();
    this.state = {
      photosPortofolio: [],
      selectedPhotos: [],
      loading: false,
      loaded: false,
      percentages: [],
      defaultDisplayPictureUrl: '',
      photosPortofolioDeleted: []
    };
  }

  componentWillMount() {
    const { photographerServiceInformation: { data } } = this.props;

    if (data.photosPortofolio) {
      this.setState({
        photosPortofolio: data.photosPortofolio,
        defaultDisplayPictureUrl: data.userMetadata.defaultDisplayPictureUrl
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { photographerServiceInformation: { data: { photosPortofolio: photosPortofolioNext } } } = nextProps;
    const { photographerServiceInformation: { data: { photosPortofolio: photosPortofolioPrev } } } = this.props;

    if (!isEqual(photosPortofolioNext, photosPortofolioPrev)) {
      this.setState({
        photosPortofolio: typeof photosPortofolioNext === 'undefined' ? [] : photosPortofolioNext
      });
    }
  }

  handleUpload = event => {
    const files = event.target.files;
    for (let i = 0, n = Math.min(files.length, 10); i < n; i++) {
      if (files[i]) {
        const file = files[i];
        if (file.type.indexOf('image/') === 0) {
          var reader = new FileReader();
          reader.onload = e => {
            let { selectedPhotos } = this.state;
            selectedPhotos = [
              ...selectedPhotos,
              { file, reader: e.target.result },
            ];
            this.setState({ selectedPhotos });
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  handleRemove = (event, index) => {
    let { selectedPhotos } = this.state;
    selectedPhotos = [
      ...selectedPhotos.slice(0, index),
      ...selectedPhotos.slice(index + 1),
    ];
    this.setState({ selectedPhotos });
  };

  handleSetAsDefault = (event, pictureUrl, index) => {
    event.preventDefault();
    const {
      photographerServiceInformation: {
        data: {
          userMetadata: { uid }
        }
      }
    } = this.props;
    let { photosPortofolio } = this.state;

    updateUserMetadataDefaultDisplayPicture(uid, pictureUrl);
    const newPhotosPortofolio = photosPortofolio.map((item, indexEuy) => {
      if (index === indexEuy) {
        return { ...item, defaultPicture: true };
      } else {
        return { ...item, defaultPicture: false };
      }
    });
    this.setState({ photosPortofolio: newPhotosPortofolio });
  };

  handleRemoveFromFirebase = (event, index) => {
    const { photosPortofolio, photosPortofolioDeleted } = this.state;
    const newPhotosPortofolio = photosPortofolio.filter((item, itemIndex) => index !== itemIndex);
    const deletedFile = photosPortofolio.filter((item, itemIndex) => index === itemIndex);
    photosPortofolioDeleted.push(deletedFile[0]);

    this.setState({
      photosPortofolio: newPhotosPortofolio,
      photosPortofolioDeleted
    });
  };

  handleUpdate = event => {
    event.preventDefault();
    const {
        photographerServiceInformation: {
          data: {
            userMetadata: { uid }
          }
        }
    } = this.props;

    const params = { state: this.state, uid };
    this.props.uploadPhotosPortfolio(params);
  };

  render() {
    const { selectedPhotos, photosPortofolio } = this.state;
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-7 margin-top-15 margin-bottom-30">
            <div>
              <div id="photo-preview">
                {
                  photosPortofolio.map((photo, key) => (
                    <div key={key}>
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        }}
                      />
                      <img src={photo.url} alt="This is the alt text" />
                      {!profile.loading && (
                        <i
                          title="Remove Photo"
                          onClick={event => this.handleRemoveFromFirebase(event, key)}
                        />
                      )}

                      {
                        photo.defaultPicture
                          ? <span className="set-default-photo-profile-manager">Default photo</span>
                          : (
                            <a
                              className="set-default-photo-profile-manager"
                              title="Set this photo as default photo display"
                              data-
                              onClick={event => this.handleSetAsDefault(event, photo.url, key)}
                            >
                              Set as default
                            </a>
                          )
                      }
                    </div>
                  ))
                }

                {
                  selectedPhotos.map((photo, key) => (
                    <div key={key}>
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        }}
                      />

                      {
                        profile.hasOwnProperty('percentages') && profile.percentages.length > 0 && (
                          <ProgressBar
                            striped
                            bsStyle="success"
                            now={profile.percentages[key]}
                            style={{
                              position: 'absolute',
                              top: 70,
                              width: '100%',
                            }}
                          />
                        )
                      }

                      <img src={photo.reader} alt="This is the alt text" />

                      {
                        !profile.loading && (
                          <i title="Remove Photo" onClick={event => this.handleRemove(event, key)}/>
                        )
                      }
                    </div>
                  ))
                }
              </div>
              <div style={{marginTop:'40px'}}>
                <input
                    accept="image/*"
                    ref={ref => (this._uploadFile = ref)}
                    className="hidden"
                    multiple
                    type="file"
                    onChange={this.handleUpload}
                />
                <button
                    className="button"
                    onClick={() => this._uploadFile.click()}
                >
                  Browse images
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-5 margin-top-15 margin-bottom-30">
            <div className="card tips">
              <h3>Why it's important to upload your nice photos</h3>
              <p>
                Customers will frequent your page and view your photos so this is your best chance to give them
                a powerfull impression!
              </p>

              <h3>Tips for choosing photos</h3>
              <p>
                You should select photos that best showcase your skills and represent your photography style.
                You can update / change your photos anytime you want.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <hr/>
          <Button onClick={this.handleUpdate} style={{float:'right'}} className="button">Update</Button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
      uploadPhotosPortfolio: paramsObject => dispatch(uploadPhotosPortfolio(paramsObject))
  })
)(PhotosPortofolio);
