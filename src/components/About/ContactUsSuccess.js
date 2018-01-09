import React from 'react';

import Page from '../Page';

const ContactUsSuccess = (props) => (
  <Page>
    <div className="container" id="photographer-landing">
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
          <div
            className="text-center margin-top-60"
            style={{ fontSize: '1em' }}
          >
            <div style={{marginBottom:'20px'}}><i className="fa fa-check-circle fa-3x" /></div>
            <br/>
            Thanks!<br />
            Your question successfuly sent to our support team
          </div>
        </div>
      </div>
    </div>
  </Page>
);

export default ContactUsSuccess;
