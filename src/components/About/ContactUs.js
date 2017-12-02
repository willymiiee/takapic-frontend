import React, { Component } from 'react';
import './../../styles/react-selectize.css';
import { MultiSelect } from 'react-selectize';
import Page from '../Page';
import {
    FormGroup,
    FormControl
} from 'react-bootstrap';

class ContactUs extends Component{
  constructor(props) {
    super(props);
    this.state = {
      option: [
          'Booking booking a photographer','Changing or canceling a booking','Signing up/in issues','Partnership','Becoming a photographer','Others'
      ]
    };
  }

  render(){
    return (
      <Page>
        <div id="bg-slide">
          <img src="/images/insung-yoon-259475.jpg" alt=""/>
          <img src="/images/hero_1.jpg" alt=""/>
          <img src="/images/hero_2.jpg" alt=""/>
        </div>

        <div className="container">
          <div id="landing-page-top">
            <h1>What would you like to tell us about?</h1>
            <div className="search-box-custom-again contact-us-select" style={{ marginTop: '90px', borderRadius:'0px'}}>
              <MultiSelect
                placeholder="I want to tell about.."
                options={this.state.option.map(item => ({
                    label: item,
                    value: item,
                }))}
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
                >Submit</button>
              </div>
            </div>
          </div>
        </div>

      </Page>
    );
  }
}
export default ContactUs;
