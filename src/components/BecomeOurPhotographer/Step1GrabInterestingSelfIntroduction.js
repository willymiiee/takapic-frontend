import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import { selfDescription } from '../../store/actions/photographerServiceInfoActions';

import Page from '../Page';

const Step1GrabInterestingSelfIntroduction = props => {
  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting
  } = props;

  return (
    <Page>
      <div className="container" id="photographer-landing">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div className="card radius-0">

            <div className="steps steps-3">
              <div />
              <div className="active" />
              <div />
            </div>
            <hr />

            <h3>Tell travellers something interesting about yourself</h3>

            <form onSubmit={handleSubmit}>
              <textarea
                name="selfDescription"
                defaultValue={values.selfDescription}
                onChange={handleChange}
                placeholder="I am.."
              />

              <div style={{overflow:'hidden'}}>
                <button
                  type="submit"
                  className="button next-btn"
                  style={{float:'right'}}
                  disabled={isSubmitting}
                >
                  { isSubmitting ? 'Please wait...' : 'Next' }
                </button>
                <Link
                    to="/become-our-photographer/step-1-1"
                    className="button button-white-no-shadow u"
                    style={{float:'right'}}
                >
                  Back
                </Link>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

const Step1GrabInterestingSelfIntroductionFormik = Formik({
  mapPropsToValues: props => ({
    selfDescription: ''
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setTimeout(() => {
      props.selfDescription(values.selfDescription);
      setSubmitting(false);
      props.history.push('/become-our-photographer/step-1-3');
    }, 1000);
  }
})(Step1GrabInterestingSelfIntroduction);

export default withRouter(
  connect(null, dispatch => ({
    selfDescription: description => dispatch(selfDescription(description)),
  }))(Step1GrabInterestingSelfIntroductionFormik)
);
