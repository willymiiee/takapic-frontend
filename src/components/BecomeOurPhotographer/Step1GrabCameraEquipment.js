import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Select, { Creatable } from 'react-select';
import firebase from 'firebase';
import { database } from "../../services/firebase";

import Page from '../Page';

class Step1GrabCameraEquipment extends Component {
  constructor() {
    super();
    this.state = {
      languages: [
        'English', 'Thai', 'Vietnamese', 'Tagalog', 'Korean', 'Japanese', 'Mandarin', 'Burmese', 'Malay', 'Bahasa Indonesia',
        'Spanish', 'Portuguese', 'Russian', 'German', 'French', 'Italian', 'Turkish', 'Polish', 'Ukrainian', 'Romanian', 'Dutch',
        'Croatian', 'Hungarian', 'Greek', 'Czech', 'Swedish', 'Hindi', 'Arabic', 'Bengali', 'Punjabi', 'Tamil', 'Urdu', 'Gujarati', 'Persian'
      ],
      selectedLanguages: [],
      selectedCameraBodies: [],
      selectedCameraLens: [],
      isUploading: false
    }
  }

  selectLanguagesChangeHandler = (value) => {
    this.setState({ selectedLanguages: value });
  };

  selectCameraBodiesChangeHandler = (value) => {
    this.setState({ selectedCameraBodies: value });
  };

  selectCameraLensChangeHandler = (value) => {
    this.setState({ selectedCameraLens: value });
  };

  submitDataHandler = () => {
    if (
      this.state.selectedCameraBodies.length > 0 &&
      this.state.selectedCameraLens.length > 0 &&
      this.state.selectedLanguages.length > 0
    ) {

      this.setState({ isUploading: true });

      database
        .database()
        .ref('photographer_service_information')
        .child(this.props.user.uid)
        .update({
          cameraEquipment: {
            body: this.state.selectedCameraBodies.map((item) => item.value),
            lens: this.state.selectedCameraLens.map((item) => item.value)
          },
          languages: this.state.selectedLanguages.map((item) => item.value),
          updated: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
          this.setState({ isUploading: false });
          this.props.history.push('/become-our-photographer/welcome-2');
        });

    } else {
      alert('Please complete the information');
    }
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

                <h3 style={{fontWeight:'bold',marginBottom:'24px'}}>What camera equipment do you have?</h3>

                <div style={{marginBottom: '70px'}}>
                  Body
                  <Creatable
                    multi={true}
                    options={[]}
                    value={this.state.selectedCameraBodies}
                    onChange={this.selectCameraBodiesChangeHandler}
                  />
                </div>

                <div style={{marginBottom: '70px'}}>
                  Lens
                  <Creatable
                    multi={true}
                    options={[]}
                    value={this.state.selectedCameraLens}
                    onChange={this.selectCameraLensChangeHandler}
                  />
                </div>

                <hr/>

                <h3>Language Spoken</h3>

                <Select
                  multi={true}
                  options={this.state.languages.map(item => ({
                    label: item,
                    value: item,
                  }))}
                  value={this.state.selectedLanguages}
                  onChange={this.selectLanguagesChangeHandler}
                />

                <hr/>
                <button
                  type="button"
                  className="button key-color radius-5 width1 margin-top-40 margin-bottom-15"
                  onClick={this.submitDataHandler}
                >
                  { this.state.isUploading ? 'Processing...' : 'Done' }
                </button>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default withRouter(
  connect(state => ({ user: state.userAuth }))(Step1GrabCameraEquipment)
);
