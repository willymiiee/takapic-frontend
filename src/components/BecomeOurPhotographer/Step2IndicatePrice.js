import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
// import { Link } from 'react-router-dom';
import {
  FormControl,
  FormGroup,
  InputGroup,
  Table,
} from 'react-bootstrap';
import { database } from "../../services/firebase";

import Page from '../Page';

class Step2IndicatePrice extends Component {
  constructor() {
    super();
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
      ],
      currency: null,
      isUploading: false,
      modalShow: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalShow: true});
  }
  closeModal() {
    this.setState({modalShow: false});
  }

  componentWillMount() {
    database
      .database()
      .ref('user_metadata/' + this.props.user.uid)
      .child('currency')
      .once('value')
      .then((snapshot) => {
        this.setState({ currency: snapshot.val() });
      });
  }

  handleChange = (event, itemId) => {
    event.preventDefault();
    const { masterPackages } = this.state;
    const newMasterPackages = masterPackages.map(item => {
      if (item.id === itemId) {
        // eslint-disable-next-line
        let fixVal = !event.target.value ? 0 : parseInt(event.target.value);
        fixVal = fixVal <= 0 ? 0 : fixVal;
        return Object.assign({}, item, {
          price: fixVal
        });
      }
      return item;
    });
    this.setState({ masterPackages: newMasterPackages });
  };

  handleFocus = (evt) => {
    evt.target.select();
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isUploading: true });

    const db = database.database();

    db
      .ref('photographer_service_information')
      .child(this.props.user.uid)
      .update({
        packagesPrice: this.state.masterPackages,
        updated: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        db
          .ref('user_metadata')
          .child(this.props.user.uid)
          .update({
            priceStartFrom: this.state.masterPackages[0].price,
            updated: firebase.database.ServerValue.TIMESTAMP
          });
      })
      .then(() => {
        this.setState({ isUploading: false });
        this.props.history.push('/become-our-photographer/step-2-2');
      })
      .catch((error) => {
        this.setState({ isUploading: false });
        console.log(error);
      });
  };

  render() {
    const { masterPackages, currency } = this.state;

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

          <h3 style={{fontWeight:'bold',marginBottom:'24px'}}>Please indicate your price for each package</h3>

          <a className="m-link-modal" onClick={this.openModal}>Read Tips</a>

          <div className="row">
            <div className="col-sm-7 margin-top-15 margin-bottom-30 horizontal-scroll">
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Package</th>
                    <th style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Requirement</th>
                    <th style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>Your Price</th>
                    <th style={{ textAlign: 'center' }}>Currency</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    masterPackages.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{ item.packageName }</td>
                          <td style={{ verticalAlign: 'middle', paddingLeft: '10px' }}>{ item.requirement }</td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <FormGroup style={{ marginBottom: 0, minWidth: '170px' }}>
                              <InputGroup>
                                <FormControl
                                  type="number"
                                  value={item.price}
                                  onChange={event => this.handleChange(event, item.id)}
                                  onFocus={this.handleFocus}
                                />
                              </InputGroup>
                            </FormGroup>
                          </td>
                          <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{ currency }</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </div>

            <div className={this.state.modalShow ? "col-sm-5 margin-top-15 margin-bottom-30 m-modal" : "col-sm-5 margin-top-15 margin-bottom-30 m-hide"}>
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
              <i className="fa fa-close" onClick={this.closeModal}></i>
            </div>
          </div>

          <hr />

          <button
            type="button"
            className="button key-color radius-5 width1"
            onClick={(evt) => !this.state.isUploading ? this.handleSubmit(evt) : false}
            disabled={this.state.isUploading}
          >
            { this.state.isUploading ? 'Processing...' : 'Next' }
          </button>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userAuth
});

export default connect(mapStateToProps)(Step2IndicatePrice);
