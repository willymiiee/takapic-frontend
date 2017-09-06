import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser } from 'store/actions';

import {
  googleProvider,
  facebookProvider,
  firebase,
} from '../../services/firebase';
import { checkUserByEmail, registerUser } from '../../services/user';

class Sosmed extends Component {
  constructor(props) {
    super(props);

    this.authLoginSucces = this.authLoginSucces.bind(this);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
  }

  loginFacebook() {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then(result => {
        this.authLoginSucces(result);
      })
      .catch(error => console.log(error, 'error'));
  }

  loginGoogle() {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(result => {
        this.authLoginSucces(result);
      })
      .catch(error => console.log(error));
  }

  authLoginSucces(loginResult) {
    let user = loginResult.user;
    checkUserByEmail(user.email)
      .then(takapicUser => {
        setTimeout(() => {
          this.props.setUser(takapicUser, 'register sosmed');
          this.props.onSuccess();
        }, 1000);
      })
      .catch(error => {
        registerUser(user.displayName, user.email, '', '', '', user.uid)
          .then(takapicUser => {
            setTimeout(() => {
              this.props.setUser(takapicUser, 'register sosmed');
              this.props.onSuccess();
            }, 1000);
          })
          .catch(error => this.props.onError(error));
      });
    //cek by email
    //if oke login
    //if no register
  }

  render() {
    return (
      <div className="row social-button">
        <div className="col-xs-6">
          <button
            onClick={this.loginGoogle}
            className="btn btn-block btn-lg btn-social btn-google"
          >
            <span className="fa fa-google" /> Sign in with Google
          </button>
        </div>
        <div className="col-xs-6">
          <button
            onClick={this.loginFacebook}
            className="btn btn-block btn-lg btn-social btn-facebook"
          >
            <span className="fa fa-facebook" /> Sign in with Facebook
          </button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(Sosmed);
