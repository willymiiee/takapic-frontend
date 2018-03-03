import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import CircularProgressbar from 'react-circular-progressbar';
import ReactRating from 'react-rating-float';
import { Col, Row } from 'react-bootstrap';
import { fetchPhotographerServiceInformation } from "../../store/actions/photographerServiceInfoActions";
import { fetchReservationAction, reservationPaymentAction } from "../../store/actions/reservationActions";
import { RESERVATION_UNPAID, SERVICE_FEE } from "../../services/userTypes";

import Page from '../Page';
import BookingForm from './BookingForm';
import MeetingPointMap from './MeetingPointMap';
import Animator from '../common/Animator';
import axios from "axios/index";

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
      snapToken: null
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

    axios
      .get('http://localhost/php-services/index.php')
      .then((response) => {
        this.setState({ snapToken: response.data.getSnapToken });
      })
      .catch((error) => {
        console.log(error);
      });
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
    if (!isEmpty(this.props.reservation) && this.props.reservation.status !== RESERVATION_UNPAID) {
      const { reservationId, photographerId } = this.props.reservation;
      return <Redirect to={{ pathname: `/me/reservations/${reservationId}/${photographerId}` }}/>;
    }

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
          credit
        }
      } = this.props;

      const currency = window.TAKAPIC_USE_CURRENCY;
      const nf = new Intl.NumberFormat();
      const packageSelected = packagesPrice.filter(item => item.id === packageId)[0];
      const reservation = this.props.reservation;
      // eslint-disable-next-line
      const serviceFee = nf.format(parseInt(reservation['photographerFee' + currency]) * SERVICE_FEE);

      // eslint-disable-next-line
      const hours = parseInt(packageSelected.packageName.replace(/hours?/i, '').trim());
      const startDateAndTimeDisplay = moment(startDateTime).format('MMMM Do YYYY HH:mm a');
      const toEndTime = moment(startDateTime).add(hours, 'h').format('HH:mm a');

      let meetingPointDetail = get(this.state, 'meetingPoints.detail', null);
      if (!meetingPointDetail) {
        meetingPointDetail = get(this.props, 'reservation.meetingPoints.detail', null);
      }

      const meetingPlaceDisplay = (
        <p>
          {
            !isEmpty(meetingPointDetail) && meetingPointDetail.hasOwnProperty('meetingPointName')
              ? meetingPointDetail.meetingPointName + ' - ' + meetingPointDetail.placeLocationNotes
              : '-'
          }
        </p>
      );

      return (
        <Page>
          <div className="hidden-xs padding-bottom-60"/>
          <div className="container">
            <Row className="m-padding-top-40">
              <Col sm={6} lg={7}>
                <BookingForm
                  reservation={this.props.reservation}
                  meetingPoints={meetingPoints}
                  meetingPointChangeHandler={this.meetingPointChangeHandler}
                  reservationPaymentAction={this.props.reservationPaymentAction}
                  goToReservationDetail={this.goToReservationDetail}
                  travellerDisplayName={this.props.user.userMetadata.displayName}
                  snapToken={this.state.snapToken}
                />
              </Col>
              <Col sm={6} lg={5}>
                <div className="card" style={{borderRadius:'3px'}}>
                  <div id="photographer-info">
                    <h3 className="has-dot">About Photographer</h3>
                    <div className="has-border">
                      <h1>{ displayName }</h1>

                      <p style={{fontSize:'16px'}}>{ locationMerge }</p>
                    </div>
                    
                    <h3 className="has-dot">Photographer Reviews</h3>
                    <div className="has-border">
                      <div className="ratings-star" style={{marginBottom: '20px'}}>
                        <h4 >
                          { rating.label }
                        </h4>
                        <ReactRating
                          rate={ rating.value }
                          total={5}
                        />
                      </div>
                      <div id="photographer-stats">
                        {
                          impressions.map((item, key) => (
                          <div key={key}>
                            <CircularProgressbar
                              percentage={item.value * 100}
                              initialAnimation
                            />
                            <b style={{fontSize:'14px', fontWeight: 'lighter', marginBottom:'0px'}}>{item.label}</b>
                          </div>
                        ))
                        }
                      </div>
                    </div>
                    
                    <h3 className="has-dot">Photo Shoot Schedule</h3>
                    <div className="has-border" style={{color:'#222'}}>
                      { startDateAndTimeDisplay } - { toEndTime } ({ hours } hours)
                    </div>
                    
                    <h3 className="has-dot">Meeting Place</h3>
                    <div className="has-border" style={{color:'#222'}}>
                      { meetingPlaceDisplay }

                      {
                        meetingPointDetail ? <MeetingPointMap lat={meetingPointDetail.lat} long={meetingPointDetail.long}/> : null
                      }
                    </div>
                    
                    <h3 className="has-dot">Payment Summary</h3>
                    <div className="has-border" style={{color:'#222'}}>
                        Photographer Fee <span className="pull-right">{`${currency} ${nf.format(reservation['photographerFee' + currency])}`}</span> <br/>
                        Service Fee <span className="pull-right">{`${currency} ${serviceFee}`}</span> <br/>
                        Credit <span className="pull-right">{`${currency} ${credit}`}</span>
                    </div>
                    <hr/>
                    <h3 className="has-dot radius-8" style={{padding: '16px', color: 'white', backgroundColor:'#9999'}}>
                      <strong>
                        Total <span className="pull-right">{`${currency} ${nf.format(reservation['totalPrice' + currency])}`}</span>
                      </strong>
                    </h3>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Page>
      );

    } else {
      return <Animator/>;
    }
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
