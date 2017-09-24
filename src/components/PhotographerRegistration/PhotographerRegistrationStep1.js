import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  photographerSignUp,
  photographerSignUpFacebook,
  photographerSignUpGoogle,
} from '../../services/auth';
import { database, facebookAuthProvider } from 'services/firebase';

import Page from 'components/Page';

class PhotographerRegistrationStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete_name: '',
      email: '',
      password: '',
    };

    this.completeNameChangeHandler = this.completeNameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.nextStepHandler = this.nextStepHandler.bind(this);
    this.signUpFacebook = this.signUpFacebook.bind(this);
    this.signUpGoogle = this.signUpGoogle.bind(this);
  }

  signUpFacebook(evt) {
    // photographerSignUpFacebook();
    const { dorrr } = this.props;
    facebookAuthProvider.addScope('public_profile,email');
    database
      .auth()
      .signInWithPopup(facebookAuthProvider)
      .then(result => {
        const token = result.credential.accessToken;
        const user = result.user;
        dorrr({ user, token });
        console.log(token, user);
      })
      .catch(error => {
        console.log('error error error');
        console.log(error.code, error.message, error.email, error.credential);
      });

    /* database.auth().getRedirectResult().then(result => {
      if (result.credential) {
        const token = result.credential.accessToken;
      }
      const user = result.user;
      console.log('oka oka oka user: ', user);
    }).catch(error => {
      console.log('get redirect result: ', error.code, error.message);
    }); */
  }

  signUpGoogle(evt) {
    photographerSignUpGoogle();
  }

  completeNameChangeHandler(evt) {
    this.setState({ complete_name: evt.target.value });
  }

  emailChangeHandler(evt) {
    this.setState({ email: evt.target.value });
  }

  passwordChangeHandler(evt) {
    this.setState({ password: evt.target.value });
  }

  nextStepHandler(evt) {
    photographerSignUp(this.state);
  }

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-3">
            <div className="active" />
            <div />
            <div />
          </div>

          <div className="panel setup-content" id="step-1">
            <div className="panel-body">
              <h2 className="text-center">Photographer Registration</h2>
              <div className="text-center social-media-signup">
                <p>
                  You can register to be our photographer using your existing
                  Facebook or Gmail account
                </p>
                <div className="social-media-btn">
                  <button
                    type="button"
                    className="btn fb-btn"
                    onClick={this.signUpFacebook}
                  >
                    <img
                      src="https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png"
                      alt=""
                    />Facebook
                  </button>

                  <button
                    type="button"
                    className="btn gmail-btn"
                    onClick={this.signUpGoogle}
                  >
                    <img
                      src="http://pngimg.com/uploads/gmail_logo/gmail_logo_PNG5.png"
                      alt=""
                    />Gmail
                  </button>
                </div>
                <p>or fill the form below</p>
              </div>
              <div className="form-group">
                <label className="control-label">Your complete name</label>
                <input
                  type="text"
                  value={this.state.complete_name}
                  onChange={this.completeNameChangeHandler}
                  required="required"
                  className="form-control"
                  placeholder="Enter your complete name"
                />
              </div>
              <div className="form-group">
                <label className="control-label">Your email</label>
                <input
                  type="email"
                  value={this.state.email}
                  onChange={this.emailChangeHandler}
                  required="required"
                  className="form-control"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="form-group">
                <label className="control-label">Choose a password</label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.passwordChangeHandler}
                  required="required"
                  className="form-control"
                  placeholder="Enter your desired password"
                />
              </div>

              <button
                className="button next-btn"
                onClick={this.nextStepHandler}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default connect(null, dispatch => ({
  dorrr: payload => dispatch({ type: 'LOGIN_SUCCESS', payload: payload }),
}))(PhotographerRegistrationStep1);
