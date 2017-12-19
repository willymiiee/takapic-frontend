import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
// import Yup from 'yup';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import ReactRating from 'react-rating-float';
import { Col, Panel, Row } from 'react-bootstrap';
import Select from 'react-select';
import dropin from 'braintree-web-drop-in';
import { fetchPhotographerServiceInformation } from "../../store/actions/photographerServiceInfoActions";
import { fetchReservationAction, reservationPaymentAction } from "../../store/actions/reservationActions";
import { JsonToUrlEncoded } from "../../helpers/helpers";

import Page from '../Page';

class BrainTreeWebDropIn extends Component {
  constructor() {
    super();
    this.state = {
      braintreeInstance: null
    };
  }

  componentDidMount() {
    dropin.create({
      authorization: 'sandbox_vfzk4g6x_4cm4s6c4wxpf7zp8',
      paypal: {
        flow: 'checkout',
        amount: '10.00',
        currency: 'USD',
        "transactions": [{
          "item_list": {
            "items": [{
              "name": "Photographer Reservation",
              "sku": "OVEIMFPA",
              "price": "10.00",
              "currency": "USD",
              "quantity": 1
            }]
          },
          "amount": {
            "currency": "USD",
            "total": "10.00"
          },
          "description": "Pay reservation."
        }]
      },
      container: ReactDOM.findDOMNode(this.refs.braintreewrapper)
    }, (createError, instance) => {
      this.setState({ braintreeInstance: instance })
    });
  }

  clickMe = () => {
    const { braintreeInstance } = this.state;
    braintreeInstance.requestPaymentMethod((requestPaymentMethodError, payload) => {
      console.log(payload.nonce);
    });
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.clickMe}>Click me!</button>
        <div ref="braintreewrapper"/>
      </div>
    );
  }
}

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

  const meetingPointsList = meetingPoints.map(item => ({ value: item.id, label: item.meetingPointName }));

  const _meetingPointChangeHandler = selectChoice => {
    setFieldValue('meetingPointSelectedValue', selectChoice.value);
    meetingPointChangeHandler(selectChoice.value);
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

        <Select
          name="meetingPointSelectedValue"
          options={meetingPointsList}
          value={values.meetingPointSelectedValue}
          onChange={_meetingPointChangeHandler}
          clearable={false}
          multi={false}
          placeholder="--- Choose ---"
        />

        <h4>
          <strong>Say Hello To Your Photographer</strong>
        </h4>

        <textarea name="messageToPhotographer" onChange={handleChange} value={values.messageToPhotographer} />

        {/*<Button className="pull-right">Next</Button>*/}
      </Panel>

      {/*<Panel
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
      </Panel>*/}

      <BrainTreeWebDropIn/>

      <button
        type="submit"
        className="button"
        disabled={isSubmitting}
      >
        { isSubmitting ? 'Please wait, Processing your payment...' : 'Submit Payment' }
      </button>

    </form>
  );
};

const BookingFormFormik = Formik({
  mapPropsToValues: props => {
    return {
      meetingPointSelectedValue: get(props, 'reservation.meetingPoints.id', ''),
      messageToPhotographer: get(props, 'reservation.message', ''),
      billingCountry: get(props, 'reservation.payment.billingCountry', ''),
      paymentMethod: get(props, 'reservation.payment.method', ''),
      numberOfAdults: get(props, 'reservation.passengers.adults', 0),
      numberOfChildren: get(props, 'reservation.passengers.childrens', 0),
      numberOfInfants: get(props, 'reservation.passengers.infants', 0)
    };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    const data = {
      nama: 'Oka Prinarjaya',
      item: {
        name: 'Pistol aer',
        color: 'black',
        price: 25.00
      }
    };

    fetch(`${process.env.REACT_APP_WEB_PROVIDER_HOSTNAME}/payment/create`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      body: JsonToUrlEncoded(data)
    })
      .then((response => {
        return response.json();
      }))
      .then((data) => {
        let approvalUrl = '';
        for (let i = 0; i < data.links.length; i++) {
          if (data.links[i].rel === 'approval_url') {
            approvalUrl = data.links[i].href;
            break;
          }
        }
        window.location.href = approvalUrl;
      })
      .catch((error) => {
        console.log(error);
      });

    // alert('Ok!');
    /*setTimeout(() => {
      const data = {
        meetingPoints: {
          type: 'defined',
          id: values.meetingPointSelectedValue,
          detail: props.meetingPoints.filter(item => item.id === values.meetingPointSelectedValue)[0]
        },
        message: values.messageToPhotographer,
        payment: {
          billingCountry: values.billingCountry || '-',
          method: values.paymentMethod || '-'
        },
        passengers: {
          adults: values.numberOfAdults,
          childrens: values.numberOfChildren,
          infants: values.numberOfInfants
        }
      };

      props.reservationPaymentAction(props.reservation.reservationId, data);
      setSubmitting(false);
      props.goToReservationDetail(props.reservation.reservationId, props.reservation.photographerId);
    }, 1000);*/
  }
})(BookingForm);

class PhotographerBooking extends Component {
  constructor() {
    super();
    this.state = {
      meetingPoints: null,
      message: '-',
      payment: {
        billingCountry: '-',
        method: '-'
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

    const { photographerId, reservationId } = this.props.match.params;

    if (loading) {
      this.props.fetchPhotographerServiceInformation(photographerId);
    }

    if (isEmpty(this.props.reservation)) {
      this.props.fetchReservationAction(reservationId);
    }
  }

  componentDidMount() {
    if (!isEmpty(this.props.reservation)) {
      const meetingPointsFromStore = get(this.props, 'reservation.meetingPoints');
      this.setState({ meetingPoints: meetingPointsFromStore });
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
        id: value,
        type: 'defined',
        detail: meetingPoints.filter(item => item.id === value)[0]
      }
    });
  };

  goToReservationDetail = (reservationNumber, photographerId) => {
    this.props.history.push(`/me/reservations/${reservationNumber}/${photographerId}`);
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
          packageId,
          startDateTime,
          photographerFee,
          serviceFee,
          credit,
          total
        }
      } = this.props;

      const packageSelected = packagesPrice.filter(item => item.id === packageId)[0];

      // eslint-disable-next-line
      const hours = parseInt(packageSelected.packageName.replace(/hours?/i, '').trim());
      const startDateAndTimeDisplay = moment(startDateTime).format('MMMM Do YYYY HH:mm a');
      const toEndTime = moment(startDateTime).add(hours, 'h').format('HH:mm a');

      const meetingPointDetail = get(this.state, 'meetingPoints.detail');
      let meetingPlaceDisplay = null;

      if (!meetingPointDetail) {
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
                  goToReservationDetail={this.goToReservationDetail}
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
                      impressions && impressions.map((item, index) => (
                        <li key={index}>
                          <span style={{ fontWeight: 'bold' }}>
                            { item.label }: </span> { item.value * 100 }%
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
  user: state.userAuth,
  photographerServiceInformation: state.photographerServiceInformation,
  reservation: state.reservation
});

const mapDispatchToProps = dispatch => ({
  fetchPhotographerServiceInformation: uid => dispatch(fetchPhotographerServiceInformation(uid)),
  fetchReservationAction: reservationId => dispatch(fetchReservationAction(reservationId)),
  reservationPaymentAction: (reservationId, data) => dispatch(reservationPaymentAction(reservationId, data))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhotographerBooking)
);
