import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import get from "lodash/get";
import { Formik } from "formik";
import Select from 'react-select';
import { Panel } from 'react-bootstrap';
import dropin from 'braintree-web-drop-in';
import { JsonToUrlEncoded } from "../../helpers/helpers";

class BookingForm extends Component {
  componentDidMount() {
    const { setBraintreeInstanceObject } = this.props;

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
      billingCountry: get(props, 'reservation.payment.billingCountry', ''),
      paymentMethod: get(props, 'reservation.payment.method', ''),
      numberOfAdults: get(props, 'reservation.passengers.adults', 0),
      numberOfChildren: get(props, 'reservation.passengers.childrens', 0),
      numberOfInfants: get(props, 'reservation.passengers.infants', 0)
    };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    const { braintreeInstanceObject } = props;
    if (braintreeInstanceObject) {
      braintreeInstanceObject.requestPaymentMethod((error, payload) => {
        console.log('nonce = ', payload.nonce);
      })
    }
    setSubmitting(false);
    /*const data = {
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
        //
      })
      .catch((error) => {
        console.log(error);
      });*/

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

export default BookingFormFormik;
