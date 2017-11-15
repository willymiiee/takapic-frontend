import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMeetingPoint } from '../../store/actions/photographerServiceInfoActionsStep2';
import { dashify } from "../../helpers/helpers";

import MapWithASearchBox from './../MapWithASearchBox';
import Page from '../Page';

class Step2SetupMeetingPointA extends Component {
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

  handleSubmit = event => {
    event.preventDefault();
    let { meetingPoints } = this.state;
    if (meetingPoints.length < 1) {
      alert('Please create at least one meeting point. You cannot leave this empty');
      return false;
    } else {
      const {
        photographerServiceInfoStep2: { detailMasterPackage },
        user: {uid, email, userMetadata: { accountProviderType }},
        userInitProfile: { notAvailableDates }
      } = this.props;

      let { meetingPoints } = this.state;
      let packagesPrice = [];

      for (let key in detailMasterPackage) {
        if (detailMasterPackage.hasOwnProperty(key)) {
          let value = detailMasterPackage[key];
          packagesPrice = [
            ...packagesPrice,
            {
              packageName: value.packageName,
              price: value.price,
              requirement: value.requirement,
            },
          ];
        }
      }

      meetingPoints = meetingPoints.map(p => {
        return {
          lat: p.generalLocation.lat,
          long: p.generalLocation.long,
          meetingPointName: p.generalLocation.meetingPointName,
          placeLocationNotes: p.specificLocation,
          formattedAddress: p.generalLocation.formattedAddress
        };
      });

      let reference = '';
      if (accountProviderType === 'google.com') {
        reference = 'googlecom-' + uid;
      } else {
        reference = dashify(email);
      }

      const params = {
        reference,
        packagesPrice,
        meetingPoints,
        notAvailableDates
      };
      this.props.setMeetingPoint(params);
    }
  };

  handleAddition = params => {
    if (
      params.generalLocation &&
      params.specificLocation &&
      this.state.meetingPoints.length < 3
    ) {
      const { generalLocation, specificLocation } = params;
      let { meetingPoints } = this.state;
      meetingPoints = [...meetingPoints, { generalLocation, specificLocation }];
      this.setState({ meetingPoints });
    }
  };

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div />
            <div />
            <div className="active" />
            <div />
          </div>
          <hr />
          <h3>Please choose three different meeting points</h3>
          <div className="row">
            <div className="col-lg-12">
              {this.state.mapLoaded && (
                <MapWithASearchBox
                  handleAddition={this.handleAddition}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBrXtsaqVz4UqYExEyRaf9jv5sEPJqeke8&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              )}
            </div>
            <div className="col-lg-12 margin-top-15">
              <div className="container">
                <h3>Your Created Point</h3>
                {this.state.meetingPoints.map((p, key) => (
                  <div key={key}>
                    {/* ini list number meeting point */}
                    <div className="margin-top-30">
                      <button
                        type="button"
                        className="btn btn-primary btn-circle btn-lg"
                      >
                        {key + 1}
                      </button>
                      <div id="line-number">
                        <div
                          className="margin-left-20"
                          style={{ marginTop: '-8%' }}
                        >
                          <div
                            style={{
                              marginTop: '1%',
                              marginBottom: '-5%',
                              color: 'black',
                              fontSize: '16px',
                            }}
                          >
                            <b>{ p.generalLocation.meetingPointName }</b>
                          </div>

                          <br />

                          <div style={{ fontSize: '16px' }}>
                            {p.generalLocation.formattedAddress}
                          </div>

                          <div style={{ color: 'black', fontSize: '16px' }}>
                            <p style={{ fontWeight: 'bold', color: '#999999', textDecoration: 'underline' }}>
                              Place / location notes
                            </p>

                            <p style={{ margin: '-20px 0 0 0', padding: '0', color: '#999999' }}>
                              { p.specificLocation }
                              </p>
                          </div>

                          <div id="delete-button">
                            <button
                              className="delete-button"
                              onClick={event => {
                                let { meetingPoints } = this.state;
                                meetingPoints = [
                                  ...meetingPoints.slice(0, key),
                                  ...meetingPoints.slice(key + 1),
                                ];
                                this.setState({ meetingPoints });
                              }}
                            >
                              {' '}
                              <strong>x</strong>{' '}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr />
          <Link to="/become-our-photographer/step-2-2" className="button">
            Back
          </Link>

          <Link
            to="/become-our-photographer/step-2-4"
            className="button"
            onClick={this.handleSubmit}
          >
            Next
          </Link>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userAuth,
  photographerServiceInfoStep2: state.photographerServiceInfoStep2,
  userInitProfile: state.userInitProfile
});

const mapDispatchToProps = dispatch => ({
  setMeetingPoint: payload => dispatch(setMeetingPoint(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Step2SetupMeetingPointA)
);
