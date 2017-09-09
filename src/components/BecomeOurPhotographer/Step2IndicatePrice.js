import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

export default class Step2IndicatePrice extends Component {
  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div className="active" />
            <div />
            <div />
            <div />
          </div>
          <hr />
          <h3>Please indicate your price for each package</h3>
          <div className="row">
            <div className="col-sm-7 margin-top-15 margin-bottom-30">...</div>
            <div className="col-sm-5 margin-top-15 margin-bottom-30">
              <div className="card tips">
                <b>About Pricing</b>
                <p>
                  Explanation about our packages and standardised pricing
                  policy. You can change it later.
                </p>
                <b>Tips for pricing</b>
                <p>Blah blah.</p>
              </div>
            </div>
          </div>
          <hr />
          <Link
            to="/become-our-photographer/welcome-2"
            className="button button-white-no-shadow u"
          >
            Back
          </Link>
          <Link to="/become-our-photographer/step-2-2" className="button">
            Next
          </Link>
        </div>
      </Page>
    );
  }
}
