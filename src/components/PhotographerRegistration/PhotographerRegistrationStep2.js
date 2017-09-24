import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { uploadPhotoProfile } from '../../store/actions/photographerRegActions';
import { database } from 'services/firebase';

import Page from 'components/Page';

class PhotographerRegistrationStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: '',
    };

    this.fileSelectChangeHandler = this.fileSelectChangeHandler.bind(this);
    this.uploadPhotoProfileHandler = this.uploadPhotoProfileHandler.bind(this);
  }

  fileSelectChangeHandler(evt) {
    evt.preventDefault();
    let fileReader = new FileReader();
    let file = evt.target.files[0];

    const storageRef = database.storage().ref();
    const firebaseAuth = database.auth();

    // Auth first
    /*firebaseAuth.signInWithEmailAndPassword('linspirell@gmail.com', '12qwaszx').catch(error => {
      console.log(error.code, error.message)
    });*/

    // firebaseAuth.onAuthStateChanged(user => {
    // if (user) {
    //   console.log('user.uid: ', user.uid);

    // Then upload
    const userPhotoProfilePath =
      'pictures/user-photo-profile/linspirell-gmail-com';
    const pictureRef = storageRef.child(userPhotoProfilePath + '/' + file.name);

    pictureRef
      .put(file, { contentType: file.type })
      .then(snapshot => {
        console.log('Uploaded', snapshot.totalBytes, 'bytes');

        firebaseAuth
          .signOut()
          .then(() => {
            console.log('Logout success');
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log('Upload failed: ', error);

        firebaseAuth
          .signOut()
          .then(() => {
            console.log('Logout success');
          })
          .catch(error => {
            console.log(error);
          });
      });

    // } else {
    //   console.log('ternyata blom login loe!');
    // }
    // });

    fileReader.onloadend = () => {
      this.setState({ file: file, imagePreviewUrl: fileReader.result });
    };
    fileReader.readAsDataURL(file);
  }

  uploadPhotoProfileHandler(evt) {
    evt.preventDefault();
    this.props.uploadPhotoProfile();
  }

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
                    {this.state.imagePreviewUrl && (
                      <img
                        src={this.state.imagePreviewUrl}
                        className="center-block img-circle"
                      />
                    )}
                  </div>
                </div>
              </div>
              <p className="text-center">or choose file</p>
              <div className="form-group">
                <input
                  className="input-file"
                  type="file"
                  name=""
                  onChange={this.fileSelectChangeHandler}
                />
              </div>

              <Link
                to="/photographer-registration/s3"
                className="button next-btn"
                onClick={this.uploadPhotoProfileHandler}
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default connect(null, dispatch => ({
  uploadPhotoProfile: () => dispatch(uploadPhotoProfile()),
}))(PhotographerRegistrationStep2);
