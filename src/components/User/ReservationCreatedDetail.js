import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import size from 'lodash/size';
import moment from 'moment';
import { database } from "../../services/firebase";
import {
  fetchPhotographerServiceInformation,
  resetPhotographerServiceInformationData
} from "../../store/actions/photographerServiceInfoActions";
import {
  fetchReservationAction,
  resetEmptyReservationData
} from "../../store/actions/reservationActions";

import './ReservationCreatedDetail.css';
import Page from '../Page';
import UserAccountPanel from './UserAccountPanel';
import ReservationDetailInfo from './ReservationDetailInfo';

class ReservationCreatedDetail extends Component {
  constructor() {
    super();
    this.state = {
      messages: null,
      messageText: '',
      isSendingMessage: false
    };
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
    this.turnOffFetchMessagesListen(this.props.match.params.reservationid);
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

  turnOffFetchMessagesListen(reservationNumber) {
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

  render() {
    if (size(this.props.reservation) > 0) {
      const {
        reservation: { uidMapping },
        user: { uid }
      } = this.props;
      const defaultImg = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70';

      return (
        <Page style={{whiteSpace: 'normal'}}>
          <UserAccountPanel>
            <h3>Reservation details</h3>

            <div className="messages-container margin-top-0">
              <div className="messages-container-inner">

                <div className="messages-inbox">
                  {
                    size(this.props.reservation) > 0 &&
                    !this.props.photographerServiceInformation.loading &&
                    <ReservationDetailInfo
                      reservation={this.props.reservation}
                      photographerServiceInformation={this.props.photographerServiceInformation}
                    />
                  }
                </div>

                <div className="message-content">
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
                            <p style={{ fontWeight: 'bold', fontSize: '0.6em' }}>
                              { moment(this.state.messages[item].created).format('dddd, MMMM Do YYYY HH:mm a') }
                            </p>
                            <p>{this.state.messages[item].message}</p>
                          </div>
                        </div>
                      )
                    })
                  }

                  <div className="clearfix"/>

                  <div className="message-reply">
                    <textarea
                      cols={40}
                      rows={1}
                      placeholder="Your Message"
                      value={this.state.messageText}
                      onChange={this.messageTextChangeHandler}
                    />

                    <button
                      className="button"
                      onClick={this.sendMessageHandler}
                    >
                      {this.state.isSendingMessage ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </UserAccountPanel>
        </Page>
      );
    }
    return null;
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
