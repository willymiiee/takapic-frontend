import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  FormControl,
  FormGroup,
  InputGroup,
  Table,
} from 'react-bootstrap';
import { setPricing } from '../../store/actions/photographerServiceInfoActionsStep2';

import Page from '../Page';

class Step2IndicatePrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masterPackages: [
        {
          id: 'PKG1',
          packageName: '1 hour',
          requirement: 'Minimum 30 photos',
          price: 0
        },
        {
          id: 'PKG2',
          packageName: '2 hours',
          requirement: 'Minimum 60 photos',
          price: 0
        },
        {
          id: 'PKG3',
          packageName: '4 hours',
          requirement: 'Minimum 120 photos',
          price: 0
        },
        {
          id: 'PKG4',
          packageName: '8 hours',
          requirement: 'Minimum 200 photos',
          price: 0
        }
      ]
    };
  }

  handleChange = (event, itemId) => {
    event.preventDefault();
    const { masterPackages } = this.state;
    const newMasterPackages = masterPackages.map(item => {
      if (item.id === itemId) {
        return Object.assign({}, item, {
          // eslint-disable-next-line
          price: parseInt(event.target.value)
        });
      }
      return item;
    });
    this.setState({ masterPackages: newMasterPackages });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.setPricing({ detailMasterPackage: this.state.masterPackages });
    this.props.history.push('/become-our-photographer/step-2-2');
  };

  render() {
    const { user: { userMetadata: { currency } } } = this.props;
    const { masterPackages } = this.state;
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div className="active" />
            <div />
            <div />
            <div />
          </div>
          <hr />
          <h3>Please indicate your price for each package</h3>
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
                  {
                    masterPackages.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{ item.packageName }</td>
                          <td>{ item.requirement }</td>
                          <td>
                            <FormGroup style={{ marginBottom: 0 }}>
                              <InputGroup>
                                <FormControl
                                  type="text"
                                  value={item.price}
                                  onChange={event => this.handleChange(event, item.id)}
                                />
                                <InputGroup.Button style={{ padding: 10 }}><p>{ currency }</p></InputGroup.Button>
                              </InputGroup>
                            </FormGroup>
                          </td>
                        </tr>
                      )
                    })
                  }
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
          <hr />
          <div style={{overflow:'hidden'}}>
            <Link
                to="/become-our-photographer/step-2-2"
                className="button"
                onClick={this.handleSubmit}
                style={{float:'right'}}
            >
              Next
            </Link>

            {/*<Link
                to="/become-our-photographer/welcome-2"
                className="button button-white-no-shadow u"
                style={{float:'right'}}
            >
              Back
            </Link>*/}
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userAuth,
});

const mapDispatchToProps = dispatch => ({
  setPricing: payload => dispatch(setPricing(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Step2IndicatePrice)
);
