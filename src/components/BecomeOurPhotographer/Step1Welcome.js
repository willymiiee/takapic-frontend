import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash/get';
import cloudinary from 'cloudinary-core';

import Page from '../Page';

export default connect(state => ({user: state.userAuth}))(
  class StepWelcome extends Component {
    constructor(){
      super();
      this.cloudinaryInstance = cloudinary.Cloudinary.new({
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        secure: true
      });
    }

    componentWillUnmount() {
      this.cloudinaryInstance = null;
    }

    render() {
      const {user} = this.props;
      return (
        <Page>
          <div
            className="background-cover"
            style={{
              backgroundImage: `url(${this.cloudinaryInstance.url('assets/hero_1', { width: 1600, crop: 'scale', quality: 'auto:best' })})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              paddingBottom: '80px'
            }}
          >
            <div className="container" id="photographer-landing">
              <div className="row">
                <div className="col-sm-6 col-md-4">
                  <div className="card margin-top-40 bg-white-trans">
                    <h4>
                      <b>Hello, {get(user, 'displayName')}</b>
                    </h4>

                    <p>
                      Let's start to make you a star Takapic photographer
                    </p>
                  </div>

                  <div className="card margin-top-40 bg-white-trans">
                    <h4>
                      <b>Step 1</b>
                    </h4>

                    <p>
                      Location, Short Descripton, Equipment, Language, Speciality
                    </p>

                    <Link
                      to="/become-our-photographer/step-1-1"
                      className="button key-color radius-5"
                    >
                      Continue
                    </Link>
                  </div>

                  <div className="card margin-top-40 bg-white-trans">
                    <h4>
                      <b>Step 2</b>
                    </h4>

                    <p>
                      Pricing, Photos, Schedule, Preferred Meeting Points
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Page>
      );
    }
  }
);
