import React, {Component} from 'react';
import {
  googleProvider, facebookProvider, firebase
} from '../../services/firebase';

class Sosmed extends Component{
  constructor(props){
    super(props);

    this.loginGoogle.bind(this);
    this.loginFacebook.bind(this);
  }

  loginFacebook(){
    firebase.auth().signInWithPopup(facebookProvider).then((result) => {
      console.log(result)
    }).catch((error) => console.log(error));
  }

  loginGoogle(){
    firebase.auth().signInWithPopup(googleProvider).then((result) => {
      console.log(result)
    }).catch((error) => console.log(error));
  }

  render(){
    return (
      <div className="row social-button">
        <div className="col-xs-6">
          <button onClick={this.loginGoogle} className="btn btn-block btn-lg btn-social btn-google">
            <span className="fa fa-google"></span> Sign in with Google
          </button>
        </div>
        <div className="col-xs-6">
          <button onClick={this.loginFacebook} className="btn btn-block btn-lg btn-social btn-facebook">
            <span className="fa fa-facebook"></span> Sign in with Facebook
          </button>
        </div>
      </div>
    )
  }
}

export default Sosmed;