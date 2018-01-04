import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Yup from 'yup';
import {
  userSignupByEmailPassword,
  userSignupByFacebook,
  userSignupByGoogle
} from '../../store/actions/userActions';
import { USER_PHOTOGRAPHER } from '../../services/userTypes';

import Page from '../Page';

const PhotographerRegisterStep1Form = props => {
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

      <form onSubmit={handleSubmit}>
        <div className={`form-group ${errors.completeName && touched.completeName && 'has-error'}`}>
          <label className="control-label">Your complete name</label>
          <input
            name="completeName"
            type="text"
            value={values.completeName}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your complete name"
            autoComplete="off"
          />
          {errors.completeName && touched.completeName && <label className="control-label">{errors.completeName}</label>}
        </div>

        <div className={`form-group ${errors.email && touched.email && 'has-error'}`}>
          <label className="control-label">Your valid email</label>
          <input
            name="email"
            type="text"
            value={values.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your valid email address"
            autoComplete="off"
          />
          {errors.email && touched.email && <label className="control-label">{errors.email}</label>}
        </div>

        <div className={`form-group ${errors.password && touched.password && 'has-error'}`}>
          <label className="control-label">Choose a password</label>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className="form-control lalalalilili"
            placeholder="Choose a password"
            autoComplete="off"
          />
          {errors.password && touched.password && <label className="control-label">{errors.password}</label>}
        </div>

        <div className={`form-group ${errors.passwordConfirm && touched.passwordConfirm && 'has-error'}`}>
          <label className="control-label">Confirm / retype your password</label>
          <input
            name="passwordConfirm"
            type="password"
            value={values.passwordConfirm}
            onChange={handleChange}
            className="form-control"
            placeholder="Confirm / retype your password"
            autoComplete="off"
          />
          {errors.passwordConfirm && touched.passwordConfirm && <label className="control-label">{errors.passwordConfirm}</label>}
        </div>

        <button
          type="submit"
          className="button next-btn"
          disabled={isSubmitting}
        >
          { isSubmitting ? 'Signing you up, Please wait...' : 'Next' }
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

const PhotographerRegisterStep1Formik = Formik({
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
      props.userSignupByEmailPassword(values.email, values.password, values.completeName, USER_PHOTOGRAPHER);
      setSubmitting(false);
    }, 2000);
  }
})(PhotographerRegisterStep1Form);

class PhotographerRegistrationStep1 extends Component {
  constructor() {
    super();
    this.signUpFacebook = this.signUpFacebook.bind(this);
    this.signUpGoogle = this.signUpGoogle.bind(this);
  }

  signUpFacebook(evt) {
    this.props.userSignupByFacebook(USER_PHOTOGRAPHER);
  }

  signUpGoogle(evt) {
    this.props.userSignupByGoogle(USER_PHOTOGRAPHER);
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
              <h2 className="text-center">
                Register as a takapic photographer
              </h2>

              <div className="text-center social-media-signup">
                <p>
                  You can register to be our photographer using your existing<br/>
                  Facebook or Google account
                </p>

                <div className="social-media-btn">
                  <button
                    type="button"
                    className="fb-btn"
                    onClick={this.signUpFacebook}
                  >
                    <img
                      src="https://res.cloudinary.com/debraf3cg/image/upload/v1514882562/assets/fb-art.png"
                      alt="Sign up with Facebook"
                    />
                    Sign up with Facebook
                  </button>

                  <button
                    type="button"
                    className="gmail-btn"
                    onClick={this.signUpGoogle}
                  >
                    <img
                      src="https://res.cloudinary.com/debraf3cg/image/upload/v1514972448/assets/btn_google_light_normal_ios.png"
                      alt="Sign up with Google"
                    />
                    Sign up with Google
                  </button>
                </div>

                <p>or fill the form below</p>

              </div>

              <PhotographerRegisterStep1Formik
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
)(PhotographerRegistrationStep1);
