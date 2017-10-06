import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from 'components/Page';
import { setMeetingPoint } from '../../store/actions/photographerServiceInfoActionsStep2';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/places/SearchBox';

const google = window.google;

const TakeMeetingPoint = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder={`Which city do you live in?`}
      inputStyle={{
        zIndex: 9999999,
      }}
    />
  </GoogleMap>
));
/*
 * https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
class Step2SetupMeetingPointA extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const {
      photographerServiceInfoStep2: { detailMasterPackage },
      user: { email },
    } = this.props;
    const n = detailMasterPackage;
    let packagesPrice = [];

    for (let key in n) {
      // check also if property is not inherited from prototype
      if (n.hasOwnProperty(key)) {
        let value = n[key];
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
    const params = {
      email,
      packagesPrice,
    };
    this.props.setMeetingPoint(params);
  };

  handleMapMounted = map => {
    this.mapRef = map;
    if (this.props.places && this.mapRef) {
      this.setBounds(this.props.places);
    }
  };

  handleSearchBoxMounted = searchBox => {
    this.searchBoxRef = searchBox;
  };

  handleBoundsChanged = () => {
    this.props.dispatch({
      type: 'BECOME_OUR_PHOTOGRAPHER_BOUNDS_CHANGED',
      payload: {
        bounds: this.mapRef.getBounds(),
        center: this.mapRef.getCenter(),
      },
    });
  };

  handlePlacesChanged = () => {
    this.props.dispatch({
      type: 'BECOME_OUR_PHOTOGRAPHER_PLACES_CHANGED',
      payload: this.setBounds(this.searchBoxRef.getPlaces()),
    });
  };

  setBounds(places) {
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      place.geometry.viewport
        ? bounds.union(place.geometry.viewport)
        : bounds.extend(place.geometry.location);
    });

    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    const center = markers.length > 0 ? markers[0].position : this.props.center;
    this.mapRef.fitBounds(bounds);
    return {
      places,
      center,
      markers,
    };
  }

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
              <div id="meeting-points">
                <div>
                  <input type="text" />
                  <input type="text" />
                  <Link
                    to="/become-our-photographer/step-2-4"
                    className="button"
                  >
                    Add +
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-12 margin-top-15">
              <TakeMeetingPoint
                containerElement={<div style={{ height: 480 }} />}
                mapElement={<div style={{ height: 480 }} />}
                center={this.props.center}
                onMapMounted={this.handleMapMounted}
                onBoundsChanged={this.handleBoundsChanged}
                onSearchBoxMounted={this.handleSearchBoxMounted}
                bounds={this.props.bounds}
                onPlacesChanged={this.handlePlacesChanged}
                markers={this.markers}
              />
              <div className="container">
                <h3>Your Created Point</h3>
                <div>
                  {/* ini list number meeting point */}
                  <div className="margin-top-30">
                    <button
                      type="button"
                      className="btn btn-primary btn-circle btn-lg"
                    >
                      1
                    </button>
                    <div id="line-number">
                      <div className="margin-left-20">
                        ini alamatnya
                        <div id="delete-button">
                          <button className="delete-button">
                            {' '}
                            <strong>x</strong>{' '}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  Step2SetupMeetingPointA
);
