import React, { Component } from 'react';
import Gallery from '../../react-grid-gallery/Gallery';
import { ProgressBar } from 'react-bootstrap';
import cloudinary from 'cloudinary-core';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { database } from "../../services/firebase"
import {emailNotificationEndpoint} from "../../helpers/helpers";

import Page from '../Page';
import UserAccountPanel from './UserAccountPanel';

class PhotoAlbumDetailPhotographer extends Component {
  constructor() {
    super();
    this.state = {
      imagesUpload: [],
      uploadedImagesList: [],
      images: [],
      imagesSelectedCount: 0,
      reservationId: '',
      isUploading: false,
      isDownloading: false,
      isDeleting:false,
      isSubmitting: false
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

  browseImagesHandlerProvide = (files) => {
    return new Promise((resolve) => {
      const fileOutOfSize = [];
      let pending = 0;

      Object.keys(files).forEach((key) => {
        const file = files[key];
        if (file.size <= 10000000) {
          const fr = new FileReader();
          fr.onloadend = (event) => {
            const imageItem = {
              imagePreview: event.target.result,
              fileObject: file,
              percentCompleted: 0
            };

            this.setState({ imagesUpload: [ ...this.state.imagesUpload, imageItem ] });
            --pending;

            if (pending === 0) {
              resolve(true);
            }
          };
          fr.readAsDataURL(file);
          ++pending;

        } else {
          fileOutOfSize.push(file.name);
        }
      });

      if (fileOutOfSize.length > 0) {
        const filesStr = fileOutOfSize.join("\n");
        const messageErr = "Some photos will not be uploaded. Because there are one or more photos have more than 10MB size\n---------------------------------\n" + filesStr;
        alert(messageErr);
      }
    });
  };

  browseImagesHandlerConsume = (evt) => {
    this.setState({ isUploading: true });
    this.browseImagesHandlerProvide(evt.target.files)
      .then(() => {
        this.uploadImages();
      })
      .catch((error) => {
        this.setState({ isUploading: false });
        alert(error.message);
      });
  };

  selectedImagesHandler = (indexSelected, image) => {
    const newState = this.state.images.map((item, indexImage) =>
      indexSelected === indexImage
        ? { ...item, isSelected: !item.isSelected }
        : item);

    const selectedOnly = newState.filter((item) => item.isSelected === true);
    this.setState({ images: newState, imagesSelectedCount: selectedOnly.length });
  };

  checkUncheckAll = (status) => {
    const newState = this.state.images.map((item) => ({ ...item, isSelected: status }));
    let imc = status ? newState.length : 0;
    this.setState({ images: newState, imagesSelectedCount: imc });
  };

  submitImagesHandler = (evt) => {
    evt.preventDefault();
    const db = database.database();
    this.setState({ isSubmitting: true });

    db
      .ref('reservations')
      .child(this.state.reservationId)
      .once('value')
      .then(snaps => {
        const reservation = snaps.val();
        const { destination, travellerId, uidMapping } = reservation;

        db
          .ref('reservations')
          .child(this.state.reservationId)
          .update({ albumDelivered: 'Y' })
          .then(() => {

            // Start - Send notification email
            const travellerName = uidMapping[travellerId].displayName;
            const travellerEmail = uidMapping[travellerId].email;

            const tableStr = `Dear ${travellerName}, the pictures from your photoshoot in 
            ${destination} are now uploaded to your exclusive online photo gallery. 
            Please login to your dashboard to view!`;

            const messageData = {
              receiverName: travellerName,
              receiverEmail: travellerEmail,
              emailSubject: "Your photographer delivering photos through photo album ",
              emailContent: tableStr
            };

            axios.post(emailNotificationEndpoint(), messageData)
              .then(() => {
                this.setState({ isSubmitting: false }, () => {
                  this.props.history.push('/me/albums');
                });
              });
            // End - Send notification email
          })
          .catch((error) => {
            this.setState({ isSubmitting: true });
            console.log(error);
          });
      });
  };

  uploadImages() {
    let urlUploadRequest = process.env.REACT_APP_CLOUDINARY_API_BASE_URL;
    urlUploadRequest += '/image/upload';

    if (this.state.imagesUpload.length > 0) {
      let uploads = [];
      const images = this.state.imagesUpload;

      this.setState({ isUploading: true });

      images.forEach((item, index) => {
        const formData = new FormData();
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_ALBUMS_PRESET);
        formData.append('tags', `album-${this.state.reservationId}`);
        formData.append('file', item.fileObject);

        const uploadConfig = {
          onUploadProgress: (progressEvent) => {
            images[index].percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            this.setState({ imagesUpload: images });
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
                isSelected: false
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
                ...this.state.images,
                ...this.state.uploadedImagesList
              ];

              this.saveUploadedImages(newImages);
              return true;
            })
            .then(() => {
              this.setState({
                images: [ ...this.state.images, ...this.state.uploadedImagesList ],
                imagesUpload: [],
                uploadedImagesList: [],
                isUploading: false
              });
            })
            .catch((error) => {
              this.setState({ isUploading: false });
              console.log(error);
            });
        }
      }

    } else {
      alert('There are no images to be upload');
    }
  }

  saveUploadedImages(newImages) {
    const db = database.database();

    db
      .ref('reservations')
      .child(this.state.reservationId)
      .child('defaultAlbumPhotoPublicId')
      .once('value')
      .then((snapshot) => {
        db
          .ref('albums')
          .child(this.state.reservationId)
          .set(newImages)
          .then(() => {
            db
              .ref('reservations')
              .child(this.state.reservationId)
              .update({ defaultAlbumPhotoPublicId: newImages[0].publicId })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }

  deleteSelectedImages = () => {
    if (window.confirm('Are you sure want to delete the selected images?')) {
      const publicIdList = this.state.images
        .filter((item) => item.isSelected === true)
        .map((item) => item.publicId);

      this.setState({ isDeleting: true });

      axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_API_HOSTNAME}/api/cloudinary-images/delete`,
        params: { public_ids: publicIdList }
      })
        .then(() => {
          let newImages = this.state.images.filter((item) => item.isSelected === false);
          newImages = newImages.length > 0 ? newImages : null;

          const db = database.database();

          db
            .ref('albums')
            .child(this.state.reservationId)
            .set(newImages)
            .then(() => {
              this.setState({
                images: newImages || [],
                imagesSelectedCount: 0,
                isDeleting: false
              });

              return true;
            })
            .then(() => {
              if (!newImages) {
                db
                  .ref('reservations')
                  .child(this.state.reservationId)
                  .child('defaultAlbumPhotoPublicId')
                  .remove()
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

    }
  };

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
            <div className="upload-controls">
              <input
                type="file"
                accept="image/*"
                multiple
                ref={ref => (this._uploadFile = ref)}
                onChange={this.browseImagesHandlerConsume}
                className="hidden"
              />
              <button className="btn" onClick={() => this.checkUncheckAll(true)}>
                Select all
              </button>
              &nbsp;
              <button className="btn btn-upload" onClick={() => !this.state.isUploading ? this._uploadFile.click() : null}>
                { this.state.isUploading ? 'Uploading, Please wait...' : 'Upload' }
              </button>
              &nbsp;
              <button className="btn btn-submit" onClick={(evt) => !this.state.isSubmitting ? this.submitImagesHandler(evt) : null}>
                { this.state.isSubmitting ? 'Submitting, Please wait...' : 'Submit' }
              </button>
            </div>
          </div>

          <hr/>
          <p className="photo-album-length"><span>{ this.state.images.length }</span></p>

          <div className="photo-album-gallery photographer">
            <Gallery
              images={images}
              onSelectImage={this.selectedImagesHandler}
            />
          </div>

          {
            !this.state.isDownloading && this.state.imagesUpload
              ? this.state.imagesUpload.map((item, index) => (
                <div key={index} className="my-my-tile">
                  <div className="my-my-tile-viewport">
                    {
                      item.hasOwnProperty('percentCompleted') && item.percentCompleted < 100
                        ? (
                          <ProgressBar
                            striped
                            bsStyle="success"
                            now={item.percentCompleted}
                            style={{
                              position: 'absolute',
                              top: 70,
                              width: '100%',
                            }}
                          />
                        )
                        : null
                    }
                    <img className="my-my-img-item" src={item.imagePreview} alt=""/>
                  </div>
                </div>
              ))
              : (
                <p>Retrieving images, Please wait...</p>
              )
          }

          <div style={{ clear: 'both' }}/>

          {
            this.state.imagesSelectedCount > 0 ? (
              <div className="photo-album-gallery-select-control row">
                <div className="col-xs-12 col-sm-4">
                  <i className="fa fa-circle c-key-color" style={{marginRight:'10px'}} aria-hidden="true"/>
                  { this.state.imagesSelectedCount } selected file
                </div>

                <div className="col-xs-12 col-sm-4">
                  <button type="button" className="btn btn-delete" onClick={() => !this.state.isDeleting ? this.deleteSelectedImages() : null}>
                    { this.state.isDeleting ? 'Deleting images, Please wait...' : 'Delete selected files' }
                  </button>
                </div>

                <div className="col-xs-12 col-sm-4">
                  <p style={{ cursor: 'pointer' }} onClick={() => this.checkUncheckAll(false)}>
                    Unselect all
                  </p>
                </div>
              </div>
            ) : null
          }

        </UserAccountPanel>
      </Page>
    )
  }
}

export default withRouter(PhotoAlbumDetailPhotographer);
