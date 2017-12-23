import React, { Component } from 'react';
import Page from './Page';

class TestCloudinary extends Component {
  constructor() {
    super();
    this.state = {
      images: []
    }
  }

  selectImagesHandler = (evt) => {
    //
  };

  render() {
    return (
      <Page>
        <div className="container">
          <h2>Test Cloudinary</h2>

          <div id="dropbox">
            <div className="preview">
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
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default TestCloudinary;
