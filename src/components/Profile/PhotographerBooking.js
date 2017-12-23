import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import ReactRating from 'react-rating-float';
import { Col, Row } from 'react-bootstrap';
import { fetchPhotographerServiceInformation } from "../../store/actions/photographerServiceInfoActions";
import { fetchReservationAction, reservationPaymentAction } from "../../store/actions/reservationActions";

import Page from '../Page';
import BookingForm from './BookingForm';

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
      },
      braintreeInstanceObject: null
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

  setBraintreeInstanceObject = (object) => {
    this.setState({ braintreeInstanceObject: object });
  };

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
                <BookingForm
                  reservation={this.props.reservation}
                  meetingPoints={meetingPoints}
                  meetingPointChangeHandler={this.meetingPointChangeHandler}
                  reservationPaymentAction={this.props.reservationPaymentAction}
                  goToReservationDetail={this.goToReservationDetail}
                  braintreeInstanceObject={this.state.braintreeInstanceObject}
                  setBraintreeInstanceObject={this.setBraintreeInstanceObject}
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
