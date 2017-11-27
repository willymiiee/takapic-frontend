import React, { Component } from "react";
import {connect} from 'react-redux';
import Select from "react-select";
import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Image,
  Button
} from "react-bootstrap";

import {dashify} from "../../helpers/helpers";

import {updateBasicInformation} from '../../store/actions/profileUpdateActions';

class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [
        "English",
        "Thai",
        "Vietnamese",
        "Tagalog",
        "Korean",
        "Japanese",
        "Mandarin",
        "Burmese",
        "Malay",
        "Bahasa Indonesia",
        "Spanish",
        "Portuguese",
        "Russian",
        "German",
        "French",
        "Italian",
        "Turkish",
        "Polish",
        "Ukrainian",
        "Romanian",
        "Dutch",
        "Croatian",
        "Hungarian",
        "Greek",
        "Czech",
        "Swedish",
        "Hindi",
        "Arabic",
        "Bengali",
        "Punjabi",
        "Tamil",
        "Urdu",
        "Gujarati",
        "Persian"
      ],
      countryCode: "",
      continent: "",
      cityOptions: [],
      locationAdmLevel1: "",
      locationAdmLevel2: "",
      selected: {
        languages: [],
      },
      values: {
        photoProfileUrl: "",
        name: "",
        selfDescription: "",
        phoneNumber: "",
        city: {
          label: "",
          value: ""
        }
      }
    };
  }

  componentWillMount() {
    const { photographerServiceInformation, photographerServiceInformation : { data : { userMetadata } } } = this.props;
    const { selected, values } = this.state;

    if (photographerServiceInformation && userMetadata) {
      this._setStateLanguage();

      values.photoProfileUrl = userMetadata.photoProfileUrl || "";
      values.name = userMetadata.displayName || "";
      values.selfDescription =
      photographerServiceInformation.data.selfDescription || "";
      values.phoneNumber = userMetadata.phoneNumber || "";
      values.city.label = userMetadata.locationAdmLevel2 || "";
      values.city.value = userMetadata.locationAdmLevel2 || "";

      this.setState({
        countryCode: userMetadata.country || "",
        locationAdmLevel1: userMetadata.locationAdmLevel1 || "",
        locationAdmLevel2: userMetadata.locationAdmLevel2 || "",
        selected,
        values
      });
    }

  }

  _setStateLanguage = () => {
    const { photographerServiceInformation } = this.props;
    const { selected } = this.state;
    let languages = photographerServiceInformation.data.languages;
    if (languages) {
      selected.languages = Object.keys(languages).map(item => (languages[item]));
      this.setState({
        selected
      })
    }
  }

  _handleNameChange = event => {
    const { values } = this.state;
    values.name = event.target.value;
    this.setState({ values });
  };

  _handleSelfDescriptionChange = event => {
    const { values } = this.state;
    values.selfDescription = event.target.value;
    this.setState({ values });
  };

  _handlePhoneNumberChange = event => {
    const { values } = this.state;
    values.phoneNumber = event.target.value;
    this.setState({ values });
  };

  _handleSelectCountry = selectChoice => {
    if (selectChoice) {
      this.setState({
        countryCode: selectChoice.value,
        continent: selectChoice.continent
      });

      if (selectChoice.value !== this.state.countryCode) {
        this._resetCity();
      }
    }
  };

  _resetCity = () => {
    this.setState({
      cityOptions: [],
      locationAdmLevel1: "",
      locationAdmLevel2: ""
    });
  };

  _getCities = input => {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    const urlApi = `${process.env.REACT_APP_API_HOSTNAME}/api/cities/`;
    return fetch(
      `${urlApi}?countryCode=${this.state.countryCode}&continent=${this.state
        .continent}&kwd=${input}`
    )
      .then(response => response.json())
      .then(results => {
        return { options: results.data };
      });
  };

  _handleSelectCity = selectChoice => {
    if (selectChoice) {
      const { values } = this.state;

      values.city.label = selectChoice.value;
      values.city.value = selectChoice.value;

      this.setState({
        locationAdmLevel1: selectChoice.adm1,
        locationAdmLevel2: selectChoice.value
      });
    }
  };

  _handleSelectLanguages = value => {
    const { selected } = this.state;
    const languages = value.map(item => item.value);
    selected.languages = languages;
    this.setState({ selected });
  };

  handleUpdate = event => {
    event.preventDefault();
    const {
        photographerServiceInformation: {
          data: {
            userMetadata: {
              accountProviderType,
              uid,
              email,
            }
          }
        }
    } = this.props;

    const state = this.state

    let reference = '';
    if (accountProviderType === 'google.com') {
        reference = 'googlecom-' + uid;
    } else {
        reference = dashify(email);
    }

    const params = {
        reference,
        state,
        uid,
    };

    this.props.updateBasicInformation(params);

  };

  notEmpty = arr => {
      return arr.length > 0 && arr[0] !== '';
  };

  render() {
    const {
      userMetadata,
      state
    } = this.props;

    const { languages, selected, values } = this.state

    return (
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2} />
          <Col sm={6}>
            <Image
              src={values.photoProfileUrl}
              circle
              style={{ width: 150 }}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={6}>
            <FormControl
              type="text"
              placeholder="Enter Your Name"
              value={values.name}
              onChange={this._handleNameChange}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Self Description
          </Col>
          <Col sm={6}>
            <textarea
              name="selfDescription"
              placeholder="Enter Your Self Description"
              value={values.selfDescription}
              onChange={this._handleSelfDescriptionChange}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPhoneNumber">
          <Col componentClass={ControlLabel} sm={2}>
            Phone Number
          </Col>
          <Col sm={6}>
            <FormControl
              type="text"
              placeholder="Enter Your Phone Number"
              value={values.phoneNumber}
              onChange={this._handlePhoneNumberChange}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalCountry">
          <Col componentClass={ControlLabel} sm={2}>
            Country
          </Col>
          <Col sm={6}>
            <Select
              name="country"
              value={this.state.countryCode}
              options={state.countries}
              clearable={false}
              onChange={this._handleSelectCountry}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalCity">
          <Col componentClass={ControlLabel} sm={2}>
            City
          </Col>
          <Col sm={6}>
            <Select.Async
              multi={false}
              value={values.city}
              onChange={this._handleSelectCity}
              valueKey="value"
              labelKey="label"
              loadOptions={this._getCities}
              placeholder={
                this.state.countryCode ? (
                  "Search and choose your city"
                ) : (
                  "Please select a country first"
                )
              }
              disabled={!this.state.countryCode}
              filterOption={() => (true)}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLanguageSpoken">
          <Col componentClass={ControlLabel} sm={2}>
            Language Spoken
          </Col>
          <Col sm={6}>
            <Select
              placeholder="Select your language"
              options={languages.map(item => ({
                label: item,
                value: item,
                style: {
                  margin: "5px 0px 5px 5px"
                }
              }))}
              multi={true}
              value={selected.languages}
              onChange={this._handleSelectLanguages}
            />
          </Col>
        </FormGroup>

        <hr/>
        <Button onClick={this.handleUpdate} style={{float:'right'}} className="button">Update</Button>
      </Form>
    );
  }
}

export default connect(
    null,
    dispatch => ({
        updateBasicInformation: paramsObject => dispatch(updateBasicInformation(paramsObject))
    })
)(BasicInformation);
