import React, { Component } from 'react';
import Select from 'react-select';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom';

import 'react-select/dist/react-select.css';
import Page from 'components/Page';

class PhotographerRegistrationStep3 extends Component {
  constructor(props) {
    super(props);
    this.countryCodeChangeHandler = this.countryCodeChangeHandler.bind(this);
  }

  countryCodeChangeHandler(value) {
    console.log('Selected: ', JSON.stringify(value));
  }

  render() {
    const options = [
      { value: 'Indonesia', label: 'Indonesia (+62)' },
      { value: 'Malaysia', label: 'Malaysia (+60)' },
      { value: 'Singapore', label: 'Singapore (+61)' },
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
                <Typeahead
                  id="phonenumber"
                  labelKey="value"
                  options={options}
                  placeholder="Choose a state..."
                />

                <br />
                <br />

                <Select
                  name="form-field-name"
                  value="one"
                  options={options}
                  onChange={this.countryCodeChangeHandler}
                />
                <div className="input-group">
                  <span className="input-group-addon">+62</span>
                  <input
                    type="text"
                    required="required"
                    className="form-control"
                    placeholder="Enter Your Phone Number"
                  />
                </div>
              </div>

              <Link
                to="/photographer-registration/finish"
                className="button next-btn"
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default PhotographerRegistrationStep3;
