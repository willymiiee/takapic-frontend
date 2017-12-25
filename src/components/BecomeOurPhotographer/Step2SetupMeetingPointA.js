import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';
import get from 'lodash/get';
import uuidv4 from 'uuid/v4';
import { database } from "../../services/firebase";

import MapWithASearchBox from './../MapWithASearchBox';
import Page from '../Page';

class Step2SetupMeetingPointA extends Component {
  constructor() {
    super();
    this.state = {
      meetingPoints: [],
      isUploading: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isUploading: true });

    if (this.state.meetingPoints.length < 1) {
      this.setState({ isUploading: false });
      alert('Please create at least one meeting point. You cannot leave this empty');
      return false;

    } else {
      const newData = this.state.meetingPoints.map(p => {
        return {
          id: uuidv4(),
          lat: p.generalLocation.lat,
          long: p.generalLocation.long,
          meetingPointName: p.generalLocation.meetingPointName,
          placeLocationNotes: p.specificLocation || '-',
          formattedAddress: p.generalLocation.formattedAddress
        };
      });

      database
        .database()
        .ref('photographer_service_information')
        .child(this.props.user.uid)
        .update({
          meetingPoints: newData,
          updated: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
          this.setState({ isUploading: false });
        })
        .then(() => {
          this.props.history.push('/become-our-photographer/step-2-4')
        })
        .catch((error) => {
          this.setState({ isUploading: false });
          console.log(error)
        });
    }
  };

  handleAddition = params => {
    const generalLocation = get(params, 'generalLocation');
    const specificLocation = get(params, 'specificLocation', '-');

    if (generalLocation && this.state.meetingPoints.length < 3) {
      const meetingPoints = [ ...this.state.meetingPoints, { generalLocation, specificLocation } ];
      this.setState({ meetingPoints });
    }
  };

  handleDeleteMeetingPointItem = (evt, key) => {
    evt.preventDefault();

    let { meetingPoints } = this.state;
    meetingPoints = [
      ...meetingPoints.slice(0, key),
      ...meetingPoints.slice(key + 1),
    ];
    this.setState({meetingPoints});
  };

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div/>
            <div/>
            <div className="active"/>
            <div/>
          </div>

          <br/>

          <div className="row">
            <div className="col-md-8">
              <h4>Please choose three different meeting points</h4>
              <hr/>
              <MapWithASearchBox handleAddition={this.handleAddition}/>
            </div>

            <div className="col-md-4 create-point-wrapper">
              <h4>Your Created Point</h4>
              <hr/>
              {
                this.state.meetingPoints.map((p, key) => (
                  <div key={key}>
                    <div className="row">
                      <div className="number-of-meetpoint col-xs-2">
                        { key + 1 }
                      </div>

                      <div className="detail-of-meetpoint col-xs-8">
                        <stong>{p.generalLocation.meetingPointName}</stong>
                        <p>{p.generalLocation.formattedAddress}</p>
                        <h6>{p.specificLocation}</h6>
                      </div>

                      <button
                        className="delete-button col-xs-2"
                        onClick={(evt) => this.handleDeleteMeetingPointItem(evt, key)}
                      >
                        <i className="fa fa-close"/>
                      </button>
                    </div>
                    <hr/>
                  </div>
                ))
              }
            </div>

            <div style={{ clear: 'both' }}/>

          </div>

          <div style={{ marginTop: '60px' }}>
            <hr />
            <button
              type="button"
              className="button"
              onClick={(evt) => !this.state.isUploading ? this.handleSubmit(evt) : false}
              style={{float: 'right'}}
              disabled={this.state.isUploading}
            >
              { this.state.isUploading ? 'Processing...' : 'Next' }
            </button>

            {/*<Link
              style={{float: 'right'}}
              to="/become-our-photographer/step-2-2" className="button">
              Back
            </Link>*/}
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userAuth
});

export default connect(mapStateToProps)(Step2SetupMeetingPointA);
