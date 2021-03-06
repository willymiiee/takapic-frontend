import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, FormGroup, Button } from 'react-bootstrap';
import Select from 'react-select';
import isEqual from 'lodash/isEqual';

import { updateCameraEquipment } from '../../store/actions/profileUpdateActions';

class CameraEquipment extends Component {
  constructor() {
    super();
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
    this.setLocalState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { cameraEquipment: cameraEquipmentNew } = nextProps.photographerServiceInformation.data;
    const { cameraEquipment: cameraEquipmentOld } = this.props.photographerServiceInformation.data;
    if (!isEqual(cameraEquipmentNew, cameraEquipmentOld)) {
      this.setLocalState(nextProps);
    }
  }

  setLocalState(props) {
    let { options, values } = this.state;
    let cameraEquipment = props.photographerServiceInformation.data.cameraEquipment;
    if (cameraEquipment) {
      options.bodies = cameraEquipment.body;
      options.lenses = cameraEquipment.lens;
      values.bodies = cameraEquipment.body;
      values.lenses = cameraEquipment.lens;
      this.setState({ options });
    }
  };

  handleOnChangeBody = (value) => {
		const { values } = this.state;
		values.bodies = value;
		this.setState({ values });
	};

  handleOnChangeLens = (value) => {
		const { values } = this.state;
		values.lenses = value;
		this.setState({ values });
	};

  handleUpdate = event => {
    event.preventDefault();
    const { values: { bodies, lenses } } = this.state;
    if (
      this.notEmpty(bodies) &&
      this.notEmpty(lenses)
    ) {
      const {
        photographerServiceInformation: {
          data: {
            userMetadata: { uid }
          }
        }
      } = this.props;

      const params = {
        bodies: bodies.map(body => {
          return (typeof body === "string") ? body : body.value
        }),
        lenses: lenses.map(lens => {
          return (typeof lens === "string") ? lens : lens.value
        }),
        uid
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
    const { options, values } = this.state;

    return (
      <Form style={{marginTop:'40px'}}>
        <FormGroup>
          Body
          <Select.Creatable
            multi={true}
            className="line-height-minimum"
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
        </FormGroup>

        <FormGroup>
          Lens
          <Select.Creatable
            multi={true}
            className="line-height-minimum"
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
