import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from 'components/Page';
import { setMeetingPoint } from '../../store/actions/photographerServiceInfoActionsStep2';
import MapWithASearchBox from './../MapWithASearchBox';
/*
 * https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
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
    const {
      photographerServiceInfoStep2: { detailMasterPackage },
      user: { email },
    } = this.props;
    let { meetingPoints } = this.state;
    const n = detailMasterPackage;
    let packagesPrice = [];
    for (var key in n) {
      // check also if property is not inherited from prototype
      if (n.hasOwnProperty(key)) {
        var value = n[key];
        packagesPrice = [
          ...packagesPrice,
          {
            currency: value.currency,
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
        meetingPointName: `${p.generalLocation
          .meetingPointName}, ${p.specificLocation}`,
      };
    });
    const params = {
      email,
      packagesPrice,
      meetingPoints,
    };
    // Make sure that the params are complete
    // if (params.email && params.packagesPrice.length > 0 && params.meetingPoints.length === 3) {
    console.log(params);
    this.props.setMeetingPoint(params);
    // }
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
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0mVjfAwriCSsNcH8bng0Mi0-6ZR8kVZ0&v=3.exp&libraries=geometry,drawing,places"
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
                        <div className="margin-left-20">
                          {p.generalLocation.meetingPointName},{' '}
                          {p.specificLocation}
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
          <Link
            to="/become-our-photographer/step-2-2"
            className="button button-white-no-shadow u"
          >
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
});

const mapDispatchToProps = dispatch => ({
  setMeetingPoint: payload => dispatch(setMeetingPoint(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Step2SetupMeetingPointA)
);
