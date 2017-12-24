import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios/index";
import { ProgressBar } from 'react-bootstrap';
import uuidv4 from 'uuid/v4';
import firebase from "firebase";
import pica from 'pica';
import { database } from "../../services/firebase";
import { submitUploadPhotosPortfolio } from '../../store/actions/photographerServiceInfoActionsStep2';

import Page from '../Page';

const updatePhotographerServiceInfoPhotosPortofolio = (uid, data) => {
  if (data) {
    const db = database.database();

    // Update defaultDisplayPictureUrl in user metadata
    db
      .ref('user_metadata')
      .child(uid)
      .update({
        defaultDisplayPictureUrl: data[0].url,
        updated: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {

        // Update photos portofolio in photographer service information
        const photos = data.map((item, index) => index === 0
          ? { ...item, defaultPicture: true }
          : { ...item, defaultPicture: false });
        console.log('photos: ', photos);

        db
          .ref('photographer_service_information')
          .child(uid)
          .update({
            photosPortofolio: photos,
            updated: firebase.database.ServerValue.TIMESTAMP
          });
      });
  }
};

class Step2IntiatePortofolio extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      uploadedImagesPathList: []
    };
  }

  selectImagesHandler = (evt) => {
    const picaInstance = pica();
    const files = evt.target.files;

    Object.keys(files).forEach((itemKey) => {
      const fileItemObject = files[itemKey];
      const fileReader = new FileReader();

      fileReader.onloadend = (evtObj) => {
        const img = new Image();
        img.src = evtObj.target.result;
        img.onload = () => {
          const sourceCanvas = document.createElement('canvas');
          const dstCtx = sourceCanvas.getContext('2d');
          dstCtx.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
          sourceCanvas.width = img.width;
          sourceCanvas.height = img.height;
          dstCtx.drawImage(img, 0, 0, img.width, img.height);

          img.width = (img.width * 80) / 100;
          img.height = (img.height * 80) / 100;

          const destinationCanvas = document.createElement('canvas');
          const srcCtx = destinationCanvas.getContext('2d');
          srcCtx.clearRect(0, 0, destinationCanvas.width, destinationCanvas.height);
          destinationCanvas.width = img.width;
          destinationCanvas.height = img.height;
          srcCtx.drawImage(img, 0, 0, img.width, img.height);

          picaInstance.resize(sourceCanvas, destinationCanvas)
            .then((result) => {
              return picaInstance.toBlob(result, 'image/jpeg', 0.90);
            })
            .then((blob) => {
              const fr = new FileReader();
              fr.onload = (ev) => {
                const fileObject = new File([blob], fileItemObject.name, { type: fileItemObject.type });
                const imageItem = { imagePreview: ev.target.result, fileObject: fileObject };
                this.setState({ images: [ ...this.state.images, imageItem ] });
              };
              fr.readAsDataURL(blob);
            });

        };
        // const imageItem = { imagePreview: evtObj.target.result, fileObject: fileItemObject };
        // this.setState({ images: [ ...this.state.images, imageItem ] });
      };

      fileReader.readAsDataURL(fileItemObject);
    });
  };

  submitImagesHandler = (evt) => {
    evt.preventDefault();
    if (this.state.images) {
      let uploads = [];
      const images = this.state.images;

      images.forEach((item, index) => {
        const formData = new FormData();
        formData.append('upload_preset', 'test-takapic-photos-portfolio-upload');
        formData.append('file', item.fileObject);

        const uploadConfig = {
          onUploadProgress: (progressEvent) => {
            images[index].percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            this.setState({ images });
          }
        };

        uploads.push(
          axios
            .post('https://api.cloudinary.com/v1_1/dvdm9a68v/image/upload', formData, uploadConfig)
            .then((response) => {
              const newItem = {
                id: uuidv4(),
                publicId: response.data.public_id,
                imageFormat: response.data.format,
                url: response.data.secure_url,
                theme: '-',
                defaultPicture: false
              };

              this.setState({ uploadedImagesPathList: [ ...this.state.uploadedImagesPathList, newItem ] });
            })
            .catch((error) => {
              console.log(error);
            })
        );
      });

      Promise.all(uploads)
        .then(() => {
          console.log('this.state.uploadedImagesPathList = ', this.state.uploadedImagesPathList);
          updatePhotographerServiceInfoPhotosPortofolio(this.props.user.uid, this.state.uploadedImagesPathList);
        });
    }
  };

  removeImageItemHandler = (index) => {
    const newData = this.state.images.filter((itemValue, itemIndex) => itemIndex !== index);
    this.setState({images: newData});
  };

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div />
            <div />
            <div />
            <div className="active" />
          </div>

          <hr />
          <h3>Let start building your portfolio! (Maximum 10 photos)</h3>

          <div className="row">
            <div className="col-sm-7 margin-top-15 margin-bottom-30">
              <div>

                <div id="photo-preview">
                  {
                    this.state.images && this.state.images.map((photo, key) => (
                      <div key={key} style={{ position: 'relative' }}>
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

                        <img src={photo.imagePreview} alt="This is the alt text" />

                        {
                          !photo.hasOwnProperty('percentCompleted')
                            ? <i title="Remove Photo" onClick={() => this.removeImageItemHandler(key)}/>
                            : null
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
                      onChange={this.selectImagesHandler}
                  />
                  <button
                      className="button"
                      onClick={() => this._uploadFile.click()}
                  >
                    Browse to add images
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

          <hr />

          {/*<Link
            to="/become-our-photographer/step-2-3"
            className="button button-white-no-shadow u"
          >
            Back
          </Link>*/}

          <button
            type="button"
            className="button pull-right"
            onClick={this.submitImagesHandler}
          >
            Done
          </button>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userAuth,
  photographerServiceInfoStep2: state.photographerServiceInfoStep2,
});

const mapDispatchToProps = dispatch => ({
  submitUploadPhotosPortfolio: payload =>
    dispatch(submitUploadPhotosPortfolio(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  Step2IntiatePortofolio
);
