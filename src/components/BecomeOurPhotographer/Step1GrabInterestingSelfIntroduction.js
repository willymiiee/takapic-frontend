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
        <div className="steps steps-3">
          <div />
          <div className="active" />
          <div />
        </div>
        <hr />

        <h3>Tell travellers something interesting about yourself</h3>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-8 col-lg-6">
                <textarea
                  name="selfDescription"
                  defaultValue={values.selfDescription}
                  onChange={handleChange}
                />
            </div>
          </div>

          <div className="buttonNextPrevCoupleWrapper">
            <Link
              to="/become-our-photographer/step-1-1"
              className="button button-white-no-shadow u"
            >
              Back
            </Link>

            <button
              type="submit"
              className="button next-btn"
              disabled={isSubmitting}
            >
              { isSubmitting ? 'Please wait...' : 'Next' }
            </button>
          </div>
        </form>
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
