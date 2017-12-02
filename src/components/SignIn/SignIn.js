import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Yup from 'yup';
import { loggingIn, userSignupByFacebook, userSignupByGoogle } from '../../store/actions/userActions';
import { USER_TRAVELLER } from "../../services/userTypes";

import Page from '../Page';

const SignIn = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    errorResponse,
    uidResponse
  } = props;

  const bgtf = isSubmitting || uidResponse ? '#DDDDDD' : 'inherit';

  return (
    <Page>
      <div
        className="container"
        id="sign-in-main-custom">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-xs-12">
            <div className="panel card radius-0 padding-16">
              <div className="panel-body">
                <div className="mfp-content">
                  <div className="small-dialog-header">
                    <h3>Sign In</h3>
                  </div>

                  <div className="social-media-login-sign-in">
                    <button
                      type="button"
                      className="btn-sign-in-facebook"
                      onClick={() => props.userSignupByFacebook(USER_TRAVELLER)}
                    >
                      <img
                        src="https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png"
                        alt="Facebook login"
                      />Facebook
                    </button>

                    <button
                      type="button"
                      className="btn-sign-in-gmail"
                      onClick={() => props.userSignupByGoogle(USER_TRAVELLER)}
                    >
                      <img
                        src="http://pngimg.com/uploads/gmail_logo/gmail_logo_PNG5.png"
                        alt=""
                      />Gmail
                    </button>
                  </div>

                  <div className="sign-in-form style-1">
                    {errorResponse ? <p style={{color: 'red'}}>{errorResponse.message}</p> : null}
                    {uidResponse ?
                      <p style={{color: 'green'}}>{'Login success! Redirecting...'}</p> : null}
                    <form
                      method="post"
                      className="login"
                      onSubmit={handleSubmit}
                    >
                      <p className="form-row form-row-wide">
                        <label htmlFor="email">
                          Email:
                          <i className="im im-icon-Email"/>
                          <input
                            name="email"
                            type="email"
                            value={values.email}
                            autoComplete="off"
                            className="input-text"
                            onChange={handleChange}
                            disabled={isSubmitting}
                            style={{backgroundColor: bgtf}}
                          />
                        </label>
                        {errors.email && touched.email &&
                        <label style={{color: 'red'}}>{errors.email}</label>}
                      </p>

                      <p className="form-row form-row-wide">
                        <label htmlFor="password">
                          Password:
                          <i className="im im-icon-Lock-2"/>
                          <input
                            name="password"
                            type="password"
                            value={values.password}
                            autoComplete="off"
                            className="input-text"
                            onChange={handleChange}
                            disabled={isSubmitting}
                            style={{backgroundColor: bgtf}}
                          />
                        </label>
                        {errors.password && touched.password &&
                        <label style={{color: 'red'}}>{errors.password}</label>}

                        <span className="lost_password">
                          <a href="/">Lost Your Password?</a>
                        </span>
                      </p>

                      <div className="form-row">
                        <button
                          type="submit"
                          className="button margin-top-5"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Logging you in, please wait..' : 'Login'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

const SignInFormik = Formik({
  mapPropsToValues: props => ({
    email: '',
    password: ''
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required('Please input your valid registered email address'),
    password: Yup.string().required('Please input your password')
  }),
  handleSubmit: (values, {props, setSubmitting}) => {
    setTimeout(() => {
      props.loggingIn(values.email, values.password);
      setSubmitting(false);
    }, 1000);
  }
})(SignIn);

export default connect(
  state => ({
    errorResponse: state.userAuth.error,
    uidResponse: state.userAuth.uid
  }),
  dispatch => ({
    loggingIn: (email, password) => dispatch(loggingIn(email, password)),
    userSignupByFacebook: userType => dispatch(userSignupByFacebook(userType)),
    userSignupByGoogle: userType => dispatch(userSignupByGoogle(userType))
  })
)(SignInFormik);
