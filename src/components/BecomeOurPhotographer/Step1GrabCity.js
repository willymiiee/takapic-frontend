import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

export default class StepGrabCity extends Component {
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
            <div className="col-sm-5">
              <input name="city" type="text" />
            </div>
            <div className="col-sm-7">
              <div id="map" />
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
