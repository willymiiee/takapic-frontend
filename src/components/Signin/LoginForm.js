import React from 'react';
import { loginUser } from '../../services/user';
import {FormWithConstraints, FieldFeedback, Bootstrap4} from 'react-form-with-constraints';

const { FieldFeedbacks, FormGroup, FormControlInput } = Bootstrap4;

class LoginForm extends FormWithConstraints{
  constructor(props) {
    super(props);
    super(props);

    this.state = {
      login: {
        email: '',
        password: '',
      },
      submitButtonDisabled: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.currentTarget;

    this.setState({
      login: Object.assign({}, this.state.login, {[target.name]: target.value})
    });

    super.handleChange(e);

    this.setState({
      submitButtonDisabled: !this.isValid()
    });
  }

  handleSubmit(e) {
    super.handleSubmit(e);

    console.log('state:', JSON.stringify(this.state));

    if (!this.isValid()) {
      return false;
    } else {
      loginUser(this.state.login.email, this.state.login.password)
        .then(() => this.props.onSuccess())
        .catch((error) => this.props.onError(error.message));
    }

    this.setState({
      submitButtonDisabled: !this.isValid()
    });
  }

  render() {
    return (
      <form className="form-validate" onSubmit={this.handleSubmit} noValidate>
        <FormGroup for="email">
          <FormControlInput type="email" id="email" name="email"
                            value={this.state.login.email} onChange={this.handleChange}
                            placeholder="Email"
                            required />
          <FieldFeedbacks for="email">
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>

        <FormGroup for="password">
          <FormControlInput type="password" id="password" name="password"
                            value={this.state.login.password} onChange={this.handleChange}
                            placeholder="Password"
                            pattern=".{6,}" required />
          <FieldFeedbacks for="password" show="all">
            <FieldFeedback when="valueMissing" />
            <FieldFeedback when="patternMismatch">Should be at least 6 characters long</FieldFeedback>
          </FieldFeedbacks>
        </FormGroup>

        <button disabled={this.state.submitButtonDisabled} className="button button-white border margin-top-5" name="login">Login</button>
      </form>
    )
  }
}

export default LoginForm;