import React from 'react';
import moment from "moment/moment";

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
          placeLocationNotes
        }
      },
      reservationId,
      created,
      serviceFee,
      total,
      photographerFee,
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

  const packageSelected = packagesPrice.filter(item => item.id === packageId)[0];
  // eslint-disable-next-line
  const hours = parseInt(packageSelected.packageName.replace(/hours?/i, '').trim());
  const startDateAndTimeDisplay = moment(startDateTime).format('MMMM Do YYYY HH:mm a');
  const toEndTime = moment(startDateTime).add(hours, 'h').format('HH:mm a');

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

      <div className="reservation-status-details-wrapper">
        <h4>Reservation Number</h4>
        <p>{ reservationId }</p>
      </div>

      <div className="reservation-status-details-wrapper">
        <h4>Status Reservation</h4>
        <p>{ status }</p>
      </div>

      <div className="reservation-status-details-wrapper">
        <h4>Created</h4>
        <p>{ moment(created).format('MMMM Do YYYY HH:mm a') }</p>
      </div>

      <div className="reservation-trip-details-wrapper">
        <h4>Trip Details</h4>

        <p className="reservation-trip-details-item-title">Photo shoot schedule:</p>
        <p>{ startDateAndTimeDisplay } - { toEndTime } ( { hours } hours )</p>

        <p className="reservation-trip-details-item-title">Meeting point:</p>
        <p>
          { meetingPointName }
          <br/>
          { formattedAddress }
          <br/>
          { placeLocationNotes }
        </p>

        <p className="reservation-trip-details-item-title">Entrant:</p>
        <p>
          <span>Adults: </span>{ adults }
          <br/>
          <span>Childrens: </span>{ childrens }
          <br/>
          <span>Infants: </span>{ infants }
        </p>
      </div>

      <div className="reservation-payment-details-wrapper">
        <h4>Payment</h4>

        <p>
          Photographer Fee <span className="pull-right">USD { photographerFee }</span>
        </p>

        <p>
          Service Fee <span className="pull-right">USD { serviceFee }</span>
        </p>
        <p>
          Credit <span className="pull-right">USD { credit }</span>
        </p>

        <p>
          <strong>
            Total <span className="pull-right">USD { total }</span>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default ReservationDetailInfo;
