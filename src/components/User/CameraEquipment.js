import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Select from 'react-select';

import {dashify} from "../../helpers/helpers";

import {updateCameraEquipment} from '../../store/actions/profileUpdateActions';

class CameraEquipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        bodies: [],
        lenses: [],
      },
      values: {
        bodies: [],
        lenses: [],
      },
    };
  }

  componentWillMount() {
    this.getCameraEquipment();
  }

  getCameraEquipment = () => {
    let { options, values } = this.state;
    let cameraEquipment = this.props.photographerServiceInformation.data.cameraEquipment;
    if (cameraEquipment) {
      options.bodies = cameraEquipment.body;
      options.lenses = cameraEquipment.lens;
      values.bodies = cameraEquipment.body;
      values.lenses = cameraEquipment.lens;
      this.setState({ options });
    }
  }

  handleOnChangeBody = (value) => {
		const { values } = this.state;
		values.bodies = value
		this.setState({ values });
	}

  handleOnChangeLens = (value) => {
		const { values } = this.state;
		values.lenses = value
		this.setState({ values });
	}

  handleUpdate = event => {
      event.preventDefault();
      const {values: {bodies, lenses}} = this.state;
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
              bodies: bodies.map(body => { return (typeof body === "string") ? body : body.value }),
              lenses: lenses.map(lens => { return (typeof lens === "string") ? lens : lens.value }),
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
    const { options, values } = this.state

    return (
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Body
          </Col>
          <Col sm={6}>
            <Select.Creatable
    					multi={true}
              options={options.bodies.map(item => ({
                label: item,
                value: item,
                style: {
                  margin: "5px 0px 5px 5px"
                }
              }))}
    					onChange={this.handleOnChangeBody}
    					value={values.bodies}
              placeholder="Add more body camera equipment"
    				/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Lens
          </Col>
          <Col sm={6}>
            <Select.Creatable
    					multi={true}
              options={options.lenses.map(item => ({
                label: item,
                value: item,
                style: {
                  margin: "5px 0px 5px 5px"
                }
              }))}
    					onChange={this.handleOnChangeLens}
    					value={values.lenses}
              placeholder="Add more lens camera equipment"
    				/>
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
