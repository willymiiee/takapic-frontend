import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

import {
  checkUserByEmail, sendRegisterForm
} from '../../services/user';

class Sosmed extends Component{
  constructor(props){
    super(props);
    this.state = {name:'as'}
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  signinUserSosmed(user) {
    checkUserByEmail(user.email)
    .then((user) =>{
      this.props.onSucces(user);
    }).catch((error) => {
      sendRegisterForm(user.name, user.email, '', '', '')
      .then((user) => {
        this.props.onSucces(user);
      }).catch((error) => this.props.onError(error.message))
    })
  }

  responseFacebook(response) {
    let user = {
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    }
    this.signinUserSosmed(user);
  }

  responseGoogle(response) {
    let profile = response.profileObj; 
    let user = {
      name: profile.name,
      email: profile.email,
      image: profile.imageUrl
    }
    this.signinUserSosmed(user);
  }

  render() {
    return (
      <div className="sosmed-login-container">
        <FacebookLogin
          appId="116672072256415"
          fields="name,email,picture"
          callback={this.responseFacebook}
          size="small"
        />
        <GoogleLogin
          clientId="821918276576-9ml60djepfnqk6s48le2e6s7ehn0aide.apps.googleusercontent.com"
          onSuccess={this.responseGoogle}
          isSignIn={true}
          style={{
            background: 'rgb(209, 72, 54)',
            border: '1px solid transparent'}}
        />
      </div>
    )
  }
}

export default Sosmed;