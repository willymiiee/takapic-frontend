import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar, Button } from 'react-bootstrap';
import isEqual from 'lodash/isEqual';
import uuidv4 from "uuid/v4";
import axios from "axios";
import cloudinary from 'cloudinary-core';
import {
  updatePhotographerServiceInfoPhotosPortofolio,
  updateUserMetadataDefaultDisplayPicture,
  deletePortfolioPhotos
} from "../../store/actions/userActions";
import {
  fetchPhotographerServiceInformation,
  tellThemThatWasSuccessOrFailed
} from "../../store/actions/photographerServiceInfoActions";

class PhotosPortofolio extends Component {
  constructor() {
    super();
    this.state = {
      imagesExisting: [],
      imagesExistingDeleted: [],
      imagesNewAdded: [],
      uploadedImagesList: [],
      defaultDisplayPictureUrl: null,
      isUploading: false
    };

    this.cloudinaryInstance = cloudinary.Cloudinary.new({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      secure: true
    });
  }

  componentDidMount() {
    const {
      photographerServiceInformation: {
        data: {
          photosPortofolio,
          userMetadata: { defaultDisplayPictureUrl }
        }
      }
    } = this.props;

    if (photosPortofolio.length > 0) {
      this.setState({
        imagesExisting: photosPortofolio,
        defaultDisplayPictureUrl
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.uploadedImagesList.length > 0) {
      window.scrollTo(0, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { photographerServiceInformation: { data: { photosPortofolio: photosPortofolioNext } } } = nextProps;
    const { photographerServiceInformation: { data: { photosPortofolio: photosPortofolioPrev } } } = this.props;

    if (!isEqual(photosPortofolioNext, photosPortofolioPrev)) {
      this.setState({
        imagesExisting: typeof photosPortofolioNext === 'undefined' ? [] : photosPortofolioNext
      });
    }
  }

  componentWillUnmount() {
    this.cloudinaryInstance = null;
  }

  selectImagesHandler = (evt) => {
    const files = evt.target.files;
    const fileOutOfSize = [];

    Object.keys(files).forEach((itemKey) => {
      const fileItemObject = files[itemKey];
      if (fileItemObject.size <= 10000000) {
        const fileReader = new FileReader();

        fileReader.onloadend = (evtObj) => {
          const imageItem = {imagePreview: evtObj.target.result, fileObject: fileItemObject};
          this.setState({imagesNewAdded: [...this.state.imagesNewAdded, imageItem]});
        };
        fileReader.readAsDataURL(fileItemObject);

      } else {
        fileOutOfSize.push(fileItemObject.name);
      }
    });

    if (fileOutOfSize.length > 0) {
      const filesStr = fileOutOfSize.join("\n");
      alert("Some photos will not be uploaded. Because there are one or more photos have more than 10MB size\n---------------------------------\n" + filesStr);
    }
  };

  submitImagesHandler = (evt) => {
    evt.preventDefault();
    let urlUploadRequest = process.env.REACT_APP_CLOUDINARY_API_BASE_URL;
    urlUploadRequest += '/image/upload';

    if (this.state.imagesNewAdded.length > 0) {
      let uploads = [];
      const images = this.state.imagesNewAdded;

      this.setState({ isUploading: true });

      images.forEach((item, index) => {
        const formData = new FormData();
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PHOTOS_PORTFOLIO_PRESET);
        formData.append('file', item.fileObject);

        const uploadConfig = {
          onUploadProgress: (progressEvent) => {
            images[index].percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            this.setState({ imagesNewAdded: images });
          }
        };

        uploads.push(
          axios
            .post(urlUploadRequest, formData, uploadConfig)
            .then((response) => {
              const newItem = {
                id: uuidv4(),
                publicId: response.data.public_id,
                imageFormat: response.data.format,
                url: response.data.secure_url,
                width: response.data.width,
                height: response.data.height,
                sizebytes: response.data.bytes,
                theme: '-',
                defaultPicture: false
              };

              this.setState({ uploadedImagesList: [ ...this.state.uploadedImagesList, newItem ] });
            })
            .catch((error) => {
              console.error('Catch error: ', error);
            })
        );
      });

      if (images.length > 0) {
        if (uploads.length > 0) {
          Promise.all(uploads)
            .then(() => {
              const newImages = [
                ...this.state.imagesExisting,
                ...this.state.uploadedImagesList
              ];
              updatePhotographerServiceInfoPhotosPortofolio(this.props.user.uid, newImages, false);
            })
            .then(() => {
              this.props.fetchPhotographerServiceInformation(this.props.user.uid);
              this.props.tellThemThatWasSuccessOrFailed('success');
              this.setState({ imagesNewAdded: [], isUploading: false });
            });
        }
      }

    } else if (this.state.imagesExistingDeleted.length > 0) {
      this.props.deletePortfolioPhotos(
        this.props.user.uid,
        this.state.imagesExistingDeleted,
        this.state.imagesExisting
      );

    } else {
      alert('There are no images to be upload');
    }
  };

  handleSetAsDefault = (event, pictureUrl, picturePublicId, imageId) => {
    event.preventDefault();
    const {
      photographerServiceInformation: {
        data: { userMetadata: { uid } }
      }
    } = this.props;
    const { imagesExisting } = this.state;

    updateUserMetadataDefaultDisplayPicture(uid, pictureUrl, picturePublicId);
    const newImages = imagesExisting.map((item) =>
      item.id === imageId
        ? { ...item, defaultPicture: true }
        : { ...item, defaultPicture: false }
    );
    this.setState({ imagesExisting: newImages });
    updatePhotographerServiceInfoPhotosPortofolio(this.props.user.uid, newImages, false);
  };

  handleRemoveFromUploadBuffer = (event, indexPM1) => {
    event.preventDefault();
    const newImages = this.state.imagesNewAdded.filter((item, indexPM2) => indexPM1 !== indexPM2);
    this.setState({ imagesNewAdded: newImages });
  };

  handleRemoveFromStorage = (event, imageId) => {
    event.preventDefault();
    const { imagesExisting, imagesExistingDeleted } = this.state;
    const newImages = imagesExisting.filter((item) => imageId !== item.id);
    const deletedFile = imagesExisting.filter((item) => imageId === item.id)[0];
    imagesExistingDeleted.push(deletedFile);

    this.setState({
      imagesExisting: newImages,
      imagesExistingDeleted
    });
  };

  render() {
    const { imagesNewAdded, imagesExisting } = this.state;

    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-7 m-padding-x-0 margin-top-15 margin-bottom-30">
            <div>
              <div id="photo-preview">
                {
                  imagesExisting.length > 0 && imagesExisting.map((photo, key) => (
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

                      <img
                        src={this.cloudinaryInstance.url(photo.publicId, { width: 320, crop: 'scale' })}
                        alt="This is the alt text"
                      />

                      <i
                        title="Remove Photo"
                        onClick={event => this.handleRemoveFromStorage(event, photo.id)}
                      />

                      {
                        photo.defaultPicture
                          ? <span className="set-default-photo-profile-manager">Default photo</span>
                          : (
                            <a
                              className="set-default-photo-profile-manager"
                              title="Set this photo as default photo display"
                              data-
                              onClick={event => this.handleSetAsDefault(event, photo.url, photo.publicId, photo.id)}
                            >
                              Set as default
                            </a>
                          )
                      }
                    </div>
                  ))
                }

                {
                  imagesNewAdded.length > 0 && imagesNewAdded.map((photo, key) => (
                    <div key={key}>
                      {
                        photo.hasOwnProperty('percentCompleted') && photo.percentCompleted === 100
                          ? (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: "url('/images/done.png') no-repeat center center rgba(255,255,255,0.5)"
                              }}
                            />
                          )
                          : null
                      }

                      {
                        photo.hasOwnProperty('percentCompleted') && photo.percentCompleted < 100
                          ? (
                            <ProgressBar
                              striped
                              bsStyle="success"
                              now={photo.percentCompleted}
                              style={{
                                position: 'absolute',
                                top: 70,
                                width: '100%',
                              }}
                            />
                          )
                          : null
                      }

                      <img src={photo.imagePreview} alt="This is the alt text"/>

                      {
                        !photo.hasOwnProperty('percentCompleted')
                          ? (
                            <i
                              title="Remove Photo"
                              onClick={event => this.handleRemoveFromUploadBuffer(event, key)}
                            />
                          )
                          : null
                      }
                    </div>
                  ))
                }
              </div>

              <div style={{marginTop:'40px'}}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={ref => (this._uploadFile = ref)}
                  className="hidden"
                  onChange={this.selectImagesHandler}
                />

                <button
                  className="button"
                  onClick={() => this._uploadFile.click()}
                >
                  Browse to add images
                </button>

                <p style={{ color: 'red', fontSize: '12px' }}>
                  Please upload less than 10MB photos.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-5 m-padding-x-0 margin-top-15 margin-bottom-30">
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
          <Button onClick={this.submitImagesHandler} style={{float:'right'}} className="button">
            { this.state.isUploading || this.props.isDeletingPhotos ? 'Processing... Please wait.' : 'Update' }
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ isDeletingPhotos: state.deletePhotosPortfolio.isDeleting }),
  dispatch => ({
    deletePortfolioPhotos: (uid, photosDeleted, imagesExisting) =>
      dispatch(deletePortfolioPhotos(uid, photosDeleted, imagesExisting)),
    fetchPhotographerServiceInformation: (uid) => dispatch(fetchPhotographerServiceInformation(uid)),
    tellThemThatWasSuccessOrFailed: (status) => dispatch(tellThemThatWasSuccessOrFailed(status))
  })
)(PhotosPortofolio);
