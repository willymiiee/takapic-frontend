import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import Yup from 'yup';
import Select from 'react-select';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import Page from '../Page';

const cityCollectAction = dataObject => {
  return dispatch => {
    dispatch({
      type: 'BECOME_OUR_PHOTOGRAPHER_PLACES_CHANGED',
      payload: dataObject
    });

    dispatch({
      type: 'USER_AUTH_UPDATE_METADATA',
      payload: {
        currency: dataObject.currency
      }
    })
  };
};

class CityCollectForm extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      countryCode: '',
      continent: ''
    }
  }

  _handleSelectCountry = selectChoice => {
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

  _handleSelectCity = selectChoice => {
    this.props.setFieldValue('locationAdmLevel1', selectChoice[0].adm1);
    this.props.setFieldValue('locationAdmLevel2', selectChoice[0].value);
  };

  _getOptions = input => {
    if (!input) {
      return;
    }

    const urlApi = `${process.env.REACT_APP_API_HOSTNAME}/api/cities/`;
    return fetch(`${urlApi}?countryCode=${this.state.countryCode}&continent=${this.state.continent}&kwd=${input}`)
      .then(response => response.json())
      .then(result => {
        this.setState({ options: result.data })
      });
  };

  _renderMenuItemChildren = option => {
    return (
      <div key={option.value}>
        <span>{ option.label + ' - ' + option.adm1 }</span>
      </div>
    );
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
            onChange={this._handleSelectCountry}
          />
          {errors.country && touched.country && <label className="control-label">{errors.country}</label>}
        </div>

        <div className={`form-group ${errors.locationAdmLevel2 && touched.locationAdmLevel2 && 'has-error'}`}>
          <label style={{ fontSize: '1em' }}>City</label>
          <AsyncTypeahead
            name="locationAdmLevel2"
            value={values.locationAdmLevel2}
            multiple={false}
            allowNew={false}
            options={this.state.options}
            onSearch={this._getOptions}
            onChange={this._handleSelectCity}
            placeholder={this.state.countryCode ? 'Search and choose your city' : 'Please select a country first'}
            renderMenuItemChildren={this._renderMenuItemChildren}
            disabled={!this.state.countryCode}
            isLoading={false}
          />
          {errors.locationAdmLevel2 && touched.locationAdmLevel2 && <label className="control-label">{errors.locationAdmLevel2}</label>}
        </div>

        <div style={{ display: 'flex', float: 'right' }}>
          <button
            type="submit"
            className="button next-btn"
            disabled={isSubmitting}
          >
            { isSubmitting ? 'Please wait...' : 'Next' }
          </button>
        </div>

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
      props.cityCollectAction(values);
      setSubmitting(false);
      props.history.push('/become-our-photographer/step-1-2');
    }, 2000);
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
              <div className="card radius-0">
                <div className="steps steps-3">
                  <div className="active" />
                  <div />
                  <div />
                </div>
                <hr />
                <h3>Which city do you live in?</h3>
                <div className="row">
                  <div className="col-sm-12">
                    <CityCollectFormik
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
  countries: state.countries
});
const mapDispatchToProps = dispatch => ({
  cityCollectAction: dataObject => dispatch(cityCollectAction(dataObject))
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Step1GrabCityNew)
);
