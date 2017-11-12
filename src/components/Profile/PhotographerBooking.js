import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, Panel, Row } from 'react-bootstrap';
import moment from 'moment';
import Page from 'components/Page';
import './../../react-slick.min.css';
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';

import { fetchPhotographerDetail } from '../../store/actions/photographerDetailActions';

class PhotographerBooking extends Component {
  constructor(props) {
    super(props);
    let { state } = this.props.location;
    this.state = {
      activeKey: 1,
      date: null,
      email: 'okaprinarjaya-gmail-com',
      uuid: '0jknVmGuMwPLKjFetyLm9xYWSh62',
      reviews: {
        rating: {
          label: 'Average',
          value: 3.4,
        },
        impressions: [
          {
            label: 'Friendly',
            value: 0.6,
          },
          {
            label: 'Skillful',
            value: 0.8,
          },
          {
            label: 'Comprehensive',
            value: 0.7,
          },
        ],
      },
      reservation: {
        startingTime: {
          startDate: '',
          endDate: '',
        },
        package: {
          value: 0,
          opened: false,
        },
        photographerFee: '',
        serviceFee: 0.15,
        credit: 0,
        total: '',
      },
      totalAdults: 0,
      totalChildren: 0,
      totalInfants: 0,
    };
  }

  componentWillMount() {
    this.props.fetchPhotographerDetail(this.state.email);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }

  handleAdults = event => {
    const isEmpty = value =>
      value === undefined || value === null || value === '';
    if (
      !isEmpty(event.currentTarget.value) &&
      !Number.isInteger(Number(event.currentTarget.value))
    ) {
      return;
    } else {
      this.setState({ totalAdults: event.currentTarget.value });
    }
  };

  handleChildren = event => {
    const isEmpty = value =>
      value === undefined || value === null || value === '';
    if (
      !isEmpty(event.currentTarget.value) &&
      !Number.isInteger(Number(event.currentTarget.value))
    ) {
      return;
    } else {
      this.setState({ totalChildren: event.currentTarget.value });
    }
  };

  handleInfants = event => {
    const isEmpty = value =>
      value === undefined || value === null || value === '';
    if (
      !isEmpty(event.currentTarget.value) &&
      !Number.isInteger(Number(event.currentTarget.value))
    ) {
      return;
    } else {
      this.setState({ totalInfants: event.currentTarget.value });
    }
  };

  render() {
    const { totalAdults, totalChildren, totalInfants } = this.state;
    let yesterday = moment().subtract(1, 'day');
    let valid = function(current) {
      return current.isAfter(yesterday);
    };
    const settings = {
      customPaging: function(i) {
        return (
          <a>
            <img src={`/images/photo/0${i + 1}.jpg`} />
          </a>
        );
      },
      dots: true,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Page>
        <div className="hidden-xs padding-bottom-60" />
        <div className="container">
          <Row>
            <Col sm={6} md={7}>
              <Panel
                collapsible
                expanded={this.state.activeKey === 1}
                header="1. About Your Booking"
                eventKey="1"
              >
                <h4>Q1. Who is coming?</h4>
                <div className="form-group">
                  <label>Adults</label>
                  <input
                    type="text"
                    value={totalAdults}
                    className="form-control"
                    onChange={this.handleAdults}
                  />
                </div>
                <div className="form-group">
                  <label>Children</label>
                  <input
                    type="text"
                    value={totalChildren}
                    className="form-control"
                    onChange={this.handleChildren}
                  />
                </div>
                <div className="form-group">
                  <label>Infants</label>
                  <input
                    type="text"
                    value={totalInfants}
                    className="form-control"
                    onChange={this.handleInfants}
                  />
                </div>
                <h4>Q2. Preferred meeting point with your photographer</h4>
                <select>
                  <option>Your location</option>
                </select>
                <h4>
                  <strong>Say Hello To Your Photographer</strong>
                </h4>
                <textarea />
                <Button
                  className="pull-right"
                  onClick={() => this.setState({ activeKey: 2 })}
                >
                  Next
                </Button>
              </Panel>
              <Panel
                collapsible
                expanded={this.state.activeKey === 2}
                header="2. Payment"
                eventKey="2"
              >
                <p>
                  You'll only be charged if your request is accepted by the
                  photographer. They'll have 24 hours to accept or decline.
                </p>
                <h4>
                  <strong>100% refundable</strong>
                </h4>
                <h4>
                  <strong>Billing Country</strong>
                </h4>
                <select defaultValue="south_korea">
                  <option value="south_korea">South Korea</option>
                  <option value="indonesia">Indonesia</option>
                </select>
                <h4>
                  <strong>Payment Method</strong>
                </h4>
                <select defaultValue="credit_card">
                  <option value="credit_card">Credit card</option>
                </select>
              </Panel>
            </Col>
            <Col sm={6} md={5}>
              <div className="card">
                <h4>
                  <strong>Photographer Detail</strong>
                </h4>
                <p>
                  Name | Location | Rating<br />
                  Number of Reviews
                </p>
                <h4>
                  <strong>Photo Shoot Schedule</strong>
                </h4>
                <p>
                  2017-06-16 01:00 - 03:00<br />
                  (2 hours)
                </p>
                <h4>
                  <strong>Meeting Place</strong>
                </h4>
                <p>(Please fill in this information)</p>
                <h4>
                  <strong>Payment Summary</strong>
                </h4>
                <p>
                  Photographer Fee <span className="pull-right">$200</span>
                </p>
                <p>
                  Service Fee <span className="pull-right">$30</span>
                </p>
                <p>
                  Credit <span className="pull-right">$0</span>
                </p>
                <h4>
                  <strong>
                    Total <span className="pull-right">$230</span>
                  </strong>
                </h4>
              </div>
            </Col>
          </Row>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  photographerDetail: state.photographerDetail,
});

const mapDispatchToProps = dispatch => ({
  fetchPhotographerDetail: email => dispatch(fetchPhotographerDetail(email)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhotographerBooking)
);
