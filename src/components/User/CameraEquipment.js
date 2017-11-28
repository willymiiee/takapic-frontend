import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap'

import {dashify} from "../../helpers/helpers";

import {updateCameraEquipment} from '../../store/actions/profileUpdateActions';

class CameraEquipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {
        bodies: [],
        lenses: [],
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
      selected.bodies = cameraEquipment.body;
      selected.lenses = cameraEquipment.lens;
      this.setState({selected});
    } else {
      selected.bodies = [''];
      selected.lenses = [''];
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

  handleUpdate = event => {
      event.preventDefault();
      const {selected: {bodies, lenses}} = this.state;
      if (
          this.notEmpty(bodies) &&
          this.notEmpty(lenses)
      ) {
          const {
              photographerServiceInformation: {
                data: {
                  userMetadata: {
                    accountProviderType,
                    uid,
                    email,
                  }
                }
              }
          } = this.props;

          let reference = '';
          if (accountProviderType === 'google.com') {
              reference = 'googlecom-' + uid;
          } else {
              reference = dashify(email);
          }

          const params = {
              reference,
              bodies: bodies.filter(b => b !== '').map(b => {return Array.isArray(b) ? b[0] : b}),
              lenses: lenses.filter(l => l !== '').map(l => {return Array.isArray(l) ? l[0] : l}),
              uid: uid
          };
          this.props.updateCameraEquipment(params);
      } else {
          alert('Please complete the form');
      }
  };

  notEmpty = arr => {
      return arr.length > 0 && arr[0] !== '';
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

        <hr/>
        <Button onClick={this.handleUpdate} style={{float:'right'}} className="button">Update</Button>
      </Form>
    );
  }
}

export default connect(
    null,
    dispatch => ({
        updateCameraEquipment: paramsObject => dispatch(updateCameraEquipment(paramsObject))
    })
)(CameraEquipment);
