import React from 'react';
import { registerUser, updateUserId } from '../../services/user';
import {FormWithConstraints, FieldFeedback, Bootstrap4} from 'react-form-with-constraints';
import {firebase} from '../../services/firebase';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions';

const { FieldFeedbacks, FormGroup, FormControlInput } = Bootstrap4;

class RegisterForm extends FormWithConstraints{
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
      submitButtonDisabled: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    super.handleSubmit(e);
    if(this.isValid()) {
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
            setTimeout(() => {
              this.props.setUser(user, 'dari register');
              this.props.onSuccess();
            }, 1000)
          })
          .catch((error) => this.props.onError(error.message));
      }).catch((error) => this.props.onError(error.message));
    } else {
      return false;
    }
  }

  handleChange(e) {
    const target = e.currentTarget;

    this.setState({
      register: Object.assign({}, this.state.register, {[target.name]: target.value})
    });

    super.handleChange(e);

    this.setState({
      submitButtonDisabled: !this.isValid()
    });
  }

  render() {
    return (
      <form className="form-validate" onSubmit={this.handleSubmit} noValidate>
        <FormGroup for="name">
          <FormControlInput type="text" id="name" name="name"
                            onChange={this.handleChange}
                            placeholder="Name"
                            required />
          <FieldFeedbacks for="name">
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>

        <FormGroup for="email">
          <FormControlInput type="email" id="email" name="email"
                            onChange={this.handleChange}
                            placeholder="Email" required />
          <FieldFeedbacks for="email" show="all">
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>

        <FormGroup for="username">
          <FormControlInput type="text" id="username" name="username"
                            onChange={this.handleChange}
                            placeholder="Username"
                            required />
          <FieldFeedbacks for="username">
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>

        <FormGroup for="phone">
          <FormControlInput type="text" id="phone" name="phone"
                            onChange={this.handleChange}
                            placeholder="Phone" required />
          <FieldFeedbacks for="phone" show="all">
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>

        <FormGroup for="password">
          <FormControlInput type="password" id="password" name="password"
                            onChange={this.handleChange}
                            placeholder="Password"
                            required />
          <FieldFeedbacks for="password">
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>

        <FormGroup for="confirm_password">
          <FormControlInput type="password" id="confirm_password" name="confirm_password"
                            onChange={this.handleChange}
                            placeholder="Confirm Password" required />
          <FieldFeedbacks for="confirm_password" show="all">
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>

        <button disabled={this.state.submitButtonDisabled} className="button button-white border margin-top-5" name="register">Register</button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(RegisterForm);