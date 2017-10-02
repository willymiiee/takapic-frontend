import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

export default class Step2SetupMeetingPointB extends Component {
  componentDidMount() {
    /*window.$(function () {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: -25.363, lng: 131.044}
      });
    });*/
  }

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div />
            <div />
            <div />
            <div className="active" />
          </div>
          <hr />
          <h3>Please choose three different meeting points</h3>
          <div className="row">
            <div className="col-lg-7 margin-top-15 margin-bottom-30">
              <div id="meeting-points">
                <div>
                  <input type="text" />
                  <input type="text" />
                  <Link
                    to="/become-our-photographer/step-2-3a"
                    className="button"
                  >
                    Confirm
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5 margin-top-15 margin-bottom-30">
              <div id="map">Ada map disini</div>
            </div>
          </div>
          <hr />
          <Link
            to="/become-our-photographer/step-2-3b"
            className="button button-white-no-shadow u"
          >
            Back
          </Link>
          <Link to="/become-our-photographer/step-2-4" className="button">
            Done
          </Link>
        </div>
      </Page>
    );
  }
}
