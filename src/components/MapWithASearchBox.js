import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import _ from 'lodash';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
const google = window.google;

const MapWithASearchBox = compose(
  withProps(),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: 41.9,
          lng: -87.624,
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(
            nextMarkers,
            '0.position',
            this.state.center
          );

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          this.setState({
            generalLocation: {
              lat: places[0].geometry.location.lat(),
              long: places[0].geometry.location.lng(),
              meetingPointName: places[0].name,
            },
          });
          // refs.map.fitBounds(bounds);
          console.log('ini place', places);
          console.log('ini bounds', bounds);
        },
        handleSpecificLocation: event => {
          this.setState({ specificLocation: event.target.value });
        },
        handleAddition: () => {
          const { generalLocation, specificLocation } = this.state;
          this.props.handleAddition({ generalLocation, specificLocation });
          document.getElementById('input1').value = '';
          document.getElementById('input2').value = '';
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <div id="meeting-points" style={{ position: 'absolute', top: 0 }}>
      <SearchBox
        key={1}
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          id="input1"
          type="text"
          placeholder="Place / location name"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `350px`,
            height: `32px`,
            marginTop: `8px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `16px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
      <SearchBox key={2} controlPosition={google.maps.ControlPosition.TOP_LEFT}>
        <div>
          <input
            id="input2"
            className="form-control"
            onChange={props.handleSpecificLocation}
            type="text"
            placeholder="Notes for this place / location"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `450px`,
              height: `32px`,
              marginTop: `8px`,
              marginLeft: `20px`,
              marginRight: `20px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `16px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </div>
      </SearchBox>
      <SearchBox key={3} controlPosition={google.maps.ControlPosition.TOP_LEFT}>
        <button
          onClick={props.handleAddition}
          to="/become-our-photographer/step-2-4"
          className="button"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            height: `32px`,
            marginTop: `8px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `15px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        >
          ADD +
        </button>
      </SearchBox>
      {props.markers.map((marker, index) => (
        <Marker key={index} position={marker.position} />
      ))}
    </div>
  </GoogleMap>
));

export default MapWithASearchBox;
