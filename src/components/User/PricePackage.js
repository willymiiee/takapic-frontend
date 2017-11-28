import React, { Component } from 'react'
import { Form, FormGroup, Col, ControlLabel, FormControl, Table , InputGroup} from 'react-bootstrap'

export default class PricePackage extends Component {
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
    const { photographerServiceInformation } = this.props

    this.setState({
      packagesPrice: photographerServiceInformation.data.packagesPrice
    });
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
                            type="text"
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
    );
  }
}
