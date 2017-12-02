import React, {Component} from "react";
import {connect} from 'react-redux';
import Select from "react-select";
import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import size from 'lodash/size';

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
      location: {
        country: "",
        countryName: "",
        continent: "",
        locationAdmLevel1: "",
        locationAdmLevel2: "",
        locationMerge: "",
      },
      cityOptions: [],
      selected: {
        languages: [],
      },
      values: {
        photoProfileUrl: "",
        fileImage: false,
        name: "",
        selfDescription: "",
        phoneNumber: "",
        city: {
          label: "",
          value: ""
        },
        currency: "",
      }
    };
  }

  componentWillMount() {
    const { photographerServiceInformation: { data } } = this.props;

    if (size(data) < 2) {
      const { photographerServiceInformation: { data: { userMetadata } } } = this.props;
      const { values } = this.state;

      values.photoProfileUrl = userMetadata.photoProfileUrl || "";
      values.name = userMetadata.displayName || "";
      values.phoneNumber = userMetadata.phoneNumber || "";

      this.setState({ values });

    } else {
      const {
        photographerServiceInformation,
        photographerServiceInformation: {
          data: {userMetadata, selfDescription}
        },
        state: {currencies}
      } = this.props;

      const {location, selected, values} = this.state;

      if (photographerServiceInformation && userMetadata) {
        const currency = currencies[photographerServiceInformation.data.location.country];

        location.country = photographerServiceInformation.data.location.country || "";
        location.countryName = photographerServiceInformation.data.location.countryName || "";
        location.locationAdmLevel1 = photographerServiceInformation.data.location.locationAdmLevel1 || "";
        location.locationAdmLevel2 = photographerServiceInformation.data.location.locationAdmLevel2 || "";
        location.locationMerge = photographerServiceInformation.data.location.locationMerge

        values.photoProfileUrl = userMetadata.photoProfileUrl || "";
        values.name = userMetadata.displayName || "";
        values.selfDescription = selfDescription || "";
        values.phoneNumber = userMetadata.phoneNumber || "";
        values.city.label = location.locationAdmLevel2 || "";
        values.city.value = location.locationAdmLevel2 || "";
        values.currency = currency;

        selected.languages = photographerServiceInformation.data.languages || [];

        this.setState({
          location,
          values,
          selected
        });
      }
    }
  }

  browsePhotoProfile = event => {
    event.preventDefault();
    this.imageSelectedAction(event.target.files[0]);
  };

  imageSelectedAction = fileObject => {
    let {values} = this.state;
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      values.fileImage = fileObject;
      values.photoProfileUrl = fileReader.result;
      this.setState({values});
    };
    fileReader.readAsDataURL(fileObject);
  };

  _handleNameChange = event => {
    const {values} = this.state;
    values.name = event.target.value;
    this.setState({values});
  };

  _handleSelfDescriptionChange = event => {
    const {values} = this.state;
    values.selfDescription = event.target.value;
    this.setState({values});
  };

  _handlePhoneNumberChange = event => {
    const {values} = this.state;
    values.phoneNumber = event.target.value;
    this.setState({values});
  };

  _handleSelectCountry = selectChoice => {
    const {location, values} = this.state;
    const {state: {currencies}} = this.props;

    if (selectChoice) {
      const currency = currencies[selectChoice.value];

      if (selectChoice.value !== location.country) {
        this._resetCity();
      }

      location.country = selectChoice.value;
      location.countryName = selectChoice.label
      location.continent = selectChoice.continent || "";

      values.currency = currency;

      this.setState({location, values});
    }
  };

  _resetCity = () => {
    const {location, values} = this.state

    location.locationAdmLevel1 = "";
    location.locationAdmLevel2 = "";
    location.locationMerge = "";

    values.city.label = "";
    values.city.value = "";

    values.currency = "";

    this.setState({
      cityOptions: [],
      location,
      values,
    });
  };

  _getCities = input => {
    if (!input) {
      return Promise.resolve({options: []});
    }

    const urlApi = `${process.env.REACT_APP_API_HOSTNAME}/api/cities/`;
    return fetch(
      `${urlApi}?countryCode=${this.state.location.country}&continent=${this.state.location
        .continent}&kwd=${input}`
    )
      .then(response => response.json())
      .then(results => {
        return {options: results.data};
      });
  };

  _handleSelectCity = selectChoice => {
    if (selectChoice) {
      const {location, values} = this.state;

      values.city.label = selectChoice.value;
      values.city.value = selectChoice.value;

      location.locationAdmLevel1 = selectChoice.adm1;
      location.locationAdmLevel2 = selectChoice.value;
      location.locationMerge = location.locationAdmLevel2 + ', ' + location.locationAdmLevel1 + ', ' + location.countryName;

      this.setState({
        location, values
      });
    }
  };

  _handleSelectLanguages = value => {
    const {selected} = this.state;
    const languages = value.map(item => item.value);
    selected.languages = languages;
    this.setState({selected});
  };

  handleUpdate = event => {
    event.preventDefault();
    const {
      photographerServiceInformation: {
        data: {
          userMetadata: {uid}
        }
      }
    } = this.props;

    const params = {state: this.state, uid};
    this.props.updateBasicInformation(params);
  };

  render() {
    const {state} = this.props;
    const {languages, location, selected, values} = this.state;

    return (
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}/>
          <Col sm={6}>
            <div id="profile-dragarea">
              <div
                id="filedrag-photo"
                className="center-block img-responsive">
                <div className="ph">
                  {values.photoProfileUrl && (
                    <img
                      src={values.photoProfileUrl}
                      className="center-block img-circle img-profile"
                      alt="This is alt text"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="browse-profile-holder" style={{marginTop: '10px'}}>
              <div className="browse-profile-btn">
                <span>Browse</span>
                <input
                  className="input-file choose-file"
                  id="btn-choose-profile"
                  type="file"
                  name=""
                  onChange={this.browsePhotoProfile}
                />
              </div>
              <div className="input-profile-name">
                {values.fileImage ? values.fileImage.name : 'Choose file'}
              </div>
            </div>
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
              value={location.country}
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
                location.country ? (
                  "Search and choose your city"
                ) : (
                  "Please select a country first"
                )
              }
              disabled={!location.country}
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
        <Button onClick={this.handleUpdate} style={{float: 'right'}} className="button">Update</Button>
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
