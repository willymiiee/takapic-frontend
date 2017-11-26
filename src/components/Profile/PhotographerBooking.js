import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
// import Yup from 'yup';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import ReactRating from 'react-rating-float';
import { Button, Col, Panel, Row } from 'react-bootstrap';
import { fetchPhotographerServiceInformation } from "../../store/actions/photographerServiceInfoActions";
import { fetchReservationAction, reservationPaymentAction } from "../../store/actions/reservationActions";

import Page from '../Page';

const BookingForm = props => {
  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    meetingPoints,
    meetingPointChangeHandler
  } = props;

  const _meetingPointChangeHandler = selectChoice => {
    setFieldValue('meetingPointSelectedValue', selectChoice.target.value);
    meetingPointChangeHandler(selectChoice.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Panel
        collapsible
        expanded={true}
        header="1. About Your Booking"
        eventKey="1"
      >
        <h4>Q1. Who is coming?</h4>

        <div className="form-group">
          <label>Adults</label>
          <input
            name="numberOfAdults"
            type="text"
            value={values.numberOfAdults}
            className="form-control"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Children</label>
          <input
            name="numberOfChildren"
            type="text"
            value={values.numberOfChildren}
            className="form-control"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Infants</label>
          <input
            name="numberOfInfants"
            type="text"
            value={values.numberOfInfants}
            className="form-control"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <h4>Q2. Preferred meeting point with your photographer</h4>

        <select name="meetingPointSelectedValue" value={values.meetingPointSelectedValue} onChange={_meetingPointChangeHandler}>
          {
            meetingPoints && Object.keys(meetingPoints).map(item => {
              let placeDisplay = meetingPoints[item].meetingPointName + ' - ' + meetingPoints[item].placeLocationNotes || '';
              if (item === '0000') {
                return (
                  <option key={item} value={item}>{ meetingPoints[item] }</option>
                );
              } else {
                return (
                  <option key={item} value={item}>{ placeDisplay }</option>
                );
              }
            })
          }
        </select>

        <h4>
          <strong>Say Hello To Your Photographer</strong>
        </h4>

        <textarea name="messageToPhotographer" onChange={handleChange} value={values.messageToPhotographer} />

        <Button className="pull-right">Next</Button>
      </Panel>

      <Panel
        collapsible
        expanded={true}
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

        <select name="billingCountry" value={values.billingCountry || 'empty'} onChange={handleChange}>
          <option value="empty">--- Choose ---</option>
          <option value="south_korea">South Korea</option>
          <option value="indonesia">Indonesia</option>
        </select>

        <h4>
          <strong>Payment Method</strong>
        </h4>

        <select name="paymentMethod"  value={values.paymentMethod || 'empty'} onChange={handleChange}>
          <option value="empty">--- Choose ---</option>
          <option value="credit_card">Credit card</option>
        </select>
      </Panel>

      <button
        type="submit"
        className="button"
        disabled={isSubmitting}
      >
        { isSubmitting ? 'Please wait...' : 'Submit' }
      </button>
    </form>
  );
};

const BookingFormFormik = Formik({
  mapPropsToValues: props => {
    return {
      meetingPointSelectedValue: get(props, 'reservation.meetingPoints.uuid', '0000'),
      messageToPhotographer: get(props, 'reservation.message', ''),
      billingCountry: get(props, 'reservation.payment.billingCountry', ''),
      paymentMethod: get(props, 'reservation.payment.method', ''),
      numberOfAdults: get(props, 'reservation.passengers.adults', 0),
      numberOfChildren: get(props, 'reservation.passengers.childrens', 0),
      numberOfInfants: get(props, 'reservation.passengers.infants', 0)
    };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    setTimeout(() => {
      const data = {
        meetingPoints: {
          type: 'defined',
          uuid: values.meetingPointSelectedValue,
          detail: props.meetingPoints[values.meetingPointSelectedValue]
        },
        message: values.messageToPhotographer,
        payment: {
          billingCountry: values.billingCountry,
          method: values.paymentMethod
        },
        passengers: {
          adults: values.numberOfAdults,
          childrens: values.numberOfChildren,
          infants: values.numberOfInfants
        }
      };

      props.reservationPaymentAction(data);
      setSubmitting(false);
    }, 1000);
  }
})(BookingForm);

class PhotographerBooking extends Component {
  constructor() {
    super();
    this.state = {
      meetingPoints: {
        type: '-',
        detail: {}
      },
      message: '-',
      payment: {
        billingCountry: '',
        method: ''
      },
      passengers: {
        adults: 0,
        childrens: 0,
        infants: 0
      }
    };
  }

  componentWillMount() {
    const {
      photographerServiceInformation: { loading }
    } = this.props;

    if (loading) {
      const uid = window.location.pathname.split('/')[2];
      this.props.fetchPhotographerServiceInformation(uid);
    }

    if (isEmpty(this.props.reservation)) {
      this.props.fetchReservationAction();
    }
  }

  componentDidMount() {
    if (!isEmpty(this.props.reservation)) {
      const mpDefault = {
        meetingPoints: {
          type: '-',
          detail: {}
        }
      };
      const meetingPointsFromStore = get(this.props, 'reservation.meetingPoints', mpDefault);
      this.setState({
        meetingPoints: meetingPointsFromStore
      });
    }
  }

  meetingPointChangeHandler = value => {
    const {
      photographerServiceInformation: {
        data: { meetingPoints }
      }
    } = this.props;

    this.setState({
      ...this.state,
      meetingPoints: {
        type: 'defined',
        detail: meetingPoints[value]
      }
    });
  };

  render() {
    if (!this.props.photographerServiceInformation.loading && !isEmpty(this.props.reservation)) {
      const {
        photographerServiceInformation: {
          data: {
            userMetadata: {
              displayName,
              locationMerge
            },
            meetingPoints,
            serviceReviews: {
              rating,
              impressions
            },
            packagesPrice
          }
        },
        reservation: {
          packageSelectedIndex,
          startDateTime,
          photographerFee,
          serviceFee,
          credit,
          total
        }
      } = this.props;

      // eslint-disable-next-line
      const hours = parseInt(packagesPrice[packageSelectedIndex].packageName.replace(/hours?/i, '').trim());
      const startDateAndTimeDisplay = moment(startDateTime).format('MMMM Do YYYY HH:mm a');
      const toEndTime = moment(startDateTime).add(hours, 'h').format('HH:mm a');

      const {
        meetingPoints: { detail: meetingPointDetail }
      } = this.state;

      let meetingPlaceDisplay = null;

      if (isEmpty(meetingPointDetail)) {
        const meetingPointsFromStore = get(this.props, 'reservation.meetingPoints.detail', null);
        if (meetingPointsFromStore) {
          meetingPlaceDisplay = <p>{ meetingPointsFromStore.meetingPointName + ' - ' + meetingPointsFromStore.placeLocationNotes }</p>
        } else {
          meetingPlaceDisplay = <p>{`-`}</p>
        }
      } else {
        meetingPlaceDisplay = <p>
          {
            !isEmpty(meetingPointDetail) && meetingPointDetail.hasOwnProperty('meetingPointName')
              ? meetingPointDetail.meetingPointName + ' - ' + meetingPointDetail.placeLocationNotes
              : '-'
          }
        </p>
      }

      return (
        <Page>
          <div className="hidden-xs padding-bottom-60"/>
          <div className="container">
            <Row>
              <Col sm={6} md={7}>
                <BookingFormFormik
                  reservation={this.props.reservation}
                  meetingPoints={meetingPoints}
                  meetingPointChangeHandler={this.meetingPointChangeHandler}
                  reservationPaymentAction={this.props.reservationPaymentAction}
                />
              </Col>

              <Col sm={6} md={5}>
                <div className="card">
                  <h4>
                    <strong>Photographer Detail</strong>
                  </h4>

                  <p>
                    { displayName }
                    <br/>
                    { locationMerge }
                    <br/>
                  </p>

                  <ReactRating rate={rating.value} total={5}/>

                  <ul>
                    {
                      Object.keys(impressions).map(item => (
                        <li key={item}>
                          <span style={{ fontWeight: 'bold' }}>
                            { impressions[item].label }: </span> { impressions[item].value * 100 }%
                        </li>
                      ))
                      }
                  </ul>

                  <h4>
                    <strong>Photo Shoot Schedule</strong>
                  </h4>
                  <p>

                    { startDateAndTimeDisplay } - { toEndTime } ({ hours } hours)
                  </p>

                  <h4>
                    <strong>Meeting Place</strong>
                  </h4>
                  { meetingPlaceDisplay }

                  <h4>Payment Summary</h4>
                  <p>
                    Photographer Fee <span className="pull-right">USD { photographerFee }</span>
                  </p>

                  <p>
                    Service Fee <span className="pull-right">USD { serviceFee }</span>
                  </p>
                  <p>
                    Credit <span className="pull-right">USD { credit }</span>
                  </p>

                  <h4>
                    <strong>
                      Total <span className="pull-right">USD { total }</span>
                    </strong>
                  </h4>
                </div>
              </Col>
            </Row>
          </div>
        </Page>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  photographerServiceInformation: state.photographerServiceInformation,
  reservation: state.reservation
});

const mapDispatchToProps = dispatch => ({
  fetchPhotographerServiceInformation: uid => dispatch(fetchPhotographerServiceInformation(uid)),
  fetchReservationAction: () => dispatch(fetchReservationAction()),
  reservationPaymentAction: data => dispatch(reservationPaymentAction(data))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhotographerBooking)
);
