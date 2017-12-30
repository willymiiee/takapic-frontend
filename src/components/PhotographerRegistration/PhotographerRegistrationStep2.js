import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import sha1 from "js-sha1";
import axios from 'axios';
import firebase from "firebase";
import { database } from "../../services/firebase";

import Page from '../Page';

class PhotographerRegistrationStep2 extends Component {
  constructor() {
    super();
    this.state = {
      imagePreview: null,
      fileObject: null,
      isUploading: false
    };
  }

  fileSelectChangeHandler = (evt) => {
    evt.preventDefault();
    const fileObject = evt.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = (evtReader) => {
      this.setState({ imagePreview: evtReader.target.result, fileObject })
    };
    fileReader.readAsDataURL(fileObject);
  };

  uploadPhotoProfileHandler = (evt) => {
    evt.preventDefault();
    if (this.state.fileObject) {
      let urlUploadRequest = process.env.REACT_APP_CLOUDINARY_API_BASE_URL;
      urlUploadRequest += '/image/upload';

      const nowDateTime = Date.now();
      let signature = `public_id=${this.props.user.uid}`;
      signature += `&timestamp=${nowDateTime}`;
      signature += `&upload_preset=${process.env.REACT_APP_CLOUDINARY_PHOTO_PROFILE_PRESET}`;
      signature += process.env.REACT_APP_CLOUDINARY_API_SECRET;

      const formData = new FormData();
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PHOTO_PROFILE_PRESET);
      formData.append('public_id', this.props.user.uid);
      formData.append('timestamp', nowDateTime);
      formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
      formData.append('signature', sha1(signature));
      formData.append('file', this.state.fileObject);

      this.setState({ isUploading: true });

      axios
        .post(urlUploadRequest, formData)
        .then((response) => {
          database.auth().currentUser.updateProfile({
            photoURL: response.data.secure_url
          });

          database
            .database()
            .ref('user_metadata')
            .child(this.props.user.uid)
            .update({
              photoProfileUrl: response.data.secure_url,
              photoProfilePublicId: response.data.public_id,
              updated: firebase.database.ServerValue.TIMESTAMP
            });
        })
        .then(() => {
          this.setState({ isUploading: false });
          this.props.history.push('/photographer-registration/s3');
        })
        .catch((error) => {
          console.error('Catch error: ', error);
        });
    }
  };

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-3">
            <div />
            <div className="active" />
            <div />
          </div>

          <div className="panel setup-content" id="step-2">
            <div className="panel-body">
              <h2 className="text-center">Add your best photo profile</h2>
              <div id="profile-dragarea">
                <div
                  id="filedrag-photo"
                  className="center-block img-responsive"
                >
                  <div className="ph">
                    {
                      this.state.imagePreview && (
                        <img
                          src={this.state.imagePreview}
                          className="center-block img-circle img-profile"
                          alt="This is alt text"
                        />
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="form-group browse-profile-holder width-full">
                <div className="browse-profile-btn">
                  <span>Browse</span>
                  <input
                    className="input-file choose-file"
                    id="btn-choose-profile"
                    type="file"
                    name=""
                    onChange={this.fileSelectChangeHandler}
                  />
                </div>
                <div className="input-profile-name">
                  { this.state.fileObject ? this.state.fileObject.name : 'Choose file'}
                </div>
              </div>

              <button
                className="button next-btn"
                onClick={this.uploadPhotoProfileHandler}
              >
                {this.state.isUploading ? (
                  'Uploading your photo profile, please wait...'
                ) : (
                  'Next'
                )}
              </button>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default withRouter(
  connect(state => ({ user: state.userAuth }))(PhotographerRegistrationStep2)
);
