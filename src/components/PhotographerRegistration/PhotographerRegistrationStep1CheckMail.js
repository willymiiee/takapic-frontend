import React, { Component } from 'react';
import Page from 'components/Page';

class PhotographerRegistrationStep1CheckMail extends Component {
  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-3">
            <div className="active" />
            <div />
            <div />
          </div>

          <div className="panel setup-content" id="step-1">
            <div className="panel-body checkmail-wrapper">
              <div className="checkmail-icon">
                <i className="fa fa-envelope fa-3x" />
              </div>
              <a className="no_decoration" target="_blank" href="https://mail.google.com/" rel="noopener noreferrer">
                <h2 className="text-center">Check your email!</h2>
              </a>
              <div className="checkmail-text text-center">
                <p>Tap the link in the email we sent you.</p>
                <p>
                  Confirming your email address helps us send you trip
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
export default PhotographerRegistrationStep1CheckMail;
