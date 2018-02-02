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
import axios from "axios/index";
import firebase from "firebase";
import sha1 from 'js-sha1';
import { Formik } from 'formik';

import { fetchPhotographerServiceInformation } from "../../store/actions/photographerServiceInfoActions";
import { database } from "../../services/firebase";

const BasicInformationForm = (props) => {
  const {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    languages,
    photoProfileUrl,
    countries,
    currencies,
    newPhotoProfile: {
      fileName: newPhotoProfileFileName,
      preview: newPhotoProfilePreview,
      uploadedPercentage
    },
    browsePhotoProfile,
    uploadSigned
  } = props;

  const city = values.locationAdmLevel2 ? { value: values.locationAdmLevel2, label: values.locationAdmLevel2 } : null;

  const _selectLanguagesHandle = (value) => {
    setFieldValue('languagesSelected', value.map(item => item.value));
  };

  const _selectCountryHandle = (selectChoice) => {
    if (selectChoice) {
      setFieldValue('country', selectChoice.value);
      setFieldValue('countryName', selectChoice.label);
      setFieldValue('continent', selectChoice.continent || '');
      setFieldValue('currency', currencies[selectChoice.value]);
      setFieldValue('phoneDialCode', selectChoice.phoneDialCode);
    }
  };

  const _selectCityHandle = (selectChoice) => {
    if (selectChoice) {
      setFieldValue('locationAdmLevel1', selectChoice.adm1);
      setFieldValue('locationAdmLevel2', selectChoice.value);
    }
  };

  const _getCities = (input) => {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    let urlApi = `${process.env.REACT_APP_API_HOSTNAME}/api/cities/`;
    urlApi += `?countryCode=${values.country}`;
    urlApi += `&continent=${values.continent}`;
    urlApi += `&kwd=${input}`;

    return fetch(urlApi)
      .then(response => response.json())
      .then(results => {
        return { options: results.data };
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <div id="profile-dragarea">
          <div
            id="filedrag-photo"
            className="center-block img-responsive">
            <div className="ph" style={{ position: 'relative'}}>
              {
                newPhotoProfilePreview
                  ? (
                    <img
                      src={newPhotoProfilePreview}
                      className="img-circle img-profile"
                      alt="This is alt text"
                    />
                  )
                  : (
                    <img
                      src={photoProfileUrl}
                      className="img-circle img-profile"
                      alt="This is alt text"
                    />
                  )
              }

              {
                uploadedPercentage > 0 && uploadedPercentage <= 100 && !uploadSigned
                  ? (
                    <ProgressBar
                      striped
                      bsStyle="success"
                      now={uploadedPercentage}
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

        <div className="browse-profile-holder new-version-browse-profile" style={{marginTop: '30px', display:'flex'}}>
          <div className="browse-profile-btn">
            <span>Browse</span>
            <i className="fa fa-pencil key-color" aria-hidden="true"/>
            <input
              className="input-file choose-file"
              id="btn-choose-profile"
              type="file"
              name=""
              onChange={browsePhotoProfile}
            />
          </div>

          <div className="input-profile-name">
            { newPhotoProfileFileName || 'Choose file' }
          </div>
        </div>
      </FormGroup>

      <hr/>

      <FormGroup controlId="formHorizontalName">
        Name
        <FormControl
          name="displayName"
          value={values.displayName}
          type="text"
          placeholder="Enter Your Name"
          onChange={handleChange}
          style={{marginTop:'7px', paddingLeft:'10px', color:'#333'}}
        />
      </FormGroup>

      <FormGroup>
        Self Description
        <textarea
          name="selfDescription"
          value={values.selfDescription}
          onChange={handleChange}
          placeholder="Enter Your Self Description"
          style={{padding:'16px 10px',marginTop:'7px', color:'#333'}}
        />
      </FormGroup>

      <FormGroup controlId="formHorizontalCountry">
        Country
        <Select
          name="country"
          value={values.country}
          options={countries}
          clearable={false}
          onChange={_selectCountryHandle}
          style={{marginTop:'7px'}}
        />
      </FormGroup>

      <FormGroup controlId="formHorizontalCity">
        City
        <Select.Async
          multi={false}
          value={city}
          onChange={_selectCityHandle}
          valueKey="value"
          labelKey="label"
          loadOptions={_getCities}
          placeholder={values.country ? "Search and choose your city" : "Please select a country first"}
          disabled={!values.country}
          filterOption={() => (true)}
          style={{marginTop:'7px'}}
        />
      </FormGroup>

      <FormGroup controlId="formHorizontalPhoneNumber">
        Phone number
        <InputGroup>
          <InputGroup.Addon style={{ fontSize: '17px' }}>
            { values.phoneDialCode }
          </InputGroup.Addon>

          <FormControl
            name="phoneNumber"
            value={values.phoneNumber}
            type="text"
            placeholder="Enter Your Phone Number"
            onChange={handleChange}
            style={{height:'47px', paddingLeft:'10px', color:'#333'}}
          />
        </InputGroup>
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
          value={values.languagesSelected}
          onChange={_selectLanguagesHandle}
        />
      </FormGroup>

      <hr/>

      <Button type="submit" style={{float: 'right'}} className="button">
        Update
      </Button>
    </Form>
  );
};

const BasicInformationFormik = Formik({
  mapPropsToValues: (props) => {
    const {
      photographerServiceInformation: {
        data: {
          userMetadata: { displayName, phoneDialCode, currency, phoneNumber },
          location: { country, locationAdmLevel1, locationAdmLevel2, countryName },
          selfDescription,
          languages: languagesSelected
        }
      }
    } = props;

    return {
      displayName,
      selfDescription,
      phoneNumber,
      languagesSelected,
      country,
      countryName,
      continent: '',
      phoneDialCode,
      currency,
      locationAdmLevel1,
      locationAdmLevel2
    };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);
  }
})(BasicInformationForm);

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
      newPhotoProfile: {
        fileName: null,
        preview: null,
        uploadedPercentage: 0
      },
      photoProfileUrl: null,
      uploadSigned:false
    };
  }

  componentWillMount() {
    const {
      photographerServiceInformation: {
        data: {
          userMetadata: { photoProfileUrl }
        }
      }
    } = this.props;
    this.setState({ photoProfileUrl });
  }

  browsePhotoProfile = (event) => {
    event.preventDefault();
    this.uploadSelectedImage(event.target.files[0]);
  };

  uploadSelectedImage = (fileObject) => {
    let fileReader = new FileReader();
    let urlUploadRequest = process.env.REACT_APP_CLOUDINARY_API_BASE_URL;
    urlUploadRequest += '/image/upload';

    const nowDateTime = Date.now();
    let signature = `public_id=${this.props.user.uid}`;
    signature += `&timestamp=${nowDateTime}`;
    signature += `&upload_preset=${process.env.REACT_APP_CLOUDINARY_PHOTO_PROFILE_PRESET}`;
    signature += process.env.REACT_APP_CLOUDINARY_API_SECRET;

    fileReader.onloadend = (evt) => {
      this.setState({
        newPhotoProfile: {
          ...this.state.newPhotoProfile,
          fileName: fileObject.name,
          preview: evt.target.result
        }
      });

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
          this.setState({
            newPhotoProfile: {
              ...this.state.newPhotoProfile,
              uploadedPercentage: percentageComplete
            }
          });
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
        .then((ppUrl) => {
          this.setState({
            photoProfileUrl: ppUrl,
            uploadSigned: true,
            newPhotoProfile: {
              ...this.state.newPhotoProfile,
              uploadedPercentage: 0
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fileReader.readAsDataURL(fileObject);
  };

  render() {
    return (
      <BasicInformationFormik
        { ...this.state }
        photographerServiceInformation={this.props.photographerServiceInformation}
        countries={this.props.countries}
        currencies={this.props.currencies}
        browsePhotoProfile={this.browsePhotoProfile}
      />
    );
  }
}

export default connect(
  null,
  dispatch => ({
    fetchPhotographerServiceInformation: (uid) => dispatch(fetchPhotographerServiceInformation(uid))
  })
)(BasicInformation);
