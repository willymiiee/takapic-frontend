import React, { Component } from 'react';
import { loginUser } from '../../services/user';
import {Form, Input} from 'element-react';

class LoginForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      login: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {required: true, message: 'Please input your email', trigger: 'blur'},
          {type: 'email', message: 'Please input correct email address', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please input your password', trigger: 'blur'}
        ]
      }
    }
  }

  handleSubmit(event){
    event.preventDefault();
    this.refs.loginForm.validate((valid) => {
      if(valid) {
        loginUser(this.state.login.email, this.state.login.password)
        .catch((error) => this.props.onError(error.message))
      } else {
        return false;
      }
    })
  }

  onChange(key, value){
    this.setState({
      login: Object.assign({}, this.state.login, {[key]: value})
    });
  }

  render() {
    return (
      <div className="sign-in-form" onSubmit={this.handleSubmit.bind(this)}>
        <Form ref="loginForm" model={this.state.login} rules={this.state.rules}>
          <Form.Item prop="email">
            <Input
              placeholder="Email"
              value={this.state.login.email}
              onChange={this.onChange.bind(this, 'email')}
              prepend={<i className="im im-icon-Mail"></i>} />
          </Form.Item>
          <Form.Item prop="password">
            <Input
              placeholder="Password"
              type="password"
              value={this.state.login.password}
              onChange={this.onChange.bind(this, 'password')}
              prepend={<i className="im im-icon-Lock-2"></i>} />
          </Form.Item>
          <button type="submit" className="button button-white border margin-top-5" name="login" value="Login">Login</button>
        </Form>
      </div>
    )
  }
}

export default LoginForm;

import React, { Component } from 'react';
import { registerUser, updateUserId } from '../../services/user';
import {Form, Input} from 'element-react';
import {firebase} from '../../services/firebase';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions';

class RegisterForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      register: {
        name: '',
        email: '',
        username: '',
        phone: '',
        password: '',
        passConfirm: ''
      },
      rules: {
        name: [
          {required: true, message: 'Please input your name', trigger: 'blur'},
        ],
        email: [
          {required: true, message: 'Please input your email', trigger: 'blur'},
          {type: 'email', message: 'Please input correct email address', trigger: 'blur'}
        ],
        username: [
          {required: true, message: 'Please input your username', trigger: 'blur'},
          { validator: (rule, value, callback) => {
            if(value === '') {
              callback(new Error('Please input your username'));
            } else if(!value.match(/^[a-zA-Z][a-zA-Z0-9_]*$/g)) {
              callback(new Error('Only a-Z, 0-9 and _ characters allowed, first character must alphabet'));
            } else if(value.length < 4) {
              callback(new Error('Username need at least 4 characters long'));
            } else {
              callback();
            }
          }}
        ],
        phone: [
          {required: true, message: 'Please input your phone number', trigger: 'blur'}          
        ],
        password: [
          {required: true, message: 'Please input your password', trigger: 'blur'},
          {validator: (rule, value, callback) => {
            if(value === '') {
              callback(new Error('Please input your password'));
            } else if(value.length < 6){
              callback(new Error('Password min. 6 character long'))
            } else {
              if(this.state.register.passConfirm !== '') {
                this.refs.registerForm.validateField('passConfirm');
              }
              callback();
            }
          }, trigger: 'blur'}
        ],
        passConfirm: [
          {required: true, message: 'Please input your password', trigger: 'blur'},
          {validator: (rule, value, callback) => {
            if(value === '') {
              callback(new Error('Please input your password again'));
            } else if(value !== this.state.register.password) {
              callback(new Error('Password dont\'t match'))
            } else {
              callback();
            }
          }, trigger: 'blur'}
        ]
      }
    }
  }

  handleSubmit(event){
    event.preventDefault();
    this.refs.registerForm.validate((valid) => {
      if(valid) {
        registerUser(
          this.state.register.name,
          this.state.register.email,
          '',
          this.state.register.username,
          this.state.register.phone
        ).then((user) => {
          //register firebase
          firebase.auth()
            .createUserWithEmailAndPassword(this.state.register.email,this.state.register.password)
            //update uid
            .then(() => {
              let user = firebase.auth().currentUser;
              updateUserId(this.state.register.email, user.uid);
            })
            .then(() => {
              console.log(user);
              //set user redux
              // setTimeout
              this.props.setUser(user, 'dari register');
              this.props.onSuccess();
            })
            .catch((error) => this.props.onError(error.message));
        }).catch((error) => this.props.onError(error.message));
      } else {
        return false;
      }
    })
  }

  onChange(key, value){
    this.setState({
      register: Object.assign({}, this.state.register, {[key]: value})
    });
  }

  render() {
    return (
      <div className="sign-in-form" onSubmit={this.handleSubmit.bind(this)}>
        <Form ref="registerForm" model={this.state.register} rules={this.state.rules}>
          <Form.Item prop="name">
            <Input
              placeholder="Name"
              value={this.state.register.name}
              onChange={this.onChange.bind(this, 'name')}
              prepend={<i className="im im-icon-Pen-6"></i>} />
          </Form.Item>
          <Form.Item prop="email">
            <Input
              placeholder="Email"
              value={this.state.register.email}
              onChange={this.onChange.bind(this, 'email')}
              prepend={<i className="im im-icon-Mail"></i>} />
          </Form.Item>
          <Form.Item prop="username">
            <Input
              placeholder="Username"
              value={this.state.register.username}
              onChange={this.onChange.bind(this, 'username')}
              prepend={<i className="im im-icon-User"></i>} />
          </Form.Item>
          <Form.Item prop="phone">
            <Input
              placeholder="Phone"
              value={this.state.register.phone}
              onChange={this.onChange.bind(this, 'phone')}
              prepend={<i className="im im-icon-Phone"></i>} />
          </Form.Item>
          <Form.Item prop="password">
            <Input
              placeholder="Password"
              type="password"
              value={this.state.register.password}
              onChange={this.onChange.bind(this, 'password')}
              prepend={<i className="im im-icon-Lock-2"></i>} />
          </Form.Item>
          <Form.Item prop="passConfirm">
            <Input
              placeholder="Confirm Password"
              type="password"
              value={this.state.register.passConfirm}
              onChange={this.onChange.bind(this, 'passConfirm')}
              prepend={<i className="im im-icon-Lock-2"></i>} />
          </Form.Item>
          <button type="submit" className="button button-white border margin-top-5" name="login" value="Register">Register</button>
        </Form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(RegisterForm);