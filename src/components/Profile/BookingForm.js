import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import get from "lodash/get";
import { Formik } from "formik";
import Select from 'react-select';
import { Panel } from 'react-bootstrap';
import dropin from 'braintree-web-drop-in';
import firebase from "firebase";
import { JsonToUrlEncoded } from "../../helpers/helpers";
import { database } from "../../services/firebase";

class BookingForm extends Component {
  componentDidMount() {
    const {
      setBraintreeInstanceObject,
      reservation: { total }
    } = this.props;

    dropin.create({
      authorization: 'sandbox_vfzk4g6x_4cm4s6c4wxpf7zp8',
      paypal: {
        flow: 'checkout',
        amount: total,
        currency: 'USD'
      },
      container: ReactDOM.findDOMNode(this.refs.braintreewrapper)
    }, (createError, instance) => {
      setBraintreeInstanceObject(instance);
    });
  }

  render() {
    const {
      values,
      handleChange,
      handleSubmit,
      setFieldValue,
      isSubmitting,
      meetingPoints,
      meetingPointChangeHandler
    } = this.props;

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

          <textarea name="messageToPhotographer" onChange={handleChange} value={values.messageToPhotographer}/>
        </Panel>

        <p>
          You'll only be charged if your request is accepted by the
          photographer. They'll have 24 hours to accept or decline.
          <br/>
          <span style={{ fontWeight: 'bold' }}>100% Refundable</span>
        </p>

        <div ref="braintreewrapper"/>

        <button
          type="submit"
          className="button"
          disabled={isSubmitting}
        >
          { isSubmitting ? 'Please wait, Processing your payment...' : 'Submit Payment' }
        </button>

      </form>
    );
  }

}

const BookingFormFormik = Formik({
  mapPropsToValues: props => {
    return {
      meetingPointSelectedValue: get(props, 'reservation.meetingPoints.id', ''),
      messageToPhotographer: get(props, 'reservation.message', ''),
      numberOfAdults: get(props, 'reservation.passengers.adults', 0),
      numberOfChildren: get(props, 'reservation.passengers.childrens', 0),
      numberOfInfants: get(props, 'reservation.passengers.infants', 0)
    };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    const { braintreeInstanceObject } = props;

    if (braintreeInstanceObject) {
      braintreeInstanceObject.requestPaymentMethod((error, payload) => {
        const {
          reservation: { total, reservationId }
        } = props;

        const dataSubmit = {
          paymentMethodNonce: payload.nonce,
          paymentType: payload.type,
          orderId: reservationId,
          amount: total.toString() + '.00'
        };

        fetch(`${process.env.REACT_APP_WEB_PROVIDER_HOSTNAME}/payment/create`, {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
          body: JsonToUrlEncoded(dataSubmit)
        })
          .then((response => {
            return response.json();
          }))
          .then((data) => {
            if (data.success) {
              const paymentDetail = {
                method: payload.type,
                trxId: data.transaction.id,
                status: data.transaction.status,
                created: data.transaction.createdAt,
                updated: data.transaction.updatedAt
              };

              if (payload.type === 'PayPalAccount') {
                paymentDetail.paymentId = data.transaction.paypalAccount.paymentId;
                paymentDetail.authorizationId = data.transaction.paypalAccount.authorizationId;
                paymentDetail.payerId = data.transaction.paypalAccount.payerId;
                paymentDetail.payerFirstName = data.transaction.paypalAccount.payerFirstName;
                paymentDetail.payerLastName = data.transaction.paypalAccount.payerLastName;
              } else {
                paymentDetail.cardholderName = data.transaction.creditCard.cardholderName
              }

              const dataReservation = {
                meetingPoints: {
                  type: 'defined',
                  id: values.meetingPointSelectedValue,
                  detail: props.meetingPoints.filter(item => item.id === values.meetingPointSelectedValue)[0]
                },
                payment: paymentDetail,
                passengers: {
                  adults: values.numberOfAdults,
                  childrens: values.numberOfChildren,
                  infants: values.numberOfInfants
                }
              };

              props.reservationPaymentAction(props.reservation.reservationId, dataReservation);

              const newData = database
                .database()
                .ref('reservation_messages')
                .child(props.reservation.reservationId)
                .push();

              newData.set({
                created: firebase.database.ServerValue.TIMESTAMP,
                sender: props.reservation.travellerId,
                receiver: props.reservation.photographerId,
                message: values.messageToPhotographer
              });

              props.goToReservationDetail(props.reservation.reservationId, props.reservation.photographerId);

            } else {
              alert('Payment failed!');
            }

            console.log(data);
          })
          .then(() => {
            setSubmitting(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
    }
  }
})(BookingForm);

export default BookingFormFormik;
