import React, { Component } from 'react'
import { Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap'
import get from 'lodash/get';

import MapWithASearchBox from './../MapWithASearchBox'

export default class MeetingPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingPoints: [],
      mapLoaded: false,
    };
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  handleAddition = params => {
    const generalLocation = get(params, 'generalLocation');
    const specificLocation = get(params, 'specificLocation', '-');

    if (generalLocation && this.state.meetingPoints.length < 3) {
      const meetingPoints = [...this.state.meetingPoints, { generalLocation, specificLocation }];
      this.setState({ meetingPoints });
    }
  };

  render() {

    return (
      <div className="row">
        <div className="col-md-8">
          <h4>Please choose three different meeting points</h4>
          {
            this.state.mapLoaded && (
              <MapWithASearchBox
                handleAddition={this.handleAddition}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBrXtsaqVz4UqYExEyRaf9jv5sEPJqeke8&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
              />)
          }
        </div>

        <div className="col-md-4">
          <h4>Your Created Point</h4>
          <hr/>
          {
            this.state.meetingPoints.map((p, key) => (
              <div key={key}>
                {/* ini list number meeting point */}
                <div className="row">
                  <div className="number-of-meetpoint col-xs-2">{key + 1}</div>
                  <div className="detail-of-meetpoint col-xs-8">
                    <stong>{p.generalLocation.meetingPointName}</stong>
                    <p>{p.generalLocation.formattedAddress}</p>
                    <h6>{p.specificLocation}</h6>
                  </div>
                  <button
                    className="delete-button col-xs-2"
                    onClick={event => {
                      let {meetingPoints} = this.state;
                      meetingPoints = [
                        ...meetingPoints.slice(0, key),
                        ...meetingPoints.slice(key + 1),
                      ];
                      this.setState({meetingPoints});
                    }}>
                    <i className="fa fa-close"/>
                  </button>
                </div>
                <hr/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
