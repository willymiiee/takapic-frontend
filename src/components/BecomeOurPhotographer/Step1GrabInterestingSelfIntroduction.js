import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

export default class StepGrabInterestingSelfIntroduction extends Component {
  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-3">
            <div />
            <div className="active" />
            <div />
          </div>
          <hr />
          <h3>Tell travellers something interesting about yourself</h3>
          <div className="row">
            <div className="col-sm-8 col-lg-6">
              <textarea defaultValue={''} />
            </div>
          </div>
          <hr />
          <Link
            to="/become-our-photographer/step-1-1"
            className="button button-white-no-shadow u"
          >
            Back
          </Link>
          <Link to="/become-our-photographer/step-1-3" className="button">
            Next
          </Link>
        </div>
      </Page>
    );
  }
}
