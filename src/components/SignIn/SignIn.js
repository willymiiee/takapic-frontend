import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loggingIn } from '../../store/actions/userActions';

import Page from 'components/Page';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
  }

  onSubmitHandler(evt) {
    evt.preventDefault();
    this.props.loggingIn(this.state.email, this.state.password);
  }

  emailChangeHandler(evt) {
    evt.preventDefault();
    this.setState({ email: evt.target.value });
  }

  passwordChangeHandler(evt) {
    evt.preventDefault();
    this.setState({ password: evt.target.value });
  }

  render() {
    return (
      <Page>
        <div
          className="container"
          style={{ marginTop: '20px' }}
          id="sign-in-main-custom"
        >
          <div className="panel setup-content">
            <div className="panel-body">
              <div className="mfp-content">
                <div className="small-dialog-header">
                  <h3>Sign In</h3>
                </div>

                <div className="sign-in-form style-1">
                  {this.props.error ? (
                    <p style={{ color: 'red' }}>{this.props.error.message}</p>
                  ) : null}
                  <form
                    method="post"
                    className="login"
                    onSubmit={this.onSubmitHandler}
                  >
                    <p className="form-row form-row-wide">
                      <label htmlFor="email">
                        Email:
                        <i className="im im-icon-Email" />
                        <input
                          type="email"
                          value={this.state.email}
                          autoComplete="off"
                          required={true}
                          className="input-text"
                          id="email"
                          onChange={this.emailChangeHandler}
                        />
                      </label>
                    </p>

                    <p className="form-row form-row-wide">
                      <label htmlFor="password">
                        Password:
                        <i className="im im-icon-Lock-2" />
                        <input
                          type="password"
                          value={this.state.password}
                          autoComplete="off"
                          required={true}
                          className="input-text"
                          id="password"
                          onChange={this.passwordChangeHandler}
                        />
                      </label>
                      <span className="lost_password">
                        <a href="#">Lost Your Password?</a>
                      </span>
                    </p>

                    <div className="form-row">
                      <button
                        type="submit"
                        className="button margin-top-5"
                        name="login"
                        defaultValue="Login"
                        disabled={this.props.isLoggingIn}
                      >
                        {this.props.isLoggingIn ? (
                          'Logging you in, please wait..'
                        ) : (
                          'Login'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default connect(
  state => ({
    isLoggingIn: state.userAuth.loggingIn,
    error: state.userAuth.error,
  }),
  dispatch => ({
    loggingIn: (email, password) => dispatch(loggingIn(email, password)),
  })
)(SignIn);
