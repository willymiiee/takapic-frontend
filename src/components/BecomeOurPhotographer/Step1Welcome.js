import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

export default class StepWelcome extends Component {
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
                <Link to="/become-our-photographer/step-1-1" className="button">Continue</Link>
              </div>
              <div className="card margin-top-40">
                <h4><b>Step 2</b></h4>
                <p>Pricing, Photos, Schedule, Preferred Meeting Points</p>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
