import React, { Component } from "react";
import Select from "react-select";
import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Image
} from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

export default class BasicInformation extends Component {
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
      specialities: ["Wedding", "Snap"],
      countryCode: "",
      continent: "",
      cityOptions: [],
      locationAdmLevel1: "",
      locationAdmLevel2: "",
      selected: {
        languages: [],
        specialities: []
      },
      values: {
        name: "",
        selfDescription: "",
        phoneNumber: ""
      }
    };
  }

  componentWillMount() {
    const { userMetadata, photographerServiceInformation } = this.props;
    const { selected, values } = this.state;

    selected.languages = photographerServiceInformation.data.languages || [];
    selected.specialities =
      photographerServiceInformation.data.speciality || [];

    values.name = userMetadata.displayName || "";
    values.selfDescription =
      photographerServiceInformation.data.selfDescription || "";
    values.phoneNumber = userMetadata.phoneNumber || "";

    this.setState({
      countryCode: userMetadata.country || "",
      locationAdmLevel1: userMetadata.locationAdmLevel1 || "",
      locationAdmLevel2: userMetadata.locationAdmLevel2 || "",
      selected,
      values
    });
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
    const options = [
      { label: "one", value: 1 },
      { label: "two", value: 2 },
      { label: "three", value: 3 }
    ];
    return fetch(
      `${urlApi}?countryCode=${this.state.countryCode}&continent=${this.state
        .continent}&kwd=${input}`
    )
      .then(response => response.json())
      .then(results => {
        console.error(results);
        return { options: options };
      });
  };

  _handleSelectCity = selectChoice => {
    if (typeof selectChoice[0] !== "undefined") {
      this.setState({
        locationAdmLevel1: selectChoice[0].adm1,
        locationAdmLevel2: selectChoice[0].value
      });
    }
  };

  _handleSelectLanguages = value => {
    const { selected } = this.state;
    const languages = value.map(item => item.value);
    selected.languages = languages;
    this.setState({ selected });
  };

  _handleSelectSpecialities = value => {
    const { selected } = this.state;
    const specialities = value.map(item => item.value);
    selected.specialities = specialities;
    this.setState({ selected });
  };

  render() {
    const {
      userMetadata,
      photographerServiceInformation,
      countries,
      state
    } = this.props;

    return (
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2} />
          <Col sm={6}>
            <Image
              src={userMetadata.photoProfileUrl}
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
              value={this.state.values.name}
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
              value={this.state.values.selfDescription}
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
              value={this.state.values.phoneNumber}
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
              value={this.state.locationAdmLevel2}
              onChange={this._handleSelectCity}
              valueKey="id"
              labelKey="city"
              loadOptions={this._getCities}
              placeholder={
                this.state.countryCode ? (
                  "Search and choose your city"
                ) : (
                  "Please select a country first"
                )
              }
              disabled={!this.state.countryCode}
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
              options={this.state.languages.map(item => ({
                label: item,
                value: item,
                style: {
                  margin: "5px 0px 5px 5px"
                }
              }))}
              multi={true}
              value={this.state.selected.languages}
              onChange={this._handleSelectLanguages}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalSpecialities">
          <Col componentClass={ControlLabel} sm={2}>
            Specialities
          </Col>
          <Col sm={6}>
            <Select
              placeholder="Select your speciality"
              options={this.state.specialities.map(item => ({
                label: item,
                value: item,
                style: {
                  margin: "5px 0px 5px 5px"
                }
              }))}
              multi={true}
              value={this.state.selected.specialities}
              onChange={this._handleSelectSpecialities}
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
