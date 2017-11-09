import React, { Component } from 'react';
import { connect } from 'react-redux';

import { uploadPhotoProfile, imageSelectedAction } from '../../store/actions/userInitProfileActions';

import Page from '../Page';

class PhotographerRegistrationStep2 extends Component {
  constructor() {
    super();
    this.fileSelectChangeHandler = this.fileSelectChangeHandler.bind(this);
    this.uploadPhotoProfileHandler = this.uploadPhotoProfileHandler.bind(this);
  }

  fileSelectChangeHandler(evt) {
    evt.preventDefault();
    this.props.imageSelectedAction(evt.target.files[0]);
  }

  uploadPhotoProfileHandler(evt) {
    evt.preventDefault();
    const { userInitProfile: { file } } = this.props;
    if (file) {
      const {
        user: {
          email,
          userMetadata: { displayName }
        }
      } = this.props;

      this.props.uploadPhotoProfile(file, email, displayName);
    } else {
      alert('Please choose an image for your photo profile');
    }
  }

  render() {
    const { userInitProfile: { imagePreviewUrl, file } } = this.props;
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
                    {imagePreviewUrl && (
                      <img
                        src={imagePreviewUrl}
                        className="center-block img-circle img-profile"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group browse-profile-holder">
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
                  { file ? file.name : 'Choose file'}
                </div>
              </div>

              <button
                className="button next-btn"
                onClick={this.uploadPhotoProfileHandler}
              >
                {this.props.userInitProfile.isUploadingPhotoProfile ? (
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

export default connect(
  state => ({
    user: state.userAuth,
    userInitProfile: state.userInitProfile,
  }),
  dispatch => ({
    uploadPhotoProfile: (fileObject, email, displayName) => dispatch(uploadPhotoProfile(fileObject, email, displayName)),
    imageSelectedAction: fileObject => dispatch(imageSelectedAction(fileObject))
  })
)(PhotographerRegistrationStep2);
