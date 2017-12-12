import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Formik } from 'formik';
import Yup from 'yup';
import { connect } from 'react-redux';
import { database } from '../../services/firebase';
import { uploadPhonenumber } from '../../store/actions/userInitProfileActions';

import 'react-select/dist/react-select.css';
import Page from '../Page';

const PhoneNumberCollectForm = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    countries
  } = props;

  const _handleSelect = selectChoice => {
    setFieldValue('phoneNumberCountryCode', selectChoice.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        name="phoneNumberCountryCode"
        value={values.phoneNumberCountryCode}
        options={countries}
        clearable={false}
        onChange={_handleSelect}
      />

      <div className={`form-group ${errors.phoneNumber && touched.phoneNumber && 'has-error'}`}>
        <div className="input-group">
          <span className="input-group-addon">{ values.phoneNumberCountryCode === '' ? '-' : values.phoneNumberCountryCode }</span>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            value={values.phoneNumber}
            className="form-control"
            placeholder="Enter Your Phone Number, exclude dial code"
          />
        </div>
        {errors.phoneNumber && touched.phoneNumber && <label className="control-label">{errors.phoneNumber}</label>}
      </div>

      <button
        type="submit"
        className="button next-btn"
        disabled={isSubmitting}
      >
        { isSubmitting ? 'Please wait...' : 'Next' }
      </button>
    </form>
  );
};

PhoneNumberCollectForm.propTypes = {
  countries: PropTypes.array.isRequired,
  uploadPhonenumber: PropTypes.func.isRequired
};

const PhoneNumberCollectFormik = Formik({
  mapPropsToValues: props => ({
    phoneNumberCountryCode: '',
    phoneNumber: ''
  }),
  validationSchema: Yup.object().shape({
    phoneNumber: Yup.number().required('Please input phone number')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setTimeout(() => {
      props.uploadPhonenumber(values.phoneNumberCountryCode, values.phoneNumber, props.reference);
      setSubmitting(false);
    }, 1000);
  }
})(PhoneNumberCollectForm);

class PhotographerRegistrationStep3 extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      phonenumber_country_code: '',
      phonenumber: '',
    };
  }

  componentDidMount() {
    const db = database.database();
    const countriesRef = db.ref('/countries');
    countriesRef.once('value', snapshot => {
      const countriesSource = snapshot.val();
      let countriesList = [];
      for (let key in countriesSource) {
        countriesList.push({
          value: countriesSource[key].phone_dial_code,
          label: `${countriesSource[key].name} (${countriesSource[key].phone_dial_code})`
        });
      }

      this.setState({ countries: countriesList });
    });
  }

  render() {
    const { countries } = this.state;
    const {
      user: { uid }
    } = this.props;

    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-3">
            <div />
            <div />
            <div className="active" />
          </div>
          <hr />
          <div className="panel setup-content" id="step-3">
            <div className="panel-body">
              <h2 className="text-center">Confirm your phone number</h2>

              <img
                src="http://www.freeiconspng.com/uploads/mobile-phone-cell-icon-25.png"
                alt=""
                className="center-block"
              />

              <PhoneNumberCollectFormik
                countries={countries}
                uploadPhonenumber={this.props.uploadPhonenumber}
                reference={uid}
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
    user: state.userAuth,
    isUploadingPhoneNumber: state.userInitProfile.isUploadingPhoneNumber,
  }),
  dispatch => ({
    uploadPhonenumber: (phoneNumberCountryCode, phoneNumber, reference) =>
      dispatch(uploadPhonenumber(phoneNumberCountryCode, phoneNumber, reference)),
  })
)(PhotographerRegistrationStep3);
