import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database, facebookAuthProvider } from 'services/firebase';
import { userSignupByEmailPassword } from '../../store/actions/userActions';
import { USER_PHOTOGRAPHER } from '../../services/userTypes';

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
  }

  signUpGoogle(evt) {
    // photographerSignUpGoogle();
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
    this.props.userSignupByEmailPassword(
      this.state.email,
      this.state.password,
      this.state.complete_name,
      USER_PHOTOGRAPHER
    );
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
              <p style={{ color: 'red' }}>
                {this.props.status !== 'OK' ? this.props.message : ''}
              </p>
              <h2 className="text-center">
                Register as a takapic photographer
              </h2>
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
                {this.props.isSigningUp ? (
                  'Signing you up, Please wait...'
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
    isSigningUp: state.userSignup.signingUp,
    status: state.userSignup.status,
    message: state.userSignup.message,
  }),
  dispatch => ({
    userSignupByEmailPassword: (email, password, displayName, userType) =>
      dispatch(
        userSignupByEmailPassword(email, password, displayName, userType)
      ),
  })
)(PhotographerRegistrationStep1);
