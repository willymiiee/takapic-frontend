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
          <h3 className="margin-top-0">Cash Out</h3>

          <div className="cashout-container">
            <div className="amount-wrapper">
              <p>Amount</p>
              <div className="money-amount-currency-wrapper">
                <p>302</p>
                <p>USD</p>
              </div>
            </div>

            <div className="money-receiving-information-wrapper">
              <div className="payment-type-wrapper">
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="paymentTypes"
                    value="paypal"
                    checked={this.state.paymentType === 'paypal'}
                    onChange={this.selectPaymentTypeHandler}/> Paypal
                </label>

                <label className="radio-inline">
                  <input
                    type="radio"
                    name="paymentTypes"
                    value="bank"
                    checked={this.state.paymentType === 'bank'}
                    onChange={this.selectPaymentTypeHandler}/> Bank Account
                </label>
              </div>

              <div className="payment-type-input-info-wrapper">
                <form>
                  {
                    this.state.paymentType && this.state.paymentType === 'paypal'
                      ? (
                        <div className="type-paypal-account-wrapper">
                          <div className="type-paypal-account-input">
                            <div className="form-group">
                              <label>Paypal Email Account</label>
                              <input type="text" className="form-control"/>
                            </div>
                          </div>
                        </div>
                      )
                      : (
                        <div className="type-bank-account-wrapper">
                          <div className="type-bank-account-input">
                            <div className="form-group">
                              <label>Bank Name</label>
                              <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                              <label>Account Number</label>
                              <input type="text" className="form-control"/>
                            </div>
                          </div>
                        </div>
                      )
                  }

                  <div>
                    <button type="button" className="btn btn-default">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </UserAccountPanel>
      </Page>
    )
  }
}

export default CashOut;
