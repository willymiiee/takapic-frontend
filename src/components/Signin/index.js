import React, {Component} from 'react';
import SigninContainer from './SigninContainer';

class Signin extends Component{
  render() {
    return(
      <div className="container" style={{paddingTop: '100px', marginBottom: '50px'}}>
        <div className="row">
          <div className="col-md-6 col-sm-8 col-xs-12 col-md-offset-3 col-sm-offset-2">
            <SigninContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default Signin;