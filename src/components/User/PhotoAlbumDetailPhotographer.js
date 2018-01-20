import React, { Component } from 'react';
import Gallery from '../../react-grid-gallery/Gallery';
import { ProgressBar } from 'react-bootstrap';
import cloudinary from 'cloudinary-core';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { database } from "../../services/firebase";

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
      isDeleting:false
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

  browseImagesHandler = (evt) => {
    const files = evt.target.files;
    const fileOutOfSize = [];

    Object.keys(files).forEach((itemKey) => {
      const fileItemObject = files[itemKey];
      if (fileItemObject.size <= 10000000) {
        const fileReader = new FileReader();

        fileReader.onloadend = (evtObj) => {
          const imageItem = {imagePreview: evtObj.target.result, fileObject: fileItemObject};
          this.setState({ imagesUpload: [ ...this.state.imagesUpload, imageItem ] });
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
            });
        }
      }

    } else {
      alert('There are no images to be upload');
    }
  };

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
          <div>
            <h3 className="margin-top-0">Photo Album</h3>
            <div className="upload-controls">
              <input
                type="file"
                accept="image/*"
                multiple
                ref={ref => (this._uploadFile = ref)}
                onChange={this.browseImagesHandler}
                className="hidden"
              />

              <button className="btn" onClick={() => this.checkUncheckAll(true)}>
                Select all
              </button>
              &nbsp;
              <button className="btn" onClick={() => this._uploadFile.click()}>
                Upload
              </button>
              &nbsp;
              <button className="btn" onClick={this.submitImagesHandler}>
                { this.state.isUploading ? 'Uploading, Please wait...' : 'Submit' }
              </button>
            </div>
          </div>

          <hr/>
          <div>
            <p>{ this.state.images.length }</p>
          </div>

          <Gallery
            images={images}
            onSelectImage={this.selectedImagesHandler}
          />

          <div style={{ clear: 'both' }}/>

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
              <div>
                <div>
                  { this.state.imagesSelectedCount } selected file
                </div>

                <div>
                  <button type="button" className="btn" onClick={this.deleteSelectedImages}>
                    { this.state.isDeleting ? 'Deleting images, Please wait...' : 'Delete selected files' }
                  </button>
                </div>

                <div>
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

export default PhotoAlbumDetailPhotographer;
