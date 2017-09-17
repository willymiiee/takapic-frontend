import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';
import { compose, lifecycle } from 'recompose';

export default compose(
  lifecycle({
    componentDidMount() {
      window.$(function() {
        window.$('.selectpicker').selectpicker();
      });
    },
  })
)(
  class PhotographerRegistrationStep3 extends Component {
    render() {
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
                  <select
                    id="phonenumber"
                    className="selectpicker form-control input-sm"
                  >
                    <option disabled="disabled" selected="selected" value="">
                      Choose country
                    </option>
                    <option value="">Indonesia (+62)</option>
                    <option value="">Malaysia (+60)</option>
                    <option value="">Singapore (+61)</option>
                  </select>
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
);
