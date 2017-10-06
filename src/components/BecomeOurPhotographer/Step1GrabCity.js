import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import SearchBox from 'react-google-maps/lib/components/places/SearchBox';

const google = window.google;

const GrabCitySearchBox = withGoogleMap(props => (
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
export default connect(state => state.photographerServiceInfo.location)(
  class SearchBoxExample extends Component {
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

      const center =
        markers.length > 0 ? markers[0].position : this.props.center;
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
            <div className="steps steps-3">
              <div className="active" />
              <div />
              <div />
            </div>
            <hr />
            <h3>Which city do you live in?</h3>
            <div className="row">
              <div className="col-sm-12">
                <GrabCitySearchBox
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
              </div>
            </div>
            <hr />
            <Link
              to="/become-our-photographer/welcome-1"
              className="button button-white-no-shadow u"
            >
              Back
            </Link>
            <Link to="/become-our-photographer/step-1-2" className="button">
              Next
            </Link>
          </div>
        </Page>
      );
    }
  }
);
