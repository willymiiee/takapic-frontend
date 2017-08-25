import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions';
import {Notification} from 'element-react';
import {Tabs, Tab} from 'react-bootstrap';
import {withRouter} from 'react-router';

import Sosmed from './Sosmed';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

// FIXME: Perbaikan user interface (oke)
// TODO: Review alur signin
// TODO: Pembuatan Auth Route (oke)

class SigninContainer extends Component{

  handleSuccessAuth(){
    this.props.history.push({
      pathname: '/'
    })
  }

  handleErrorAuth(message){
    Notification.error({
      title: 'Error',
      message: message
    })
  }

  render() {
    return(
      <div>
        <div className="small-dialog-header">
          <h3>Sign In</h3>
        </div>

        <Sosmed
          onSuccess={this.handleSuccessAuth.bind(this)}
          onError={this.handleErrorAuth.bind(this)}
         />
        <Tabs defaultActiveKey={1} id="sigin-tab">
          <Tab eventKey={1} title="Login">
            <LoginForm
              onSuccess={this.handleSuccessAuth.bind(this)}
              onError={this.handleErrorAuth.bind(this)} />
          </Tab>
          <Tab eventKey={2} title="Register">
            <RegisterForm
              onSuccess={this.handleSuccessAuth.bind(this)}
              onError={this.handleErrorAuth.bind(this)} />
          </Tab>
        </Tabs>

      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(SigninContainer));