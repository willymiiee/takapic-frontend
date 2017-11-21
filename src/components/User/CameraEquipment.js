import React, { Component } from 'react'
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap'

export default class CameraEquipment extends Component {
  render() {

    return (
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Body
          </Col>
          <Col sm={6}>
            <FormControl type="text"/>
            <Button style={{float:'right'}}>Add More</Button>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Lens
          </Col>
          <Col sm={6}>
            <FormControl type="text"/>
            <Button style={{float:'right'}}>Add More</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
