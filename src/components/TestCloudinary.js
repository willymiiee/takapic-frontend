import React, { Component } from 'react';
import axios from 'axios';

import Page from './Page';

class TestCloudinary extends Component {
  constructor() {
    super();
    this.state = {
      images: []
    }
  }

  selectImagesHandler = (evt) => {
    const files = evt.target.files;
    Object.keys(files).forEach((itemKey) => {
      const fileItemObject = files[itemKey];
      const fileReader = new FileReader();
      fileReader.onloadend = (evtObj) => {
        const imageItem = { imagePreview: evtObj.target.result, fileObject: fileItemObject };
        this.setState({ images: [ ...this.state.images, imageItem ] });
      };
      fileReader.readAsDataURL(fileItemObject);
    });
  };

  submitImagesHandler = (evt) => {
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
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error)
            })
        );
      });

      Promise.all(uploads)
        .then(() => {
          console.log('Done!');
        });
    }
  };

  render() {
    return (
      <Page>
        <div className="container">
          <h2>Test Cloudinary</h2>

          <div id="dropbox">
            {
              this.state.images && this.state.images.map((item, index) => {
                const widthForProgress = item.hasOwnProperty('percentCompleted') ? item.percentCompleted + '%' : '0';
                return (
                  <div key={index} className="preview">
                    <span className="imageHolder">
                      <img src={item.imagePreview}/>
                      <span className="uploaded"/>
                    </span>
                    <div className="progressHolder">
                      <div className="progress" style={{ width: widthForProgress }}/>
                    </div>
                  </div>
                )
              })
            }
            {/*<div className="preview">
              <span className="imageHolder">
                <img src="https://res.cloudinary.com/dvdm9a68v/image/upload/c_scale,q_auto:best,w_600/v1513963432/tests/pexels-photo-139115.jpg"/>
                <span className="uploaded"/>
              </span>
              <div className="progressHolder">
                <div className="progress"/>
              </div>
            </div>

            <div className="preview">
              <span className="imageHolder">
                <img src="https://res.cloudinary.com/dvdm9a68v/image/upload/c_scale,q_auto:best,w_600/v1513963439/tests/guk2.jpg"/>
                <span className="uploaded"/>
              </span>
              <div className="progressHolder">
                <div className="progress"/>
              </div>
            </div>

            <div className="preview">
              <span className="imageHolder">
                <img src="https://res.cloudinary.com/dvdm9a68v/image/upload/c_scale,q_auto:best,w_600/v1513963434/tests/pexels-photo-134058.jpg"/>
                <span className="uploaded"/>
              </span>
              <div className="progressHolder">
                <div className="progress"/>
              </div>
            </div>

            <div className="preview">
              <span className="imageHolder">
                <img src="https://res.cloudinary.com/dvdm9a68v/image/upload/c_scale,q_auto:best,w_600/v1513963428/tests/pexels-photo-416164.jpg"/>
                <span className="uploaded"/>
              </span>
              <div className="progressHolder">
                <div className="progress"/>
              </div>
            </div>

            <div className="preview">
              <span className="imageHolder">
                <img src="https://res.cloudinary.com/dvdm9a68v/image/upload/c_scale,w_600/v1513963425/tests/pexels-photo-277667.jpg"/>
                <span className="uploaded"/>
              </span>
              <div className="progressHolder">
                <div className="progress"/>
              </div>
            </div>

            <div className="preview">
              <span className="imageHolder">
                <img src="https://res.cloudinary.com/dvdm9a68v/image/upload/c_scale,w_600/v1513853761/sample.jpg"/>
                <span className="uploaded"/>
              </span>
              <div className="progressHolder">
                <div className="progress"/>
              </div>
            </div>*/}
          </div>

          <div>
            <input
              accept="image/*"
              multiple
              type="file"
              onChange={this.selectImagesHandler}
            />
            <button type="button" onClick={this.submitImagesHandler}>Upload!</button>
          </div>
        </div>
      </Page>
    );
  }
}

export default TestCloudinary;
