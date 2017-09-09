import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

export default class Step2Welcome extends Component {
  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <div className="card margin-top-40">
                <h4><b>Hello, Hardi!</b></h4>
                <p>Let's start to make you a star Takapic photographer</p>
              </div>
              <div className="card margin-top-40">
                <h4><b>Step 1</b></h4>
                <p>Location, Short Descripton, Equipment, Language, Speciality</p>
                <button className="button button-white-no-shadow u" onclick="window.location='photographer-landing-1-1a.html'">Change</button>
              </div>
              <div className="card margin-top-40">
                <h4><b>Step 2</b></h4>
                <p>Pricing, Photos, Schedule, Preferred Meeting Points</p>
                <Link to="/become-our-photographer/step-2-1" className="button">Continue</Link>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
