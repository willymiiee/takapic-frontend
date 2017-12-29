import React, { Component } from "react";
import { connect } from 'react-redux';
import Select from "react-select";
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  InputGroup,
  ProgressBar
} from "react-bootstrap";
import size from 'lodash/size';
import isEqual from 'lodash/isEqual';
import axios from "axios/index";
import firebase from "firebase";
import sha1 from 'js-sha1';

import store from '../../store';
import { updateBasicInformation } from '../../store/actions/profileUpdateActions';
import { fetchPhotographerServiceInformation } from "../../store/actions/photographerServiceInfoActions";
import { database } from "../../services/firebase";

class BasicInformation extends Component {
  constructor() {
    super();
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
        phoneDialCode: "",
        phoneNumber: "",
        city: {
          label: "",
          value: ""
        },
        currency: "",
      },
      photoProfileUploadPercentage: 0,
      uploadSigned: false
    };
  }

  componentWillMount() {
    this.setLocalState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      this.setLocalState(nextProps);
      window.scrollTo(0, 0);
    }
  }

  setLocalState(props) {
    const { photographerServiceInformation: { data } } = props;

    if (size(data) < 3) {
      const { photographerServiceInformation: { data: { userMetadata } } } = props;
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
      } = props;

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
        values.phoneDialCode = userMetadata.phoneDialCode;
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
    let { values } = this.state;
    let fileReader = new FileReader();

    let urlUploadRequest = process.env.REACT_APP_CLOUDINARY_API_BASE_URL;
    urlUploadRequest += '/image/upload';

    const nowDateTime = Date.now();
    let signature = `public_id=${this.props.user.uid}`;
    signature += `&timestamp=${nowDateTime}`;
    signature += `&upload_preset=${process.env.REACT_APP_CLOUDINARY_PHOTO_PROFILE_PRESET}`;
    signature += process.env.REACT_APP_CLOUDINARY_API_SECRET;

    fileReader.onloadend = (evt) => {
      values.photoProfileUrl = evt.target.result;
      this.setState({ values });

      const formData = new FormData();
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PHOTO_PROFILE_PRESET);
      formData.append('public_id', this.props.user.uid);
      formData.append('timestamp', nowDateTime);
      formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
      formData.append('signature', sha1(signature));
      formData.append('file', fileObject);

      const uploadConfig = {
        onUploadProgress: (progressEvent) => {
          const percentageComplete = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          this.setState({ photoProfileUploadPercentage: percentageComplete });
        }
      };

      axios
        .post(urlUploadRequest, formData, uploadConfig)
        .then((response) => {
          database.auth().currentUser.updateProfile({
            photoURL: response.data.secure_url
          });

          database
            .database()
            .ref('user_metadata')
            .child(this.props.user.uid)
            .update({
              photoProfileUrl: response.data.secure_url,
              photoProfilePublicId: response.data.public_id,
              updated: firebase.database.ServerValue.TIMESTAMP
            });

          return response.data.secure_url;
        })
        .then((photoProfileUrl) => {
          values.photoProfileUrl = photoProfileUrl;
          this.setState({ values, uploadSigned: true, photoProfileUploadPercentage: 0  });
        })
        .catch((error) => {
          console.error('Catch error: ', error);
        });
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
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      const { values } = this.state;
      values.phoneNumber = event.target.value;
      this.setState({ values });
    }
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
      location.countryName = selectChoice.label;
      location.continent = selectChoice.continent || "";

      values.currency = currency;

      this.setState({location, values});
    }
  };

  _resetCity = () => {
    const {location, values} = this.state;

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
    selected.languages = value.map(item => item.value);
    this.setState({selected});
  };

  handleUpdate = event => {
    event.preventDefault();
    const {
      photographerServiceInformation: {
        data: { userMetadata: { uid } }
      }
    } = this.props;

    const params = { state: this.state, uid };
    store.dispatch({ type: "PROFILE_MANAGER_UPDATING_START" });
    this.props.updateBasicInformation(params)
      .then(() => {
        this.props.fetchPhotographerServiceInformation(uid);
        store.dispatch({ type: "PROFILE_MANAGER_UPDATING_SUCCESS" });
      });
  };

  render() {
    const {state} = this.props;
    const {languages, location, selected, values} = this.state;

    return (
      <Form>
        <FormGroup>
          <div id="profile-dragarea">
            <div
              id="filedrag-photo"
              className="center-block img-responsive">
              <div className="ph" style={{ position: 'relative', margin: '0 auto' }}>
                {
                  values.photoProfileUrl && (
                    <img
                      src={values.photoProfileUrl}
                      className="center-block img-circle img-profile"
                      alt="This is alt text"
                    />
                  )
                }

                {
                  this.state.photoProfileUploadPercentage > 0 && this.state.photoProfileUploadPercentage <= 100 && !this.state.uploadSigned
                    ? (
                      <ProgressBar
                        striped
                        bsStyle="success"
                        now={this.state.photoProfileUploadPercentage}
                        style={{
                          margin: '0 auto',
                          marginTop: '10px',
                          width: '100%'
                        }}
                      />
                    )
                    : null
                }
              </div>
            </div>
          </div>
          <div className="browse-profile-holder" style={{marginTop: '30px'}}>
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
        </FormGroup>
        <hr/>
        <FormGroup controlId="formHorizontalName">
            Name
            <FormControl
              style={{marginTop:'7px', paddingLeft:'10px', color:'#333'}}
              type="text"
              placeholder="Enter Your Name"
              value={values.name}
              onChange={this._handleNameChange}
            />
        </FormGroup>

        <FormGroup>
          Self Description
          <textarea
            name="selfDescription"
            style={{padding:'16px 10px',marginTop:'7px', color:'#333'}}
            placeholder="Enter Your Self Description"
            value={values.selfDescription}
            onChange={this._handleSelfDescriptionChange}
          />
        </FormGroup>

        <FormGroup controlId="formHorizontalPhoneNumber">
          Phone number
          <InputGroup>
            <InputGroup.Addon style={{ fontSize: '17px' }}>{ values.phoneDialCode }</InputGroup.Addon>
            <FormControl
              type="text"
              placeholder="Enter Your Phone Number"
              value={values.phoneNumber}
              onChange={this._handlePhoneNumberChange}
              style={{height:'47px', paddingLeft:'10px', color:'#333'}}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup controlId="formHorizontalCountry">
          Country
          <Select
            style={{marginTop:'7px'}}
            name="country"
            value={location.country}
            options={state.countries}
            clearable={false}
            onChange={this._handleSelectCountry}
          />
        </FormGroup>

        <FormGroup controlId="formHorizontalCity">
          City
          <Select.Async
            style={{marginTop:'7px'}}
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
        </FormGroup>

        <FormGroup controlId="formHorizontalLanguageSpoken">
          Language Spoken
          <Select
            className="line-height-minimum"
            style={{marginTop:'7px'}}
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
        </FormGroup>
        <hr/>
        <Button type="button" onClick={this.handleUpdate} style={{float: 'right'}} className="button">
          { this.props.profile.loading ? 'Updating... Please wait.' : 'Update' }
        </Button>
      </Form>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    updateBasicInformation: (paramsObject) => dispatch(updateBasicInformation(paramsObject)),
    fetchPhotographerServiceInformation: (uid) => dispatch(fetchPhotographerServiceInformation(uid))
  })
)(BasicInformation);
