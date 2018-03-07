import React, { Component } from 'react';
import qs from 'query-string';
import { database } from "../../services/firebase";
import { RESERVATION_PAID } from "../../services/userTypes";

import Page from '../Page';

class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
    const queryParams = qs.parse(props.location.search);
    const orderId = queryParams ? queryParams.order_id : null;
    this.state = {
      reservationId: orderId,
      isFinishingPayment: true
    };
  }

  componentDidMount() {
    if (this.state.reservationId) {
      database
        .database()
        .ref('reservations')
        .child(this.state.reservationId)
        .update({ status: RESERVATION_PAID })
        .then(() => {
          this.setState({ isFinishingPayment: false })
        });
    }
  }

  render() {
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
                    {
                      this.state.isFinishingPayment
                        ? (
                          <div style={{ textAlign: 'center' }}>
                            <img
                              src="https://res.cloudinary.com/debraf3cg/image/upload/v1519392755/temp/loading-1.gif"
                              alt="yeyyy"
                            />
                            <p>
                              Finishing your payment.<br />
                              Please wait, Do not reload browser or navigating to other pages.
                            </p>
                          </div>
                        )
                        : (
                          <div style={{ textAlign: 'center' }}>
                            <i className="fa fa-check" style={{ fontSize: '50px', color: '#3AECCB' }}/>
                            <h3 style={{ fontWeight: 'bold' }}>Thank you!</h3>
                            <p>
                              Your payment has been processed successfully.
                              <br />
                              We'll send you a confirmation email shortly.
                            </p>
                          </div>
                        )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default PaymentSuccess;
