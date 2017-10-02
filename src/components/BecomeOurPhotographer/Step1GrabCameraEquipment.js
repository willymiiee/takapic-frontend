import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from 'components/Page';
import './../../styles/react-selectize.css';
import { ReactSelectize, SimpleSelect, MultiSelect } from 'react-selectize';
import {
  Button,
  FormGroup,
  FormControl,
  InputGroup,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';

import { submitCameraEquipment } from '../../store/actions/photographerCameraEquipmentActions';

class Step1GrabCameraEquipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // cameraEquipment: {
      //   body: ['Nikon D5600', 'Canon 60D'],
      //   lens: [
      //     'Canon EF 50mm f/1.8 II Lens – f',
      //     'Canon EF 85mm f/1.8 USM Telephoto Lens',
      //   ],
      // },
      languages: ['English', 'Japanese'],
      speciality: ['Wedding', 'Snap'],
      selected: {
        bodies: [''],
        lenses: [''],
        languages: [],
        speciality: [],
      },
    };

    // this.nextStepHandler = this.nextStepHandler.bind(this);
  }

  handleAddMoreBody = () => {
    let { selected } = this.state;
    selected.bodies = [...selected.bodies, ''];
    this.setState({ selected });
  };

  handleAddMoreLense = () => {
    let { selected } = this.state;
    selected.lenses = [...selected.lenses, ''];
    this.setState({ selected });
  };

  handleBody = (event, index) => {
    const { selected } = this.state;
    selected.bodies[index] = event.target.value;
    this.setState({ selected });
  };

  handleLense = (event, index) => {
    const { selected } = this.state;
    selected.lenses[index] = event.target.value;
    this.setState({ selected });
  };

  handleLanguages = value => {
    const { selected } = this.state;
    const languages = value.map(item => item.value);
    selected.languages = languages;
    this.setState({ selected });
  };

  handleSpeciality = value => {
    const { selected } = this.state;
    const speciality = value.map(item => item.value);
    selected.speciality = speciality;
    this.setState({ selected });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { selected: { bodies, lenses, languages, speciality } } = this.state;
    if (
      this.notEmpty(bodies) &&
      this.notEmpty(lenses) &&
      this.notEmpty(languages) &&
      this.notEmpty(speciality)
    ) {
      const { user: { email } } = this.props;
      const params = {
        email,
        bodies: bodies.filter(b => b !== ''),
        lenses: lenses.filter(l => l !== ''),
        languages,
        speciality,
      };
      this.props.submitCameraEquipment(params);
    } else {
      alert('Please complete the form');
    }
  };

  notEmpty(arr) {
    return arr.length > 0;
  }

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-3">
            <div />
            <div />
            <div className="active" />
          </div>
          <hr />
          <h3>What camera equipment do you have?</h3>
          <div className="row">
            <div className="col-sm-2 col-md-1 padding-top-5">Body</div>
            <div className="col-sm-10 col-md-11 margin-bottom-15">
              {/* <select className="select2" multiple>
                <option>Nikon D5600</option>
                <option>Nikon D7500</option>
                <option>Nikon D7200</option>
                <option>Canon 60D</option>
                <option>Canon 70D</option>
                <option>Canon 80D</option>
              </select> */}
              {this.state.selected.bodies.map((item, key) => (
                <FormGroup key={key}>
                  <FormControl
                    type="text"
                    value={item}
                    onChange={event => this.handleBody(event, key)}
                  />
                </FormGroup>
              ))}
              <Button onClick={this.handleAddMoreBody}>Add More</Button>
            </div>
            <div className="col-sm-2 col-md-1 padding-top-5">Lens</div>
            <div className="col-sm-10 col-md-11 margin-bottom-15">
              {/* <select className="select2" multiple>
                <option>Canon EF 50mm f/1.8 II Lens – f</option>
                <option>Canon EF 85mm f/1.8 USM Telephoto Lens</option>
                <option>Canon EF 28mm f/1.8 USM Wide Angle Lens</option>
                <option>Nikon AF-S FX NIKKOR 50mm f/1.8G</option>
                <option>Nikon AF FX NIKKOR 28mm f/1.8G</option>
                <option>Sigma 17-50mm f/2.8 EX DC OS HSM FLD</option>
                <option>Sigma 10-20mm f/3.5 EX DC HSM</option>
                <option>Tamron Auto Focus 70-300mm f/4.0-5.6 Di LD</option>
              </select> */}
              {this.state.selected.lenses.map((item, key) => (
                <FormGroup key={key}>
                  <FormControl
                    type="text"
                    value={item}
                    onChange={event => this.handleLense(event, key)}
                  />
                </FormGroup>
              ))}
              <Button onClick={this.handleAddMoreLense}>Add More</Button>
            </div>
          </div>
          <h3>Language Spoken</h3>
          {/* <select className="select2" multiple>
            <option>English</option>
            <option>Korean</option>
            <option>Japanese</option>
            <option>Indonesian</option>
            <option>French</option>
          </select> */}
          <MultiSelect
            placeholder="Select your language"
            options={this.state.languages.map(item => ({
              label: item,
              value: item,
            }))}
            onValuesChange={this.handleLanguages}
          />
          <h3>Speciality</h3>
          {/* <select className="select2" multiple>
            <option>Wedding</option>
            <option>Portrait</option>
            <option>Couple</option>
            <option>Snap</option>
            <option>Glamour</option>
          </select> */}
          <MultiSelect
            placeholder="Select your speciality"
            options={this.state.speciality.map(item => ({
              label: item,
              value: item,
            }))}
            onValuesChange={this.handleSpeciality}
          />
          <hr />
          <Link
            to="/become-our-photographer/step-1-2"
            className="button button-white-no-shadow u"
          >
            Back
          </Link>
          <Link
            to="/become-our-photographer/welcome-2"
            className="button"
            onClick={this.handleSubmit}
          >
            Done
          </Link>
        </div>
      </Page>
    );
  }
}

export default connect(
  state => ({
    user: state.userAuth,
  }),
  dispatch => ({
    submitCameraEquipment: (email, password, displayName, userType) =>
      dispatch(submitCameraEquipment(email, password, displayName, userType)),
  })
)(Step1GrabCameraEquipment);
