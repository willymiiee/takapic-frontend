import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';
import { compose, lifecycle } from 'recompose';

export default compose(
  lifecycle({
    componentDidMount() {
      window.$(function() {
        window.$('.select2').select2();
      });
    },
  })
)(
  class PhotographerRegistrationStep1 extends Component {
    render() {
      return (
        <Page>
          <div className="container" id="photographer-landing">
            <div className="steps steps-3">
              <div className="active" />
              <div />
              <div />
            </div>

            <div className="panel setup-content" id="step-1">
              <div className="panel-body">
                <h2 className="text-center">Photographer Registration</h2>
                <div className="text-center social-media-signup">
                  <p>
                    You can register to be our photographer using your existing
                    Facebook or Gmail account
                  </p>
                  <div className="social-media-btn">
                    <button type="button" className="btn fb-btn">
                      <img
                        src="https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png"
                        alt=""
                      />Facebook
                    </button>
                    <button type="button" className="btn gmail-btn">
                      <img
                        src="http://pngimg.com/uploads/gmail_logo/gmail_logo_PNG5.png"
                        alt=""
                      />Gmail
                    </button>
                  </div>
                  <p>or fill the form below</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Your Complete Name</label>
                  <input
                    type="text"
                    required="required"
                    className="form-control"
                    placeholder="Enter Your Complete Name"
                  />
                </div>
                <div className="form-group">
                  <label className="control-label">Your Email</label>
                  <input
                    type="email"
                    required="required"
                    className="form-control"
                    placeholder="Enter Your Email Address"
                  />
                </div>

                <Link
                  to="/photographer-registration/s1-checkmail"
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
