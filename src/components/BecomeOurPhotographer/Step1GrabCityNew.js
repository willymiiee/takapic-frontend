import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import Yup from 'yup';
import Select from 'react-select';
import firebase from 'firebase';
import axios from "axios";
import { database } from "../../services/firebase";

import Page from '../Page';

class CityCollectForm extends Component {
  constructor() {
    super();
    this.state = {
      countryCode: '',
      continent: '',
      selectedCity: null
    }
  }

  selectCountryHandler = selectChoice => {
    const { currencies } = this.props;
    const selectedCurrency = currencies[selectChoice.value];
    this.props.setFieldValue('country', selectChoice.value);
    this.props.setFieldValue('countryName', selectChoice.label);
    this.props.setFieldValue('currency', selectedCurrency);

    this.setState({
      countryCode: selectChoice.value,
      continent: selectChoice.continent
    });
  };

  selectCityHandler = (value) => {
    if (value) {
      this.props.setFieldValue('locationAdmLevel1', value.adm1);
      this.props.setFieldValue('locationAdmLevel2', value.label);
      this.setState({ selectedCity: { label: value.label }});
    } else {
      this.props.setFieldValue('locationAdmLevel1', '');
      this.props.setFieldValue('locationAdmLevel2', '');
      this.setState({ selectedCity: null });
    }
  };

  retrieveCitiesHandler = (input) => {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    const urlApi = `${process.env.REACT_APP_API_HOSTNAME}/api/cities/`;

    return axios
      .get(`${urlApi}?countryCode=${this.state.countryCode}&continent=${this.state.continent}&kwd=${input}`)
      .then(response => {
        return { options: response.data.data };
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const {
      values,
      errors,
      touched,
      isSubmitting,
      handleSubmit,
      countries
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${errors.country && touched.country && 'has-error'}`}>
          <label style={{ fontSize: '1em' }}>Country</label>
          <Select
            name="country"
            value={values.country}
            options={countries}
            clearable={false}
            onChange={this.selectCountryHandler}
          />
          {errors.country && touched.country && <label className="control-label">{errors.country}</label>}
        </div>

        <div className={`form-group ${errors.locationAdmLevel2 && touched.locationAdmLevel2 && 'has-error'}`}>
          <label style={{ fontSize: '1em' }}>City</label>
          <Select.Async
            name="locationAdmLevel2"
            value={this.state.selectedCity}
            onChange={this.selectCityHandler}
            valueKey="label"
            labelKey="label"
            loadOptions={this.retrieveCitiesHandler}
            placeholder={this.state.countryCode ? 'Search and choose your city' : 'Please select a country first'}
            disabled={!this.state.countryCode}
          />
          {errors.locationAdmLevel2 && touched.locationAdmLevel2 && <label className="control-label">{errors.locationAdmLevel2}</label>}
        </div>
        <button
          type="submit"
          className="button key-color radius-5 width1 margin-top-40 margin-bottom-15"
          disabled={isSubmitting}
        >
          { isSubmitting ? 'Please wait...' : 'Next' }
        </button>

        <input name="countryName" type="hidden" value={values.countryName}/>
        <input name="locationAdmLevel1" type="hidden" value={values.locationAdmLevel1}/>
      </form>
    );
  }
}

const CityCollectFormik = Formik({
  mapPropsToValues: props => ({
    country: '',
    countryName: '',
    currency: '',
    locationAdmLevel1: '',
    locationAdmLevel2: ''
  }),
  validationSchema: Yup.object().shape({
    country: Yup.string().required('Please choose country'),
    locationAdmLevel2: Yup.string().required('Please choose city')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setTimeout(() => {
      const db = database.database();
      const locationMergeList = [values.locationAdmLevel2, values.locationAdmLevel1, values.countryName];
      const locationUpdate = {
        country: values.country,
        countryName: values.countryName,
        locationAdmLevel1: values.locationAdmLevel1,
        locationAdmLevel2: values.locationAdmLevel2,
        locationMerge: locationMergeList.filter((item) => item !== '').join(', ')
      };

      db
        .ref('photographer_service_information')
        .child(props.uid)
        .update({
          location: locationUpdate,
          updated: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
          locationUpdate.currency = values.currency;
          locationUpdate.updated = firebase.database.ServerValue.TIMESTAMP;

          db
            .ref('user_metadata')
            .child(props.uid)
            .update(locationUpdate);
        })
        .then(() => {
          setSubmitting(false);
          props.history.push('/become-our-photographer/step-1-2');
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }
})(CityCollectForm);

class Step1GrabCityNew extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      currencies: {}
    };
  }

  componentDidMount() {
    const { countries: countriesSource } = this.props;
    let countriesList = [];
    let currenciesObjects = {};

    for (let key in countriesSource) {
      const countryCode = countriesSource[key]['iso3166alpha2'];
      countriesList.push({
        value: countryCode,
        label: countriesSource[key].name,
        continent: countriesSource[key].continent
      });

      currenciesObjects[countryCode] = countriesSource[key].currency_code;
    }

    this.setState({ countries: countriesList, currencies: currenciesObjects });
  }

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="card radius-0 m-padding-16">
                <div className="steps steps-3">
                  <div className="active" />
                  <div />
                  <div />
                </div>
                <hr />
                <h3 style={{fontWeight:'bold',marginBottom:'24px'}}>Which city do you live in?</h3>
                <div className="row">
                  <div className="col-sm-12">
                    <CityCollectFormik
                      uid={this.props.user.uid}
                      countries={this.state.countries}
                      currencies={this.state.currencies}
                      cityCollectAction={this.props.cityCollectAction}
                      history={this.props.history}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userAuth,
  countries: state.countries
});
export default withRouter(
  connect(mapStateToProps)(Step1GrabCityNew)
);
