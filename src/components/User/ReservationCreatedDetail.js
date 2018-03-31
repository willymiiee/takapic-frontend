import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import size from 'lodash/size';
import moment from 'moment';
import axios from "axios";
import { database } from "../../services/firebase";
import {
  fetchPhotographerServiceInformation,
  resetPhotographerServiceInformationData
} from "../../store/actions/photographerServiceInfoActions";
import {
  fetchReservationAction,
  resetEmptyReservationData
} from "../../store/actions/reservationActions";
import { emailNotificationEndpoint } from "../../helpers/helpers";
import { RESERVATION_COMPLETED, RESERVATION_PAID, RESERVATION_ACCEPTED, USER_PHOTOGRAPHER } from "../../services/userTypes";

import './ReservationCreatedDetail.css';
import Page from '../Page';
import Animator from '../common/Animator';
import UserAccountPanel from './UserAccountPanel';
import ReservationDetailInfo from './ReservationDetailInfo';

class ReservationCreatedDetail extends Component {
  constructor() {
    super();
    this.state = {
      messages: null,
      messageText: '',
      isSendingMessage: false,
      chatShow: false,
      isAcceptingBooking: false
    };
    this.minimize = this.minimize.bind(this);
    this.maxsimize = this.maxsimize.bind(this);
  }

  minimize() {
    this.setState({chatShow: false});
  }
  maxsimize() {
    this.setState({chatShow: true});
  }

  componentDidMount() {
    const { reservationid, photographerId } = this.props.match.params;
    this.fetchMessages(reservationid);
    this.props.fetchReservationAction(reservationid);
    if (this.props.photographerServiceInformation.loading) {
      this.props.fetchPhotographerServiceInformation(photographerId);
    }
  }

  componentWillUnmount() {
    ReservationCreatedDetail.turnOffFetchMessagesListen(this.props.match.params.reservationid);
    this.props.resetPhotographerServiceInformationData();
    this.props.resetEmptyReservationData();
  }

  fetchMessages(reservationNumber) {
    database
      .database()
      .ref('reservation_messages')
      .child(reservationNumber)
      .on('value', snapshot => {
        this.setState({ messages: snapshot.val() });
      });
  }

  static turnOffFetchMessagesListen(reservationNumber) {
    database
      .database()
      .ref('reservation_messages')
      .child(reservationNumber)
      .off();
  }

  messageTextChangeHandler = (evt) => {
    this.setState({ messageText: evt.target.value });
  };

  sendMessageHandler = () => {
    if (this.state.messageText !== '') {
      this.setState({ isSendingMessage: true });
      const that = this;

      const newData = database
        .database()
        .ref('reservation_messages')
        .child(this.props.match.params.reservationid)
        .push();

      newData.set({
        created: firebase.database.ServerValue.TIMESTAMP,
        sender: this.props.user.uid,
        receiver: this.props.photographerServiceInformation.data.userMetadata.uid,
        message: this.state.messageText
      })
        .then(function () {
          that.setState({isSendingMessage: false, messageText: ''});
        })
        .catch(function (error) {
          that.setState({isSendingMessage: false, messageText: ''});
          alert(error.message);
        });

    } else {
      alert('Cannot empty!');
    }
  };

  setReservationToComplete = (evt) => {
    evt.preventDefault();
    const reservationid = this.props.match.params.reservationid;
    database
      .database()
      .ref('reservations')
      .child(reservationid)
      .update({ status: RESERVATION_COMPLETED })
      .catch((error) => {
        console.log(error);
      });
  };

  setAcceptBooking = (evt) => {
    evt.preventDefault();
    this.setState({ isAcceptingBooking: true });
    const reservationid = this.props.match.params.reservationid;
    const { reservation: { uidMapping, travellerId, photographerId } } = this.props;
    const travellerName = uidMapping[travellerId].displayName;
    const photographerName = uidMapping[photographerId].displayName;

    database
      .database()
      .ref('reservations')
      .child(reservationid)
      .update({ status: RESERVATION_ACCEPTED })
      .then(() => {

        // Start - Send notification email
        const tableStr = "Congrats " + travellerName + ", " + photographerName + " " +
          "has accepted your booking. You will receive his contact details soon and " +
          "can start chatting on the arrangements on day of the photoshoot!";

        const messageData = {
          receiverName: travellerName,
          receiverEmail: "okaprinarjaya@gmail.com",
          emailSubject: "Photographer accepting the reservation",
          emailContent: tableStr
        };

        axios.post(emailNotificationEndpoint(), messageData)
          .then(() => {
            this.setState({ isAcceptingBooking: false });
          });
        // End - Send notification email
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (size(this.props.reservation) > 0) {
      if ([RESERVATION_PAID, RESERVATION_COMPLETED, RESERVATION_ACCEPTED].includes(this.props.reservation.status)) {
        const {
          reservation: { uidMapping },
          user: { uid, userMetadata: { userType } }
        } = this.props;
        const defaultImg = 'https://res.cloudinary.com/debraf3cg/image/upload/v1515151388/assets/default-profile.png';

        return (
          <Page style={{whiteSpace: 'normal'}}>
            <UserAccountPanel>
              <div>
                <h3>Reservation details</h3>
                <div style={{ marginBottom: '10px' }}>
                  {
                    this.props.reservation.status !== RESERVATION_COMPLETED && userType === USER_PHOTOGRAPHER
                      ? <button type="button" onClick={this.setReservationToComplete} style={{ marginRight: '15px' }}>Complete</button>
                      : null
                  }

                  {
                    this.props.reservation.status !== RESERVATION_ACCEPTED && userType === USER_PHOTOGRAPHER
                      ? (
                        <button type="button" onClick={this.setAcceptBooking}>
                          {this.state.isAcceptingBooking ? 'Accepting Booking, Please wait...' : 'Accept this Booking'}
                        </button>
                      )
                      : null
                  }
                </div>
              </div>

              <div className="messages-container margin-top-0">
                <div className="messages-container-inner">

                  <div className="messages-inbox">
                    {
                      size(this.props.reservation) > 0 &&
                      !this.props.photographerServiceInformation.loading
                        ? (
                          <ReservationDetailInfo
                            reservation={this.props.reservation}
                            photographerServiceInformation={this.props.photographerServiceInformation}
                          />
                        )
                        : (
                          <p style={{ margin: '0 auto', fontWeight: 'bold' }}>Please wait...</p>
                        )
                    }
                  </div>

                  <div className="message-content">
                    <div className="header-message-content key-color">
                      <p className={this.state.chatShow ? "" : "pointer"} onClick={this.maxsimize}>Chat</p>
                      <i className={this.state.chatShow ? "fa fa-minus" : ""} aria-hidden="true" onClick={this.minimize}/>
                    </div>
                    <div className= {this.state.chatShow ? "list-message" : "list-message hide"}>
                    {
                      this.state.messages && Object.keys(this.state.messages).map((item) => {
                        const photoProfileUrl = uidMapping[this.state.messages[item].sender].photoProfileUrl;

                        return (
                          <div
                            key={item}
                            className={this.state.messages[item].sender === uid ? 'message-bubble me' : 'message-bubble'}
                          >
                            <div className="message-avatar">
                              <img src={photoProfileUrl !== '-' ? photoProfileUrl : defaultImg} alt="This an alt text"/>
                            </div>

                            <div className="message-text">
                              <p className="time">
                                {moment(this.state.messages[item].created).format('dddd, MMMM Do YYYY HH:mm a')}
                              </p>
                              <p>{this.state.messages[item].message}</p>
                            </div>
                          </div>
                        )
                      })
                    }
                    </div>

                    <div className={this.state.chatShow ? "message-reply" : "message-reply hide"}>
                      <input
                        type="text"
                        placeholder="Say something.."
                        value={this.state.messageText}
                        onChange={this.messageTextChangeHandler}
                      />

                      <button
                        className="button key-color"
                        onClick={this.sendMessageHandler}
                      >
                        {this.state.isSendingMessage ? 'Sending..' : 'Send'}

                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </UserAccountPanel>
          </Page>
        );

      } else {
        return <Redirect to={{ pathname: '/me/reservations' }}/>;
      }
    }

    return <Animator/>
  }
}

export default connect(
  state => ({
    user: state.userAuth,
    reservation: state.reservation,
    photographerServiceInformation: state.photographerServiceInformation
  }),
  dispatch => ({
    fetchReservationAction: (reservationNumber) => dispatch(fetchReservationAction(reservationNumber)),
    fetchPhotographerServiceInformation: (userPhotographerId) => dispatch(fetchPhotographerServiceInformation(userPhotographerId)),
    resetPhotographerServiceInformationData: () => dispatch(resetPhotographerServiceInformationData()),
    resetEmptyReservationData: () => dispatch(resetEmptyReservationData())
  })
)(ReservationCreatedDetail);
