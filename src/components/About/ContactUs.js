import React, { Component } from 'react';
import cloudinary from 'cloudinary-core';
import Select from 'react-select';
import {
  FormGroup,
  FormControl
} from 'react-bootstrap';

import Page from '../Page';

class ContactUs extends Component{
  constructor() {
    super();
    this.state = {
      options: [
        'Booking booking a photographer',
        'Changing or canceling a booking',
        'Signing up/in issues',
        'Partnership',
        'Becoming a photographer',
        'Others'
      ],
      selectedOption: ''
    };

    this.cloudinaryInstance = cloudinary.Cloudinary.new({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      secure: true
    });

    this.interval = null;
  }

  componentDidMount() {
    let bgSlide = window.$('#bg-slide');
    this.interval = setInterval(function() {
      window.$('#bg-slide > img:first').appendTo(bgSlide);
    }, 6000);
  }

  componentWillUnmount() {
    this.cloudinaryInstance = null;
    clearInterval(this.interval);
  }

  selectChangeHandler = (value) => {
    this.setState({ selectedOption: value });
  };

  render(){
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
            <h1 style={{
              fontWeight: 'bold',
              color: '#fff',
              fontSize: '30px',
              margin: '2vw 0 5px',
              textAlign: 'center'
            }}>
              What would you like to tell us about?
            </h1>

            <div className="contact-us-select" style={{ marginTop: '90px', borderRadius:'0px'}}>
              <Select
                clearable={false}
                options={this.state.options.map(item => ({
                  label: item,
                  value: item,
                }))}
                value={this.state.selectedOption.value}
                onChange={this.selectChangeHandler}
              />
            </div>

            <div className="row contact-us-input">
              <div className="col-xs-12">
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Your Name"
                  />
                </FormGroup>
              </div>

              <div className="col-sm-6">
                <FormGroup>
                  <FormControl
                    type="email"
                    placeholder="Email"
                  />
                </FormGroup>
              </div>

              <div className="col-sm-6">
                <FormGroup>
                  <FormControl
                    type="email"
                    placeholder="Confirm Email"
                  />
                </FormGroup>
              </div>

              <div className="col-xs-12">
                <FormGroup>
                  <textarea
                    name="selfDescription"
                    placeholder="Write your comment here.."
                  />
                </FormGroup>
              </div>

              <div style={{marginBottom:'20px'}} className="col-xs-12">
                <button
                  type="submit"
                  className="button button-white"
                  style={{width:'100%'}}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
export default ContactUs;
