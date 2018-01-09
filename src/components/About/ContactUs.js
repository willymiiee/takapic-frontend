import React, { Component } from 'react';
import cloudinary from 'cloudinary-core';
import Select from 'react-select';
import {
  FormGroup,
  FormControl
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import Yup from 'yup';
import axios from 'axios';

import Page from '../Page';

class ContactUs extends Component{
  constructor() {
    super();
    this.state = {
      options: [
        'Booking a photographer',
        'Changing or canceling a booking',
        'Signing up/in issues',
        'Partnership',
        'Becoming a photographer',
        'Others'
      ],
      selectedOption: { label: '', value: '' }
    };

    this.cloudinaryInstance = cloudinary.Cloudinary.new({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      secure: true
    });
  }

  componentWillUnmount() {
    this.cloudinaryInstance = null;
  }

  selectChangeHandler = (value) => {
    this.setState({ selectedOption: value });
    this.props.setFieldValue('topic', value.value);
  };

  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      isSubmitting
    } = this.props;

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
          <form onSubmit={handleSubmit}>
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
                  name="topic"
                  clearable={false}
                  options={this.state.options.map(item => ({
                    label: item,
                    value: item,
                  }))}
                  value={this.state.selectedOption.value}
                  onChange={this.selectChangeHandler}
                />
                { errors.topic && touched.topic && <label className="control-label">{ errors.topic }</label> }
              </div>

              <div className="row contact-us-input">
                <div className="col-xs-12">
                  <FormGroup>
                    <FormControl
                      type="text"
                      name="consumerName"
                      value={values.senderName}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Your Name"
                    />
                    { errors.consumerName && touched.consumerName && <label className="control-label">{ errors.consumerName }</label> }
                  </FormGroup>
                </div>

                <div className="col-xs-12">
                  <FormGroup>
                    <FormControl
                      type="email"
                      name="consumerEmail"
                      value={values.senderEmail}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Email"
                    />
                    { errors.consumerEmail && touched.consumerEmail && <label className="control-label">{ errors.consumerEmail }</label> }
                  </FormGroup>
                </div>

                <div className="col-xs-12">
                  <FormGroup>
                    <textarea
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      placeholder="Write your comment here.."
                    />
                    { errors.description && touched.description && <label className="control-label">{ errors.description }</label> }
                  </FormGroup>
                </div>

                <div style={{marginBottom:'20px'}} className="col-xs-12">
                  <button
                    type="submit"
                    className="button button-white"
                    style={{width:'100%'}}
                  >
                    { isSubmitting ? 'Submitting. Please wait...' : 'Submit' }
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Page>
    );
  }
}

const ContactUsFormik = Formik({
  mapPropsToValues: (props) => ({
    topic: '',
    consumerName: '',
    consumerEmail: '',
    description: ''
  }),
  validationSchema: Yup.object().shape({
    topic: Yup.string().required('Please choose a topic to talk about'),
    consumerName: Yup.string().required('Please input your name'),
    consumerEmail: Yup.string().email().required('Please input your valid and frequently used email address'),
    description: Yup.string().required('Please tell / ask us, what would you like to tell / ask us about?')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    axios
      .post(process.env.REACT_APP_API_HOSTNAME + '/api/email-service/contact-takapic', values)
      .then((response) => {
        setSubmitting(false);
        props.history.push('/contact-us-success');
      })
      .catch((error) => {
        console.log(error);
      });
  }
})(ContactUs);

export default withRouter(ContactUsFormik);
