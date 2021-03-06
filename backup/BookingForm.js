import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import get from "lodash/get";
import { Formik } from "formik";
import Select from 'react-select';
import { Panel } from 'react-bootstrap';
import dropin from 'braintree-web-drop-in';
import firebase from "firebase";
import Yup from 'yup';
import { JsonToUrlEncoded } from "../../helpers/helpers";
import { database } from "../../services/firebase";
import { RESERVATION_REQUESTED } from "../../services/userTypes";

class BookingForm extends Component {
  componentDidMount() {
    const {
      setBraintreeInstanceObject,
      reservation: { total }
    } = this.props;

    dropin.create({
      authorization: process.env.REACT_APP_BT_TOKENIZATION_KEY,
      paypal: {
        flow: 'checkout',
        amount: total,
        currency: 'USD'
      },
      container: ReactDOM.findDOMNode(this.refs.braintreewrapper)
    }, (createError, instance) => {
      if (createError) {
        console.error('dropin.create Error: ', createError);
        return;
      }
      setBraintreeInstanceObject(instance);
    });
  }

  render() {
    const {
      errors,
      touched,
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
          header="About Your Booking"
          eventKey="1"
        >
          <h5 className="has-dot">Who is coming?</h5>
          <div className="has-border" style={{paddingBottom:'0px'}}>
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
              {
                errors.numberOfAdults && touched.numberOfAdults && (
                  <label style={{color: 'red'}}>{errors.numberOfAdults}</label>
                )
              }
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
              {
                errors.numberOfChildren && touched.numberOfChildren && (
                  <label style={{color: 'red'}}>{errors.numberOfChildren}</label>
                )
              }
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
              {
                errors.numberOfInfants && touched.numberOfInfants && (
                  <label style={{color: 'red'}}>{errors.numberOfInfants}</label>
                )
              }
            </div>
          </div>
          <hr/>
          <h5 className="has-dot">Where Preferred meeting point with your photographer?</h5>
          <div className="has-border" style={{paddingBottom:'0px'}}>
            <Select
              name="meetingPointSelectedValue"
              options={meetingPointsList}
              value={values.meetingPointSelectedValue}
              onChange={_meetingPointChangeHandler}
              clearable={false}
              multi={false}
              placeholder="--- Choose ---"
            />
            {
              errors.meetingPointSelectedValue && touched.meetingPointSelectedValue && (
                <label style={{color: 'red'}}>{errors.meetingPointSelectedValue}</label>
              )
            }
          </div>
          <hr/>
          <h5 className="has-dot">Say Hello To Your Photographer!</h5>
          <div className="has-border" style={{paddingBottom:'0px'}}>
            <textarea name="messageToPhotographer" onChange={handleChange} value={values.messageToPhotographer}/>
            {
              errors.messageToPhotographer && touched.messageToPhotographer && (
                <label style={{color: 'red'}}>{errors.messageToPhotographer}</label>
              )
            }
          </div>
        </Panel>
        <p style={{textAlign:'justify'}}>
          You'll only be charged if your request is accepted by the
          photographer. They'll have 24 hours to accept or decline.
          <span style={{ fontWeight: 'bold' }}>100% Refundable</span>
        </p>

        <div ref="braintreewrapper"/>
        <div className="m-fixed-btn-holder">
          <button
            type="submit"
            className="button radius-8 key-color m-fixed-btn"
            disabled={isSubmitting}
            style={{width:'100%', marginTop:'5px', padding:'11px'}}
          >
            { isSubmitting ? 'Please wait, Processing your payment...' : 'Submit Payment' }
          </button>
        </div>

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
  validationSchema: Yup.object().shape({
    meetingPointSelectedValue: Yup.string().required('Please meeting point'),
    numberOfAdults: Yup.string().required('Please input number of adults will attend the photoshoot'),
    numberOfChildren: Yup.string().required('Please input number of childrens will attend the photoshoot'),
    numberOfInfants: Yup.string().required('Please input number of infants will attend the photoshoot'),
    messageToPhotographer: Yup.string().required('Please write a message for photographer'),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const { braintreeInstanceObject } = props;

    if (braintreeInstanceObject) {
      braintreeInstanceObject.requestPaymentMethod((error, payload) => {
        if (error) {
          console.error('braintreeInstanceObject.requestPaymentMethod Error: ', error);
          setSubmitting(false);
          alert(error.message);
          return;
        }

        if (payload) {
          const {
            reservation: { total, reservationId }
          } = props;

          const dataSubmit = {
            paymentMethodNonce: payload.nonce,
            paymentType: payload.type,
            orderId: reservationId,
            amount: total.toString() + '.00',
            travellerDisplayName: props.travellerDisplayName
          };

          fetch(`${process.env.REACT_APP_API_HOSTNAME}/api/payment/create`, {
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
                  status: RESERVATION_REQUESTED,
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
                let errorMessage = 'Payment failed. Please contact and report to us.';
                if (data.verification.status === 'processor_declined') {
                  errorMessage = 'Credit card not verified / declined';
                } else if (data.verification.status === 'failed') {
                  errorMessage = 'Processor Network Unavailable';
                }
                alert(errorMessage);
              }
            })
            .then(() => {
              setSubmitting(false);
            })
            .catch((error) => {
              console.error('Catch error', error);
            });
        } else {
          alert('Please select a payment method to complete the payment');
        }
      });
    }
  }
})(BookingForm);

export default BookingFormFormik;
