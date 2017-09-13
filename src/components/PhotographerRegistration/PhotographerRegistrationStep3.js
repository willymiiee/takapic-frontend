import React, { Component } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import { compose, lifecycle } from "recompose";

export default compose(
  lifecycle({
    componentDidMount() {
      window.$(function() {
        window.$(".select2").select2();
      });
    }
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

            <h2>Confirm your phone number</h2>

            <div className="row">
              <div className="col-sm-10 col-md-11 margin-bottom-15">
                <input type="text" />
              </div>
            </div>

            <Link to="/become-our-photographer/welcome-2" className="button">
              Next
            </Link>
          </div>
        </Page>
      );
    }
  }
);
