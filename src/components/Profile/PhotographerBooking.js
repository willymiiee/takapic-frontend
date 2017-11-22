import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import Yup from 'yup';
import { Button, Col, Panel, Row } from 'react-bootstrap';
import { fetchPhotographerServiceInformation } from "../../store/actions/photographerServiceInfoActions";

import Page from '../Page';

const BookingForm = props => {
  const {
    values,
    handleChange,
    handleSubmit
  } = props;

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
            onChange={handleChange}
          />
        </div>

        <h4>Q2. Preferred meeting point with your photographer</h4>

        <select>
          <option>Your location</option>
        </select>

        <h4>
          <strong>Say Hello To Your Photographer</strong>
        </h4>

        <textarea />

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
    </form>
  );
};

const BookingFormFormik = Formik({
  mapPropsToValues: props => ({
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setTimeout(() => {
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
  }

  render() {
    const {
      photographerServiceInformation: { loading },
      reservation: {
        packageSelectedIndex,
        startDateTime,
        photographerFee,
        serviceFee,
        credit,
        total
      }
    } = this.props;

    return (
      <Page>
        <div className="hidden-xs padding-bottom-60" />
        <div className="container">
          <Row>
            <Col sm={6} md={7}>
              <BookingFormFormik/>
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
}

const mapStateToProps = state => ({
  photographerServiceInformation: state.photographerServiceInformation,
  reservation: state.reservation
});

const mapDispatchToProps = dispatch => ({
  fetchPhotographerServiceInformation: uid => dispatch(fetchPhotographerServiceInformation(uid))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhotographerBooking)
);
