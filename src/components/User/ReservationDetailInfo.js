import React from 'react';
import moment from "moment/moment";

import MeetingPointMap from '../Profile/MeetingPointMap';
import { SERVICE_FEE } from "../../services/userTypes";

const ReservationDetailInfo = (props) => {
  const {
    reservation: {
      status,
      packageId,
      startDateTime,
      meetingPoints: {
        detail: {
          formattedAddress,
          meetingPointName,
          placeLocationNotes,
          lat,
          long
        }
      },
      reservationId,
      created,
      credit,
      passengers: { adults, childrens, infants }
    },
    photographerServiceInformation: {
      data: {
        userMetadata: {
          displayName,
          photoProfileUrl,
          locationMerge
        },
        packagesPrice
      }
    }
  } = props;

  const currency = window.TAKAPIC_USE_CURRENCY;
  const reservation = props.reservation;
  const nf = new Intl.NumberFormat();
  const packageSelected = packagesPrice.filter(item => item.id === packageId)[0];
  // eslint-disable-next-line
  const hours = parseInt(packageSelected.packageName.replace(/hours?/i, '').trim());
  const startDateAndTimeDisplay = moment(startDateTime).format('MMMM Do YYYY HH:mm a');
  const toEndTime = moment(startDateTime).add(hours, 'h').format('HH:mm a');
  // eslint-disable-next-line
  const serviceFee = parseInt(reservation['photographerFee' + currency]) * SERVICE_FEE;

  return (
    <div className="reservation-detail-wrapper">
      <div className="reservation-photographer-info">
        <div className="profile-picture">
          <img
            className="cover circle-img border-smooth"
            src={photoProfileUrl}
            alt="This is an alt text"
          />
        </div>

        <div className="info-item-text">
          <h4>{ displayName }</h4>
          <p style={{ marginTop: '-10px' }}>{ locationMerge }</p>
          <p style={{ marginTop: '-25px' }}>0 reviews</p>
        </div>
      </div>

      <hr/>

      <div className="reservation-status-details-wrapper">
        <h4 className="has-dot">Reservation Number</h4>
        <p className="has-border">{ reservationId }</p>
      </div>

      <div className="reservation-status-details-wrapper">
        <h4 className="has-dot">Status Reservation</h4>
        <p className="has-border">{ status }</p>
      </div>

      <div className="reservation-status-details-wrapper">
        <h4 className="has-dot">Created</h4>
        <p className="has-border">{ moment(created).format('MMMM Do YYYY HH:mm a') }</p>
      </div>

      <div className="reservation-trip-details-wrapper">
        <h4 className="has-dot">Trip Details</h4>
        <div className="has-border border-child">
          <p className="reservation-trip-details-item-title">Photo shoot schedule:</p>
          <p>{ startDateAndTimeDisplay } - { toEndTime } ( { hours } hours )</p>
        </div>

        <div className="has-border border-child">
          <p className="reservation-trip-details-item-title">Meeting point:</p>
          <p>
            { meetingPointName }
            <br/>
            { formattedAddress }
            <br/>
            { placeLocationNotes }
          </p>
        </div>

        <MeetingPointMap lat={lat} long={long}/>


        <div className="has-border border-child" style={{ marginTop: '20px' }}>
          <p className="reservation-trip-details-item-title">
            Entrant:
          </p>
          <p>
            <span>{ adults } Adults</span>
            <br/>
            <span>{ childrens } Childrens</span>
            <br/>
            <span>{ infants } Infants</span>
          </p>
        </div>
      </div>
      <hr/>
      <div className="reservation-payment-details-wrapper">
        <h4 className="has-dot">Payment</h4>
        <div className="has-border">
          <p style={{marginBottom:'10px'}}>
            Photographer Fee <span className="pull-right">{`${currency} ${nf.format(reservation['photographerFee' + currency])}`}</span>
          </p>

          <p style={{marginBottom:'10px'}}>
            Service Fee <span className="pull-right">{`${currency} ${nf.format(serviceFee)}`}</span>
          </p>
          <p style={{marginBottom:'0px'}}>
            Credit <span className="pull-right">{`${currency} ${nf.format(credit)}`}</span>
          </p>
        </div>
        <hr/>
        <p className="like-btn grey-color">
          <strong>
            Total <span className="pull-right">{`${currency} ${nf.format(reservation['totalPrice' + currency])}`}</span>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default ReservationDetailInfo;
