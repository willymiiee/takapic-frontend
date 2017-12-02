import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MultiSelect } from 'react-selectize';
import {
  Button,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import { submitCameraEquipment } from '../../store/actions/photographerServiceInfoActions';

import './../../styles/react-selectize.css';
import Page from '../Page';

class Step1GrabCameraEquipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [
        'English', 'Thai', 'Vietnamese', 'Tagalog', 'Korean', 'Japanese', 'Mandarin', 'Burmese', 'Malay', 'Bahasa Indonesia',
        'Spanish', 'Portuguese', 'Russian', 'German', 'French', 'Italian', 'Turkish', 'Polish', 'Ukrainian', 'Romanian', 'Dutch',
        'Croatian', 'Hungarian', 'Greek', 'Czech', 'Swedish', 'Hindi', 'Arabic', 'Bengali', 'Punjabi', 'Tamil', 'Urdu', 'Gujarati', 'Persian'
      ],
      // speciality: ['Wedding', 'Snap'],
      selected: {
        bodies: [''],
        lenses: [''],
        languages: [],
        speciality: [],
      },
    };
  }

  handleAddMoreBody = () => {
    let {selected} = this.state;
    selected.bodies = [...selected.bodies, ''];
    this.setState({selected});
  };

  handleAddMoreLense = () => {
    let {selected} = this.state;
    selected.lenses = [...selected.lenses, ''];
    this.setState({selected});
  };

  handleBody = (event, index) => {
    const {selected} = this.state;
    selected.bodies[index] = event.target.value;
    this.setState({selected});
  };

  handleLense = (event, index) => {
    const {selected} = this.state;
    selected.lenses[index] = event.target.value;
    this.setState({selected});
  };

  handleLanguages = value => {
    const {selected} = this.state;
    const languages = value.map(item => item.value);
    selected.languages = languages;
    this.setState({selected});
  };

  /*handleSpeciality = value => {
      const {selected} = this.state;
      const speciality = value.map(item => item.value);
      selected.speciality = speciality;
      this.setState({selected});
  };*/

  handleSubmit = event => {
    event.preventDefault();
    const { selected: { bodies, lenses, languages, speciality } } = this.state;
    if (
      this.notEmpty(bodies) &&
      this.notEmpty(lenses) &&
      this.notEmpty(languages)
    ) {
      const {
        photographerServiceInfo: { location, selfDescription },
        user: { uid }
      } = this.props;

      const currency = location.currency;
      location.locationMerge = location.locationAdmLevel2 + ', ' + location.locationAdmLevel1 + ', ' + location.countryName;
      delete location.currency;

      const params = {
        reference: uid,
        bodies: bodies.filter(b => b !== ''),
        lenses: lenses.filter(l => l !== ''),
        languages,
        speciality,
        location,
        selfDescription,
        currency
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
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="card radius-0">
                <div className="steps steps-3">
                  <div/>
                  <div/>
                  <div className="active"/>
                </div>
                <hr/>
                <h3>What camera equipment do you have?</h3>
                <div style={{marginBottom: '70px'}}>
                  Body
                  {this.state.selected.bodies.map((item, key) => (
                    <FormGroup key={key}>
                      <FormControl
                        type="text"
                        value={item}
                        onChange={event => this.handleBody(event, key)}
                      />
                    </FormGroup>
                  ))}
                  <Button onClick={this.handleAddMoreBody} style={{float: 'right'}}>Add More</Button>
                </div>
                <div style={{marginBottom: '70px'}}>
                  Lens
                  {this.state.selected.lenses.map((item, key) => (
                    <FormGroup key={key}>
                      <FormControl
                        type="text"
                        value={item}
                        onChange={event => this.handleLense(event, key)}
                      />
                    </FormGroup>
                  ))}
                  <Button onClick={this.handleAddMoreLense} style={{float: 'right'}}>Add More</Button>
                </div>
                <hr/>
                <h3>Language Spoken</h3>
                <MultiSelect
                  placeholder="Select your language"
                  options={this.state.languages.map(item => ({
                    label: item,
                    value: item,
                  }))}
                  onValuesChange={this.handleLanguages}
                />

                {/*<h3>Speciality</h3>*/}

                {/*<MultiSelect
                    placeholder="Select your speciality"
                    options={this.state.speciality.map(item => ({
                        label: item,
                        value: item,
                    }))}
                    onValuesChange={this.handleSpeciality}
                />*/}
                <hr/>
                <div style={{overflow: 'hidden'}}>
                  <Link
                    to="/become-our-photographer/welcome-2"
                    className="button"
                    onClick={this.handleSubmit}
                    style={{float: 'right'}}
                  >
                    Done
                  </Link>

                  {/*<Link
                    to="/become-our-photographer/step-1-2"
                    className="button button-white-no-shadow u"
                    style={{float: 'right'}}
                  >
                    Back
                  </Link>*/}
                </div>
              </div>
            </div>
          </div>
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
