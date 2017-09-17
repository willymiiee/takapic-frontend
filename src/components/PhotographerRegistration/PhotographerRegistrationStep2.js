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

            <div className="panel setup-content" id="step-2">
              <div className="panel-body">
                <h2 className="text-center">Add your best photo profile</h2>
                <div id="profile-dragarea">
                  <div
                    id="filedrag-photo"
                    className="center-block img-responsive"
                  >
                    <div className="ph">
                      <div className="icon" />Drag your profile photo here
                    </div>
                  </div>
                </div>
                <p className="text-center">or choose file</p>
                <div className="form-group">
                  <input className="input-file" type="file" name="" />
                </div>

                <Link
                  to="/photographer-registration/s3"
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
