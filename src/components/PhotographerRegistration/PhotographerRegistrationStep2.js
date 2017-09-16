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
  class PhotographerRegistrationStep2 extends Component {
    render() {
      return (
        <Page>
          <div className="container" id="photographer-landing">
            <div className="steps steps-3">
              <div />
              <div className="active" />
              <div />
            </div>
            <hr />

            <h2>Add your best photo profile</h2>

            <div className="profile-picture-profile">
              <img className="cover" alt="" src="/images/photo/02.jpg" />
            </div>

            <div className="row">
              <div className="col-sm-10 col-md-11 margin-bottom-15">
                <input type="file" />
              </div>
            </div>

            <Link to="/photographer-registration/s3" className="button">
              Next
            </Link>
          </div>
        </Page>
      );
    }
  }
);
