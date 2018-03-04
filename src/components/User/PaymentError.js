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
                    <i className="fa fa-times" style={{ fontSize: '50px', color: 'red' }}/>
                    <h3 style={{ fontWeight: 'bold', color: 'red' }}>Our Apologize, Payment Failed</h3>
                    <p>
                      Unfortunately your payment failed.
                      <br />
                      Please contact us.
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
