import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, Modal, Panel, Row } from 'react-bootstrap';
// import DateTime from 'react-datetime';
import moment from 'moment';
import Page from 'components/Page';
import ReactRating from 'react-rating-float';
import CircularProgressbar from 'react-circular-progressbar';
import Slider from 'react-slick';
// import './../../daterangepicker.css';
import './../../react-slick.min.css';
import PopPicker from 'rmc-date-picker/lib/Popup';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import enUs from 'rmc-date-picker/lib/locale/en_US';
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';

import { fetchPhotographerDetail } from '../../store/actions/photographerDetailActions';

// import DateRangePicker from 'react-bootstrap-daterangepicker';

class PhotographerBooking extends Component {
  constructor(props) {
    super(props);
    let { state } = this.props.location;
    this.state = {
      activeKey: 1,
      date: null,
      email: 'agungsuryabangsa-gmail-com',
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
    };
  }

  componentWillMount() {
    this.props.fetchPhotographerDetail(this.state.email);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }

  render() {
    console.log('this.props', this.props);
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

    var now = new Date();
    const minDate = new Date(2015, 8, 15, 10, 30, 0);
    const maxDate = new Date(2018, 1, 1, 23, 49, 59);

    const { date } = this.state;
    const datePicker = (
      <DatePicker
        rootNativeProps={{ 'data-xx': 'yy' }}
        minDate={minDate}
        maxDate={maxDate}
        defaultDate={now}
        mode="datetime"
        locale={enUs}
      />
    );

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
