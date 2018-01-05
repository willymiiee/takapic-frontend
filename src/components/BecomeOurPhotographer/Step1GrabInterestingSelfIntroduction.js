import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { database } from "../../services/firebase";

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

            <h3 style={{fontWeight:'bold',marginBottom:'24px'}}>Tell travellers something interesting about yourself</h3>

            <form onSubmit={handleSubmit}>
              <textarea
                name="selfDescription"
                defaultValue={values.selfDescription}
                onChange={handleChange}
                placeholder="I am.."
              />

              <button
                type="submit"
                className="button key-color radius-5 width1 margin-top-40 margin-bottom-15"
                disabled={isSubmitting}
              >
                { isSubmitting ? 'Please wait...' : 'Next' }
              </button>
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
      database
        .database()
        .ref('photographer_service_information')
        .child(props.user.uid)
        .update({ selfDescription: values.selfDescription })
        .then(() => {
          setSubmitting(false);
          props.history.push('/become-our-photographer/step-1-3');
        });
    }, 1000);
  }
})(Step1GrabInterestingSelfIntroduction);

export default withRouter(
  connect(
    (state) => ({ user: state.userAuth })
  )(Step1GrabInterestingSelfIntroductionFormik)
);
