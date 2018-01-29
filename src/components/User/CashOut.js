import React, { Component } from 'react';

import Page from '../Page';
import UserAccountPanel from './UserAccountPanel';

class CashOut extends Component {
  constructor() {
    super();
    this.state = {
      paymentType: 'paypal'
    }
  }

  selectPaymentTypeHandler = (evt) => {
    this.setState({ paymentType: evt.target.value });
  };

  render() {
    return (
      <Page style={{whiteSpace:'normal'}}>
        <UserAccountPanel>
          <h3 className="margin-top-0" style={{marginTop:'20px'}}><strong>Cash Out</strong></h3>
          <form>
            <div className="row cashout-container">
              <div className="col-sm-4 cashout-amount m-margin-bottom-50">
                <p className="label-am">Amount</p>
                <p className="value">302</p>
                <p className="currency">USD</p>
              </div>

              <div className="col-sm-6 cashout-information m-margin-bottom-50">
                <div className="payment-type-wrapper">
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="paymentTypes"
                      value="paypal"
                      checked={this.state.paymentType === 'paypal'}
                      onChange={this.selectPaymentTypeHandler}/> Paypal
                  </label>
                  <label className="radio-inline" style={{marginLeft:'30px'}}>
                    <input
                      type="radio"
                      name="paymentTypes"
                      value="bank"
                      checked={this.state.paymentType === 'bank'}
                      onChange={this.selectPaymentTypeHandler}/> Bank Account
                  </label>
                </div>

                <div className="payment-type-input-info-wrapper">
                  {
                    this.state.paymentType && this.state.paymentType === 'paypal'
                      ? (
                        <div className="type-paypal-account-wrapper">
                          <div className="type-paypal-account-input">
                            <div className="form-group">
                              <label className="c-bold">Paypal Email Account</label>
                              <input type="text" className="form-control cashout-input w-100"/>
                            </div>
                          </div>
                        </div>
                      )
                      : (
                        <div className="type-bank-account-wrapper">
                          <div className="row type-bank-account-input">
                            <div className="col-xs-5 form-group">
                              <label className="c-bold">Bank Name</label>
                              <input type="text" className="form-control cashout-input w-100"/>
                            </div>
                            <div className="col-xs-7 form-group p-left-0">
                              <label className="c-bold">Account Number</label>
                              <input type="text" className="form-control cashout-input w-100"/>
                            </div>
                          </div>
                        </div>
                      )
                  }
                </div>
              </div>
              <div className="col-sm-2 cashout-btn-holder m-margin-bottom-50">
                <button type="button" className="btn cashout-btn">Cash Out</button>
              </div>
            </div>
          </form>
        </UserAccountPanel>
      </Page>
    )
  }
}

export default CashOut;
