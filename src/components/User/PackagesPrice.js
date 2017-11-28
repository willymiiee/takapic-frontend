import React, { Component } from 'react'
import {connect} from 'react-redux';
import { FormGroup, FormControl, Table , InputGroup, Button } from 'react-bootstrap'

import {dashify} from "../../helpers/helpers";

import { updatePackagesPrice } from '../../store/actions/profileUpdateActions';

class PackagesPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masterPackage: {
        PKG1: {
          packageName: '1 hour',
          requirement: 'Minimum 30 photos',
          price: 0
        },
        PKG2: {
          packageName: '2 hours',
          requirement: 'Minimum 60 photos',
          price: 0
        },
        PKG3: {
          packageName: '4 hours',
          requirement: 'Minimum 120 photos',
          price: 0
        },
        PKG4: {
          packageName: '8 hours',
          requirement: 'Minimum 200 photos',
          price: 0
        },
      },
      packagesPrice: []
    };
  }

  componentWillMount() {
    const { photographerServiceInformation : { data } } = this.props

    if (data.packagesPrice) {
      let packagesPrice = Object.keys(data.packagesPrice).map(item => (data.packagesPrice[item]));
      this.setState({
        packagesPrice: packagesPrice
      })
    }
  }

  handleChange = (event, tr, index) => {
    event.preventDefault();
    const { packagesPrice } = this.state;
    const key = tr[index].key;

    if (event.target.value !== '') {
      packagesPrice[key].price = event.target.value;
    }

    this.setState({ packagesPrice });
  };

  handleUpdate = event => {
    event.preventDefault();
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

    const state = this.state

    let reference = '';
    if (accountProviderType === 'google.com') {
        reference = 'googlecom-' + uid;
    } else {
        reference = dashify(email);
    }

    const params = {
        reference,
        state,
        uid,
    };

    this.props.updatePackagesPrice(params);
  };

  render() {
    let tr = [];
    const n = this.state.packagesPrice;
    for (var key in n) {
      if (n.hasOwnProperty(key)) {
        var value = n[key];
        value.key = key;
        tr.push(value);
      }
    }

    const { userMetadata: { currency } } = this.props;

    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-7 margin-top-15 margin-bottom-30">
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Requirement</th>
                  <th>Your Price</th>
                </tr>
              </thead>
              <tbody>
                {tr.map((td, kk) => {
                  return (
                    <tr key={kk}>
                      <td>{td.packageName}</td>
                      <td>{td.requirement}</td>
                      <td>
                        <FormGroup style={{ marginBottom: 0 }}>
                          <InputGroup>
                            <FormControl
                              type="number"
                              value={td.price}
                              onChange={event =>
                                this.handleChange(event, tr, kk)}
                            />
                            <InputGroup.Button style={{ padding: 10 }}>
                              <p>{ currency }</p>
                            </InputGroup.Button>
                          </InputGroup>
                        </FormGroup>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className="col-sm-5 margin-top-15 margin-bottom-30">
            <div className="card tips">
              <h3>About Pricing</h3>
              <p>
                Packages are time-based and is the time you spend on the photoshoot. Please factor in
                some flexibility in timing when meeting your customer if they are not familiar with the location.
              </p>

              <h3>Tips for pricing</h3>
              <p>
                You can change your prices anytime you like depending on your schedule or free time.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <hr/>
          <Button onClick={this.handleUpdate} style={{float:'right'}} className="button">Update</Button>
        </div>
      </div>
    );
  }
}

export default connect(
    null,
    dispatch => ({
        updatePackagesPrice: paramsObject => dispatch(updatePackagesPrice(paramsObject))
    })
)(PackagesPrice);