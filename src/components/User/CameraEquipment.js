import React, { Component } from 'react'
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap'

export default class CameraEquipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {
        bodies: [''],
        lenses: [''],
      },
    };
  }

  componentWillMount() {
    this.getCameraEquipment();
  }

  getCameraEquipment = () => {
    let {selected} = this.state;
    let cameraEquipment = this.props.photographerServiceInformation.data.cameraEquipment;
    if (cameraEquipment) {
      selected.bodies = [...selected.bodies, cameraEquipment.body];
      selected.lenses = [...selected.lenses, cameraEquipment.lens];
      this.setState({selected});
    }
  }

  handleAddMoreBody = () => {
      let {selected} = this.state;
      selected.bodies = [...selected.bodies, ''];
      this.setState({selected});
  };

  handleAddMoreLense = () => {
      let {selected} = this.state;
      selected.lenses = [...selected.lenses, ''];
      this.setState({selected});
  };

  handleBody = (event, index) => {
      const {selected} = this.state;
      selected.bodies[index] = event.target.value;
      this.setState({selected});
  };

  handleLense = (event, index) => {
      const {selected} = this.state;
      selected.lenses[index] = event.target.value;
      this.setState({selected});
  };

  render() {
    return (
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Body
          </Col>
          <Col sm={6}>
            {this.state.selected.bodies.map((item, key) => (
                <FormControl
                    key={key}
                    type="text"
                    value={item}
                    onChange={event => this.handleBody(event, key)}
                />
            ))}
            <Button onClick={this.handleAddMoreBody} style={{float:'right'}}>Add More</Button>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Lens
          </Col>
          <Col sm={6}>
            {this.state.selected.lenses.map((item, key) => (
                <FormControl
                    key={key}
                    type="text"
                    value={item}
                    onChange={event => this.handleLense(event, key)}
                />
            ))}
            <Button onClick={this.handleAddMoreLense} style={{float:'right'}}>Add More</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
