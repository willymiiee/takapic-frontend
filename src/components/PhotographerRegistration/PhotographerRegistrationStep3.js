import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { uploadPhonenumber } from '../../store/actions/userInitProfileActions';

import 'react-select/dist/react-select.css';
import Page from 'components/Page';

class PhotographerRegistrationStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phonenumber_country_code: '',
      phonenumber: '',
    };

    this.submitDataHandler = this.submitDataHandler.bind(this);
    this.countryCodeChangeHandler = this.countryCodeChangeHandler.bind(this);
    this.phonumberChangeHandler = this.phonumberChangeHandler.bind(this);
  }

  submitDataHandler(evt) {
    evt.preventDefault();
    const phonenumber =
      this.state.phonenumber_country_code + this.state.phonenumber;
    this.props.uploadPhonenumber(phonenumber, this.props.user.email);
  }

  countryCodeChangeHandler(value) {
    this.setState({ phonenumber_country_code: value.value });
  }

  phonumberChangeHandler(evt) {
    evt.preventDefault();
    this.setState({ phonenumber: evt.target.value });
  }

  render() {
    const options = [
      { value: '+62', label: 'Indonesia (+62)' },
      { value: '+60', label: 'Malaysia (+60)' },
      { value: '+61', label: 'Singapore (+61)' },
    ];

    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-3">
            <div />
            <div />
            <div className="active" />
          </div>
          <hr />
          <div className="panel setup-content" id="step-3">
            <div className="panel-body">
              <h2 className="text-center">Confirm your phone number</h2>

              <img
                src="http://www.freeiconspng.com/uploads/mobile-phone-cell-icon-25.png"
                alt=""
                className="center-block"
              />
              <div className="form-group">
                <Select
                  name="form-field-name"
                  value={this.state.phonenumber_country_code}
                  options={options}
                  onChange={this.countryCodeChangeHandler}
                />
                <div className="input-group">
                  <span className="input-group-addon">+62</span>
                  <input
                    type="text"
                    onChange={this.phonumberChangeHandler}
                    value={this.state.phonenumber}
                    required="required"
                    className="form-control"
                    placeholder="Enter Your Phone Number"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={this.submitDataHandler}
                className="button next-btn"
              >
                {this.props.isUploadingPhoneNumber ? (
                  'Saving your phone number, please wait...'
                ) : (
                  'Next'
                )}
              </button>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default connect(
  state => ({
    user: state.userAuth,
    isUploadingPhoneNumber: state.userInitProfile.isUploadingPhoneNumber,
  }),
  dispatch => ({
    uploadPhonenumber: (phonenumber, email) =>
      dispatch(uploadPhonenumber(phonenumber, email)),
  })
)(PhotographerRegistrationStep3);
