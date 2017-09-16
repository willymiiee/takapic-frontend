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
            <hr />

            <h2>Photographer Registration</h2>
            <div className="row">
              <div className="col-sm-4 col-md-2 padding-top-5">
                Your complete name
              </div>
              <div className="col-sm-10 col-md-11 margin-bottom-15">
                <input />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4 col-md-2 padding-top-5">Email</div>
              <div className="col-sm-10 col-md-11 margin-bottom-15">
                <input />
              </div>
            </div>

            <Link to="/photographer-registration/s2" className="button">
              Next
            </Link>
          </div>
        </Page>
      );
    }
  }
);
