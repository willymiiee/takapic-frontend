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
      countryCode: this.props.userMetadata.country,
      continent: "",
      cityOptions: [],
      locationAdmLevel1: this.props.userMetadata.locationAdmLevel1,
      locationAdmLevel2: this.props.userMetadata.locationAdmLevel2,
      selected: {
        languages:
          this.props.photographerServiceInformation.data.languages || [],
        specialities: this.props.photographerServiceInformation.data.speciality || [],
      },
      values: {
        name: this.props.userMetadata.displayName,
      }
    };

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    const { values } = this.state;
    values.name = event.target.value
    this.setState({values});
  }

  _handleSelectCountry = selectChoice => {
    this.setState({
      countryCode: selectChoice.value,
      continent: selectChoice.continent
    });

    if (selectChoice.value !== this.state.countryCode) {
      this._resetCity();
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
      return;
    }

    const urlApi = `${process.env.REACT_APP_API_HOSTNAME}/api/cities/`;
    return fetch(
      `${urlApi}?countryCode=${this.state.countryCode}&continent=${this.state
        .continent}&kwd=${input}`
    )
      .then(response => response.json())
      .then(result => {
        this.setState({ cityOptions: result.data });
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
    let {
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
              onChange={this.handleNameChange}
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
              value={photographerServiceInformation.selfDescription}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={6}>
            <FormControl
              type="email"
              placeholder="Enter Your Email"
              value={userMetadata.email}
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
              value={userMetadata.phoneNumber}
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
            <AsyncTypeahead
              selected={[this.state.locationAdmLevel2]}
              multiple={false}
              allowNew={false}
              options={this.state.cityOptions}
              onSearch={this._getCities}
              onChange={this._handleSelectCity}
              placeholder={
                this.state.countryCode ? (
                  "Search and choose your city"
                ) : (
                  "Please select a country first"
                )
              }
              disabled={!this.state.countryCode}
              isLoading={true}
              inputProps={{ name: "city" }}
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
                  margin: '5px 0px 5px 5px',
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
                  margin: '5px 0px 5px 5px',
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
