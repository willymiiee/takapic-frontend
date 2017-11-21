import React, { Component } from 'react'
import Select from 'react-select';
import { Form, FormGroup, Col, ControlLabel, FormControl, Image } from 'react-bootstrap'
import {ReactSelectize, MultiSelect} from 'react-selectize';

export default class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [
        'English', 'Thai', 'Vietnamese', 'Tagalog', 'Korean', 'Japanese', 'Mandarin', 'Burmese', 'Malay', 'Bahasa Indonesia',
        'Spanish', 'Portuguese', 'Russian', 'German', 'French', 'Italian', 'Turkish', 'Polish', 'Ukrainian', 'Romanian', 'Dutch',
        'Croatian', 'Hungarian', 'Greek', 'Czech', 'Swedish', 'Hindi', 'Arabic', 'Bengali', 'Punjabi', 'Tamil', 'Urdu', 'Gujarati', 'Persian'
      ],
      speciality: ['Wedding', 'Snap'],
      selected: {
        bodies: [''],
        lenses: [''],
        languages: [],
        speciality: [],
      },
      countries: [],
      cities: [],
    };
  }

  render() {
    let { userMetadata } = this.props

    return (
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>

          </Col>
          <Col sm={6}>
            <Image src={userMetadata.photoProfileUrl} circle style={{width:150}} center/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="Enter Your Name" value={userMetadata.displayName} />
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
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={6}>
            <FormControl type="email" placeholder="Enter Your Email" value={userMetadata.email} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPhoneNumber">
          <Col componentClass={ControlLabel} sm={2}>
            Phone Number
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="Enter Your Phone Number" value={userMetadata.phoneNumber} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalCountry">
          <Col componentClass={ControlLabel} sm={2}>
            Country
          </Col>
          <Col sm={6}>
            <Select
              name="country"
              options={this.props.countries}
              clearable={false}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalCity">
          <Col componentClass={ControlLabel} sm={2}>
            City
          </Col>
          <Col sm={6}>
            <Select
              name="city"
              options={this.props.cities}
              clearable={false}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalLanguageSpoken">
          <Col componentClass={ControlLabel} sm={2}>
            Language Spoken
          </Col>
          <Col sm={6}>
            <MultiSelect
                placeholder="Select your language"
                options={this.state.languages.map(item => ({
                    label: item,
                    value: item,
                }))}
                onValuesChange={this.handleLanguages}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalSpecialities">
          <Col componentClass={ControlLabel} sm={2}>
            Specialities
          </Col>
          <Col sm={6}>
            <MultiSelect
                placeholder="Select your speciality"
                options={this.state.speciality.map(item => ({
                    label: item,
                    value: item,
                }))}
                onValuesChange={this.handleSpeciality}
            />
          </Col>
        </FormGroup>

      </Form>
    );
  }
}
