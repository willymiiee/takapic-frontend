import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Yup from 'yup';
import {
  userSignupByEmailPassword,
  userSignupByFacebook,
  userSignupByGoogle
} from '../../store/actions/userActions';
import { USER_TRAVELLER } from '../../services/userTypes';

import Page from '../Page';

const TravellerRegistrationForm = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    message
  } = props;

  return (
    <div>
      { message && <p style={{ color: 'red', marginBottom: '25px', width: '100%', textAlign: 'center', fontSize: '1em' }}>{ message }</p> }

      <form onSubmit={handleSubmit} className="form-flex">
        <div className={`form-group ${errors.completeName && touched.completeName && 'has-error'}`}>
          <label className="control-label">Name</label>
          <input
            name="completeName"
            type="text"
            value={values.completeName}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your full name"
            autoComplete="off"
          />
        </div>
        {errors.completeName && touched.completeName && <label className="control-label error-msg">{errors.completeName}</label>}

        <div className={`form-group ${errors.email && touched.email && 'has-error'}`}>
          <label className="control-label">Email</label>
          <input
            name="email"
            type="text"
            value={values.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your valid email address"
            autoComplete="off"
          />
        </div>
        {errors.email && touched.email && <label className="control-label error-msg">{errors.email}</label>}

        <div className={`form-group ${errors.password && touched.password && 'has-error'}`}>
          <label className="control-label">Password</label>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className="form-control lalalalilili"
            placeholder="Create a password"
            autoComplete="off"
          />
        </div>
        {errors.password && touched.password && <label className="control-label error-msg">{errors.password}</label>}

        <div className={`form-group ${errors.passwordConfirm && touched.passwordConfirm && 'has-error'}`}>
          <label className="control-label">Password Confirmation</label>
          <input
            name="passwordConfirm"
            type="password"
            value={values.passwordConfirm}
            onChange={handleChange}
            className="form-control"
            placeholder="Retype your password"
            autoComplete="off"
          />
        </div>
        {errors.passwordConfirm && touched.passwordConfirm && <label className="control-label error-msg">{errors.passwordConfirm}</label>}

        <button
          type="submit"
          className="button radius-5 key-color width50 margin-top-40 margin-bottom-15"
          disabled={isSubmitting}
        >
          { isSubmitting ? 'Signing you up, Please wait...' : 'Next Step' }
        </button>
      </form>
    </div>
  );
};

const equalTo = (msg) => {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg,
    test: value => {
      const prevPwd = window.$('.lalalalilili').val();
      return value === prevPwd;
    }
  });
};

Yup.addMethod(Yup.string, 'equalTo', equalTo);

const TravellerRegistrationFormik = Formik({
  mapPropsToValues: props => ({
    completeName: props.filledValues.completeName,
    email: props.filledValues.email,
    password: props.filledValues.password,
    passwordConfirm: props.filledValues.password
  }),
  validationSchema: Yup.object().shape({
    completeName: Yup.string().required('Please input your complete name'),
    email: Yup.string().email().required('Please input your valid and frequently used email address'),
    password: Yup.string().required('Please input your password'),
    passwordConfirm: Yup.string().equalTo('Your confirmed password must match previous typed password').required('Please confirm / retype your password')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setTimeout(() => {
      props.userSignupByEmailPassword(values.email, values.password, values.completeName, USER_TRAVELLER);
      setSubmitting(false);
    }, 1000);
  }
})(TravellerRegistrationForm);

class TravellerRegistration extends Component {
  constructor() {
    super();
    this.signUpFacebook = this.signUpFacebook.bind(this);
    this.signUpGoogle = this.signUpGoogle.bind(this);
  }

  signUpFacebook() {
    this.props.userSignupByFacebook(USER_TRAVELLER);
  }

  signUpGoogle() {
    this.props.userSignupByGoogle(USER_TRAVELLER);
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
              <h2 className="text-center" style={{fontWeight:'bold'}}>
                Hi Traveller!
              </h2>

              <div className="text-center social-media-signup">
                <p style={{lineHeight:'24px'}}>
                  You can sign up using your existing <br/> Facebook or Google account
                </p>

                <div className="social-media-login-sign-in row">
                  <div className="col-sm-6">
                    <div
                      type="button"
                      className="btn-sign-in-facebook"
                      onClick={this.signUpFacebook}>
                      <img
                        src="https://res.cloudinary.com/debraf3cg/image/upload/v1514882562/assets/fb-art.png"
                        alt="Sign up with Facebook"
                      />
                      Sign up with Facebook
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div
                      type="button"
                      className="btn-sign-in-gmail"
                      onClick={this.signUpGoogle}>
                      <img
                        src="https://res.cloudinary.com/debraf3cg/image/upload/v1515164506/assets/google.png"
                        alt="Sign up with Google"
                      />
                      Sign up with Google
                    </div>
                  </div>
                </div>

                <p>or fill the form below</p>

              </div>

              <TravellerRegistrationFormik
                userSignupByEmailPassword={this.props.userSignupByEmailPassword}
                message={this.props.message}
                filledValues={this.props.filledValues}
              />

            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default connect(
  state => ({
    filledValues: {
      completeName: state.userSignup.completeName,
      email: state.userSignup.email,
      password: state.userSignup.password
    },
    message: state.userSignup.message
  }),
  dispatch => ({
    userSignupByEmailPassword: (email, password, displayName, userType) =>
      dispatch(userSignupByEmailPassword(email, password, displayName, userType)),
    userSignupByFacebook: userType => dispatch(userSignupByFacebook(userType)),
    userSignupByGoogle: userType => dispatch(userSignupByGoogle(userType))
  })
)(TravellerRegistration);
