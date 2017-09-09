import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

export default class Step2SetupMeetingPointA extends Component {
  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div /><div /><div /><div className="active" />
          </div>
          <hr />
          <h3>Please choose three different meeting points</h3>
          <div className="row">
            <div className="col-lg-7 margin-top-15 margin-bottom-30">
              <div id="meeting-points">
                <div>
                  <input type="text" />
                  <input type="text" />
                  <Link to="/become-our-photographer/step-2-4b" className="button">Confirm</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5 margin-top-15 margin-bottom-30">
              <div className="card tips">
                <b>Why important to set the meeting points</b>
                <p>The information will be shown to the costumers when they book.</p>
                <b>Tips for setting meeting points</b>
                <p>Blah blah.</p>
              </div>
            </div>
          </div>
          <hr />
          <Link to="/become-our-photographer/step-2-3" className="button button-white-no-shadow u">Back</Link>
          <Link to="/become-our-photographer/step-2-5" className="button">Done</Link>
        </div>
      </Page>
    );
  }
}
