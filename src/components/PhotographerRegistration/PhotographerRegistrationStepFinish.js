import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../Page';

const PhotographerRegistrationStepFinish = (props) => (
  <Page>
    <div className="container-fluid" id="photographer-landing-finish">
      <div className="row">
        <div id="success-page">
          <div className="wrapper">
            <div className="inner-wrapper text-center">
              <div className="text-wrapper">
                <div className="checkmail-icon">
                  <i className="fa fa-check-circle fa-3x" />
                </div>
                <h2>You're all set!</h2>
                <p>You can now start your work on Takapic</p>
                <Link
                  to="/become-our-photographer/welcome-1"
                  className="button key-color radius-5 width80"
                  type="button"
                >
                  Start Exploring
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Page>
);

export default PhotographerRegistrationStepFinish;
