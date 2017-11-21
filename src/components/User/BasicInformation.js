import React, { Component } from 'react'
import { Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap'

export default class BasicInformation extends Component {
  render() {
    let { userMetadata } = this.props

    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="Enter Your Name" value={userMetadata.displayName} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={6}>
            <FormControl type="email" placeholder="Enter Your Email" value={userMetadata.email} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPhoneNumber">
          <Col componentClass={ControlLabel} sm={2}>
            Phone Number
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="Enter Your Phone Number" value={userMetadata.phoneNumber} />
          </Col>
        </FormGroup>

      </Form>
    );
  }
}
