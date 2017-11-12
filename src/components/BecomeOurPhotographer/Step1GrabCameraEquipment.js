import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from '../Page';
import './../../styles/react-selectize.css';
import { ReactSelectize, MultiSelect } from 'react-selectize';
import {
  Button,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import { dashify } from "../../helpers/helpers";
import { submitCameraEquipment } from '../../store/actions/photographerServiceInfoActions';

class Step1GrabCameraEquipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: ['English', 'Japanese'],
      speciality: ['Wedding', 'Snap'],
      selected: {
        bodies: [''],
        lenses: [''],
        languages: [],
        speciality: [],
      },
    };
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
      const {
        photographerServiceInfo: { location, selfDescription },
        user: {
          uid,
          email,
          userMetadata: { accountProviderType }
        }
      } = this.props;

      location.locationMerge = location.locationAdmLevel2 + ', ' + location.locationAdmLevel1 + ', ' + location.countryName;

      let reference = '';
      if (accountProviderType === 'google.com') {
        reference = 'googlecom-' + uid;
      } else {
        reference = dashify(email);
      }

      const params = {
        reference,
        bodies: bodies.filter(b => b !== ''),
        lenses: lenses.filter(l => l !== ''),
        languages,
        speciality,
        location,
        selfDescription,
      };
      this.props.submitCameraEquipment(params);
    } else {
      alert('Please complete the form');
    }
  };

  notEmpty = arr => {
    return arr.length > 0;
  };

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
          <MultiSelect
            placeholder="Select your language"
            options={this.state.languages.map(item => ({
              label: item,
              value: item,
            }))}
            onValuesChange={this.handleLanguages}
          />
          <h3>Speciality</h3>
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
    photographerServiceInfo: state.photographerServiceInfo,
  }),
  dispatch => ({
    submitCameraEquipment: paramsObject => dispatch(submitCameraEquipment(paramsObject))
  })
)(Step1GrabCameraEquipment);
