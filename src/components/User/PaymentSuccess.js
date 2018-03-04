import React from 'react';

import Page from '../Page';

const PaymentSuccess = props => {
  return (
    <Page>
      <div
        className="container"
        id="sign-in-main-custom">
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
            <div className="panel card radius-0 padding-16">
              <div className="panel-body">
                <div className="mfp-content">
                  <div style={{ textAlign: 'center' }}>
                    <i className="fa fa-check" style={{ fontSize: '50px', color: '#3AECCB' }}/>
                    <h3 style={{ fontWeight: 'bold' }}>Thank you!</h3>
                    <p>
                      Your payment has been processed successfully.
                      <br />
                      We'll send you a confirmation email shortly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PaymentSuccess;
