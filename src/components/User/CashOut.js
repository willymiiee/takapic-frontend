import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import moment from 'moment';
import axios from 'axios';
import { database } from "../../services/firebase";

import Page from '../Page';
import UserAccountPanel from './UserAccountPanel';

class CashOut extends Component {
  constructor() {
    super();
    this.state = {
      cashoutRequests: [],
      paymentType: 'paypal',
      paypalEmail: '',
      bankName: '',
      bankAccountNumber: '',
      currentBalances: 0,
      amountTaken: 0,
      isUploading: false
    };
  }

  componentDidMount() {
    this.fetchCashOutRequests();
    this.fetchCurrentBalances();
  }

  fetchCurrentBalances() {
    database
      .database()
      .ref('user_metadata')
      .child(this.props.user.uid)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        this.setState({
          currentBalances: data.balances || 0,
          amountTaken: data.balances || 0
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchCashOutRequests() {
    database
      .database()
      .ref('cashout')
      .orderByChild('photographerId')
      .equalTo(this.props.user.uid)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          const rows = Object.keys(data).map((item) => data[item]);
          this.setState({ cashoutRequests: rows });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  checkRequiredInformation() {
    if (this.state.paymentType === 'paypal') {
      return this.state.paypalEmail !== '' && this.state.amountTaken > 0;
    } else if (this.state.paymentType === 'bank') {
      return this.state.bankName !== '' && this.state.bankAccountNumber !== '' && this.state.amountTaken > 0;
    }
  }

  createCashoutRequest() {
    return new Promise((resolve, reject) => {
      if (this.checkRequiredInformation()) {
        const {
          user: {
            uid,
            userMetadata: { displayName }
          }
        } = this.props;

        const newData = database
          .database()
          .ref('cashout')
          .push();

        newData
          .set({
            created: firebase.database.ServerValue.TIMESTAMP,
            updated: firebase.database.ServerValue.TIMESTAMP,
            status: 'REQUESTED',
            paymentType: this.state.paymentType,
            amount: this.state.amountTaken,
            paypalEmail: this.state.paypalEmail || '-',
            bankName: this.state.bankName || '-',
            bankAccountNumber: this.state.bankAccountNumber || '',
            photographerDisplayName: displayName,
            photographerId: uid
          })
          .then(() => resolve(true))
          .catch((error) => reject(error));

      } else {
        reject(new Error('Please complete all information required'));
      }
    });
  }

  updateBalances() {
    return new Promise((resolve, reject) => {
      database
        .database()
        .ref('user_metadata')
        .child(this.props.user.uid)
        .update({
          balances: this.state.currentBalances - this.state.amountTaken
        })
        .then(() => resolve(true))
        .catch((error) => reject(error));
    });
  }

  sendNotificationEmail() {
    return new Promise((resolve, reject) => {
      const {
        user: {
          uid,
          email,
          userMetadata: { displayName }
        }
      } = this.props;

      const date = moment().format('MMMM Do YYYY HH:mm A');

      const data = {
        REQUESTER: displayName,
        UID: uid,
        EMAIL: email,
        AMOUNT: this.state.amountTaken,
        PAYMENT_TYPE: this.state.paymentType,
        PAYPAL_EMAIL: this.state.paypalEmail,
        BANK_NAME: this.state.bankName,
        BANK_ACCOUNT_NUMBER: this.state.bankAccountNumber,
        CREATED: date
      };

      axios
        .post(process.env.REACT_APP_API_HOSTNAME + '/api/email-service/cashout-request', data)
        .then(() => resolve(true))
        .catch((error) => reject(error));
    });
  }

  submitCashOutRequestHandler = () => {
    this.setState({ isUploading: true });

    this.createCashoutRequest()
      .then(() => {
        this.updateBalances()
          .then(() => {
            this.sendNotificationEmail()
              .then(() => {
                this.setState({
                  isUploading: false,
                  paypalEmail: '',
                  bankName: '',
                  bankAccountNumber: ''
                });

                this.fetchCurrentBalances();
                this.fetchCashOutRequests();
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        this.setState({
          isUploading: false,
          paypalEmail: '',
          bankName: '',
          bankAccountNumber: ''
        });

        alert(error.message);
      });
  };

  selectPaymentTypeHandler = (evt) => {
    this.setState({
      paymentType: evt.target.value,
      paypalEmail: '',
      bankName: '',
      bankAccountNumber: ''
    });
  };

  amountTakenChangeHandler = (evt) => {
    const val = evt.target.value;
    if (val <= this.state.currentBalances) {
      if (val !== 0) {
        this.setState({ amountTaken: evt.target.value });
      }
    } else {
      alert(`Maximum cash out is ${this.state.currentBalances}`);
    }
  };

  paypalEmailChangeHandler = (evt) => {
    this.setState({ paypalEmail: evt.target.value });
  };

  bankNameChangeHandler = (evt) => {
    this.setState({ bankName: evt.target.value });
  };

  bankAccountNumberChangeHandler = (evt) => {
    this.setState({ bankAccountNumber: evt.target.value });
  };

  render() {
    return (
      <Page style={{whiteSpace:'normal'}}>
        <UserAccountPanel>
          <h3 className="margin-top-0" style={{marginTop:'20px'}}>
            <strong>Cash Out</strong>
          </h3>

          <form>
            <div className="row cashout-container">
              <div className="col-sm-4 cashout-amount m-margin-bottom-50">
                <p className="label-am">Amount</p>

                <input
                  type="text"
                  value={this.state.amountTaken}
                  onChange={this.amountTakenChangeHandler}
                  className="value"
                />

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
                              <input
                                type="text"
                                value={this.state.paypalEmail}
                                onChange={this.paypalEmailChangeHandler}
                                className="form-control cashout-input w-100"
                              />
                            </div>
                          </div>
                        </div>
                      )
                      : (
                        <div className="type-bank-account-wrapper">
                          <div className="row type-bank-account-input">
                            <div className="col-xs-5 form-group">
                              <label className="c-bold">Bank Name</label>
                              <input
                                type="text"
                                value={this.state.bankName}
                                onChange={this.bankNameChangeHandler}
                                className="form-control cashout-input w-100"
                              />
                            </div>

                            <div className="col-xs-7 form-group p-left-0">
                              <label className="c-bold">Account Number</label>
                              <input
                                type="text"
                                value={this.state.bankAccountNumber}
                                onChange={this.bankAccountNumberChangeHandler}
                                className="form-control cashout-input w-100"
                              />
                            </div>
                          </div>
                        </div>
                      )
                  }
                </div>
              </div>

              <div className="col-sm-2 cashout-btn-holder m-margin-bottom-50">
                <button
                  type="button"
                  onClick={this.submitCashOutRequestHandler}
                  className="btn cashout-btn"
                >
                  { this.state.isUploading ? 'Processing, Please wait...' : 'Cash Out' }
                </button>
              </div>
            </div>
          </form>

          <div style={{ marginTop: '50px' }}>
            <h3 className="margin-top-0" style={{marginTop:'20px'}}><strong>Cash out History</strong></h3>
            <div className="table-responsive no-border">
              <table className="table table-list-reservation">
                <tbody>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment type</th>
                  <th>Status</th>
                </tr>

                {
                  this.state.cashoutRequests && this.state.cashoutRequests.map((item, index) => {
                    const date = moment(item.created).format('MMMM Do YYYY HH:mm A');
                    return (
                      <tr key={index}>
                        <td>{ (index + 1) }</td>
                        <td>{ date }</td>
                        <td>{ item.amount }</td>
                        <td>{ item.paymentType }</td>
                        <td>{ item.status }</td>
                      </tr>
                    );
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </UserAccountPanel>
      </Page>
    )
  }
}

export default connect((state) => ({ user: state.userAuth }))(CashOut);
