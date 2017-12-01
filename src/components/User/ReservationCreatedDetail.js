import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { database } from "../../services/firebase";

import './ReservationCreatedDetail.css';
import Page from '../Page';

class ReservationCreatedDetail extends Component {
  constructor() {
    super();
    this.state = {
      messages: null
    }
  }

  componentDidMount() {
    const db = database.database();
    db.ref('messages')
      .orderByChild('reference')
      .equalTo("RKKV-GHGG")
      .on('value', snapshot => {
        this.setState({ messages: snapshot.val() });
      });
  }

  showMeTheState = evt => {
    evt.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <Page>
        <div className="container">
          <div className="reservation-detail-main-wraper">
            <h2>Reservation Detail</h2>

            <div className="left-reservation-detail-wrapper">
              <div className="card bg-white-trans">

                <div className="reservation-photographer-info">
                  <div className="profile-picture">
                    <img
                      className="cover circle-img border-smooth"
                      alt="This is an alt text"
                      src="https://firebasestorage.googleapis.com/v0/b/takapic-project.appspot.com/o/pictures%2Fuser-photo-profile%2Ftahubulat4-getnada-com.jpg?alt=media&token=55a3066e-d5ee-4da8-925c-43e784011a54"
                    />
                  </div>

                  <div className="info-item-text">
                    <h4>Michele</h4>
                    <p style={{ marginTop: '-10px' }}>Kankun, Mexico</p>
                    <p style={{ marginTop: '-25px' }}>0 reviews</p>
                  </div>
                </div>

                <div className="reservation-status-details-wrapper">
                  <h4>Status</h4>
                  <p>REQUESTED</p>
                  <hr/>
                </div>

                <div className="reservation-trip-details-wrapper">
                  <h4>Trip Details</h4>
                  <hr/>

                  <p className="reservation-trip-details-item-title">Photo shoot schedule</p>
                  <p>November 30th 2017 08:00 am - 12:00 pm (4 hours)</p>

                  <p className="reservation-trip-details-item-title">Meeting point</p>
                  <p>Eunoia Coffee</p>
                </div>

                <div className="reservation-payment-details-wrapper">
                  <h4>Payment</h4>
                  <hr/>

                  <p>
                    Photographer Fee <span className="pull-right">USD 0</span>
                  </p>

                  <p>
                    Service Fee <span className="pull-right">USD 0</span>
                  </p>
                  <p>
                    Credit <span className="pull-right">USD 0</span>
                  </p>

                  <p>
                    <strong>
                      Total <span className="pull-right">USD 0</span>
                    </strong>
                  </p>
                </div>

              </div>
            </div>

            <div className="right-reservation-messages-wrapper">
              <div className="card bg-white-trans">

                <div className="messages-list">
                  {
                    this.state.messages && Object.keys(this.state.messages).map(item => {
                      return (
                        <blockquote className="example-twitter" cite="https://twitter.com/necolas/status/9880187933">
                          <p>{ this.state.messages[item].message }</p>
                        </blockquote>
                      )
                    })
                  }
                </div>

                <div>
                  <textarea defaultValue="Halooo"/>
                  <button type="button" onClick={this.showMeTheState}>Send</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default ReservationCreatedDetail;
