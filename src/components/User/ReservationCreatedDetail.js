import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from "../../services/firebase";

import './ReservationCreatedDetail.css';
import Page from '../Page';
import UserAccountPanel from './UserAccountPanel';

class ReservationCreatedDetail extends Component {
  constructor() {
    super();
    this.state = {
      messages: null,
      imgLoadSuccess:true
    };
  }

  componentDidMount() {
    database
      .database()
      .ref('reservation_messages')
      .child('RKKV-GHGG')
      .on('value', snapshot => {
        this.setState({ messages: snapshot.val() });
      });
  }

  componentWillUnmount() {
    database
      .database()
      .ref('reservation_messages')
      .child('RKKV-GHGG')
      .off();
  }

  _onImgError = () => {
    this.setState({ imgLoadSuccess: false });
  };

  render() {
    const { user: { uid } } = this.props;

    const defaultImage = <img
      className="cover circle-img border-smooth"
      src="/images/default-profile.jpg"
      alt="This is an alt text"
    />;

    const image = <img
      className="cover circle-img border-smooth"
      src="https://firebasestorage.googleapis.com/v0/b/takapic-project.appspot.com/o/pictures%2Fuser-photo-profile%2Ftahubulat4-getnada-com.jpg?alt=media&token=55a3066e-d5ee-4da8-925c-43e784011a54"
      alt="This is an alt text"
      onError={this._onImgError}
    />;

    return (
      <Page style={{whiteSpace:'normal'}}>
        <UserAccountPanel>
          <h3>Reservation details</h3>

          <div className="messages-container margin-top-0">
            <div className="messages-container-inner">
              {/* Messages */}
              <div className="messages-inbox">
                <div className="reservation-detail-wrapper">
                  <div className="reservation-photographer-info">
                    <div className="profile-picture">
                      {this.state.imgLoadSuccess ? image:defaultImage}
                    </div>

                    <div className="info-item-text">
                      <h4>Michele</h4>
                      <p style={{ marginTop: '-10px' }}>Kankun, Mexico</p>
                      <p style={{ marginTop: '-25px' }}>0 reviews</p>
                    </div>
                  </div>

                  <div className="reservation-status-details-wrapper">
                    <h4>Status Reservation</h4>
                    <p>REQUESTED</p>
                  </div>

                  <div className="reservation-trip-details-wrapper">
                    <h4>Trip Details </h4>

                    <p className="reservation-trip-details-item-title">Photo shoot schedule:</p>
                    <p>November 30th 2017 08:00 am - 12:00 pm (4 hours)</p>

                    <p className="reservation-trip-details-item-title">Meeting point:</p>
                    <p>Eunoia Coffee</p>
                  </div>

                  <div className="reservation-payment-details-wrapper">
                    <h4>Payment</h4>

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
              {/* Messages / End */}

              {/* Message Content */}
              <div className="message-content">
                {
                  this.state.messages && Object.keys(this.state.messages).map((item) => {
                    return (
                      <div key={item} className={this.state.messages[item].sender === uid ? 'message-bubble me' : 'message-bubble'}>
                        <div className="message-avatar">
                          <img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70" alt />
                        </div>

                        <div className="message-text">
                          <p>{ this.state.messages[item].message }</p>
                        </div>
                      </div>
                    )
                  })
                }

                {/* Reply Area */}
                <div className="clearfix"/>
                <div className="message-reply">
                  <textarea cols={40} rows={3} placeholder="Your Message" defaultValue={""}/>
                  <button className="button">Send Message</button>
                </div>

              </div>
              {/* Message Content */}
            </div>
          </div>
        </UserAccountPanel>
      </Page>
    );
  }
}

export default connect(
  state => ({ user: state.userAuth })
)(ReservationCreatedDetail);
