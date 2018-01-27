import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios/index";
import { ProgressBar } from 'react-bootstrap';
import uuidv4 from 'uuid/v4';
// import pica from 'pica';
import { updatePhotographerServiceInfoPhotosPortofolio } from "../../store/actions/userActions";

import Page from '../Page';

class Step2IntiatePortofolio extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      uploadedImagesList: [],
      isUploading: false
    };
  }

  selectImagesHandler = (evt) => {
    // const picaInstance = pica();
    const files = evt.target.files;
    const fileOutOfSize = [];

    Object.keys(files).forEach((itemKey) => {
      // Experimental images upload strategy - keep it commented-out.
      // we will explore, enhance, and enable this feature soon as our product value
      /*const fileItemObject = files[itemKey];
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
      };
      fileReader.readAsDataURL(fileItemObject);*/

      // Current used images upload strategy
      const fileItemObject = files[itemKey];
      if (fileItemObject.size <= 10000000) {
        const fileReader = new FileReader();

        fileReader.onloadend = (evtObj) => {
          const imageItem = {imagePreview: evtObj.target.result, fileObject: fileItemObject};
          this.setState({images: [...this.state.images, imageItem]});
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
    if (this.state.images.length > 0) {
      let uploads = [];
      const images = this.state.images;

      let urlUploadRequest = process.env.REACT_APP_CLOUDINARY_API_BASE_URL;
      urlUploadRequest += '/image/upload';

      this.setState({ isUploading: true });

      images.forEach((item, index) => {
        const formData = new FormData();
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PHOTOS_PORTFOLIO_PRESET);
        formData.append('tags', `portfolio-${this.props.user.uid}`);
        formData.append('file', item.fileObject);

        const uploadConfig = {
          onUploadProgress: (progressEvent) => {
            images[index].percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            this.setState({ images });
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

      Promise.all(uploads)
        .then(() => {
          updatePhotographerServiceInfoPhotosPortofolio(this.props.user.uid, this.state.uploadedImagesList);
        })
        .then(() => {
          this.setState({ isUploading: false });
          this.props.history.push('/become-our-photographer/step-2-5');
        })

    } else {
      alert('Please select one or more files to upload');
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
          <h3 style={{fontWeight:'bold',marginBottom:'24px'}}>Let start building your portfolio! (Maximum 10 photos)</h3>

          <div className="row">
            <div className="col-sm-7 margin-top-15 margin-bottom-70">
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

                        <img src={photo.imagePreview} alt="This is the alt text"/>

                        {
                          !photo.hasOwnProperty('percentCompleted')
                            ? <i title="Remove Photo" onClick={() => this.removeImageItemHandler(key)}/>
                            : null
                        }
                      </div>
                    ))
                  }
                </div>

                <div>
                  <input
                      accept="image/*"
                      ref={ref => (this._uploadFile = ref)}
                      className="hidden"
                      multiple
                      type="file"
                      onChange={this.selectImagesHandler}
                  />

                  <button
                    type="button"
                    className="button key-color radius-5 width1 pull-left"
                    disabled={this.state.isUploading}
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

          <button
            type="button"
            className="button key-color radius-5 width1 margin-top-40 margin-bottom-15"
            onClick={(evt) => !this.state.isUploading ? this.submitImagesHandler(evt) : false }
          >
            { this.state.isUploading ? 'Uploading your images. Please wait...' : 'Done' }
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

export default connect(mapStateToProps)(
  Step2IntiatePortofolio
);
