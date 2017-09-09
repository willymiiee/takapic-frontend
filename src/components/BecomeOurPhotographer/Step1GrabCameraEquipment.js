import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

export default class StepGrabCameraEquipment extends Component {
  componentDidMount() {
    window.$(function() {
      window.$('.select2').select2();
    });
  }

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
          <h3>What camera equipment do you have?</h3>
          <div className="row">
            <div className="col-sm-2 col-md-1 padding-top-5">Body</div>
            <div className="col-sm-10 col-md-11 margin-bottom-15">
              <select className="select2" multiple>
                <option>Nikon D5600</option>
                <option>Nikon D7500</option>
                <option>Nikon D7200</option>
                <option>Canon 60D</option>
                <option>Canon 70D</option>
                <option>Canon 80D</option>
              </select>
            </div>
            <div className="col-sm-2 col-md-1 padding-top-5">Lens</div>
            <div className="col-sm-10 col-md-11 margin-bottom-15">
              <select className="select2" multiple>
                <option>Canon EF 50mm f/1.8 II Lens – f</option>
                <option>Canon EF 85mm f/1.8 USM Telephoto Lens</option>
                <option>Canon EF 28mm f/1.8 USM Wide Angle Lens</option>
                <option>Nikon AF-S FX NIKKOR 50mm f/1.8G</option>
                <option>Nikon AF FX NIKKOR 28mm f/1.8G</option>
                <option>Sigma 17-50mm f/2.8 EX DC OS HSM FLD</option>
                <option>Sigma 10-20mm f/3.5 EX DC HSM</option>
                <option>Tamron Auto Focus 70-300mm f/4.0-5.6 Di LD</option>
              </select>
            </div>
          </div>
          <h3>Language Spoken</h3>
          <select className="select2" multiple>
            <option>English</option>
            <option>Korean</option>
            <option>Japanese</option>
            <option>Indonesian</option>
            <option>French</option>
          </select>
          <h3>Speciality</h3>
          <select className="select2" multiple>
            <option>Wedding</option>
            <option>Portrait</option>
            <option>Couple</option>
            <option>Snap</option>
            <option>Glamour</option>
          </select>
          <hr />
          <Link
            to="/become-our-photographer/step-1-2"
            className="button button-white-no-shadow u"
          >
            Back
          </Link>
          <Link to="/become-our-photographer/welcome-2" className="button">
            Done
          </Link>
        </div>
      </Page>
    );
  }
}
