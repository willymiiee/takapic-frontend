import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import { database } from "../../services/firebase";
import {USER_PHOTOGRAPHER, RESERVATION_UNPAID, RESERVATION_REQUESTED} from "../../services/userTypes";

import Page from '../Page';
import UserAccountPanel from './UserAccountPanel';

const fetchReservationsList = (userUID, userType) => {
  return dispatch => {
    dispatch({ type: 'FETCH_RESERVATIONS_START' });

    let ref = null;
    if (userType === USER_PHOTOGRAPHER) {
      ref = database
        .database()
        .ref('reservations')
        .orderByChild('photographerId');

    } else {
      ref = database
        .database()
        .ref('reservations')
        .orderByChild('travellerId');
    }

    ref
      .equalTo(userUID)
      .once('value')
      .then((snapshot) => {
        const vals = snapshot.val();
        const results = orderBy(vals, ['created'], ['desc']);

        dispatch({
          type: 'FETCH_RESERVATIONS_SUCCESS',
          payload: results
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const emptyFetchedReservations = () => {
  return dispatch => {
    dispatch({ type: 'EMPTY_FETCHED_RESERVATIONS' });
  };
};

class ReservationsList extends Component {
  componentDidMount() {
    if (!this.props.reservations.isFetched) {
      this.props.fetchReservationsList(this.props.user.uid, this.props.user.userMetadata.userType);
    }
  }

  componentWillUnmount() {
    this.props.emptyFetchedReservations();
  }

  detailHandler = (status, reservationId, photographerId) => {
    if (status !== RESERVATION_UNPAID) {
      this.props.history.push(`/me/reservations/${reservationId}/${photographerId}`);
    } else {
      this.props.history.push(`/booking/${photographerId}/${reservationId}`);
    }
  };

  reservationStatusColor = (status) => {
    const colors = {
      "UNPAID": "c-red",
      "ACCEPTED": "c-green",
      "PAID": "c-green",
      "COMPLETED": "c-green"
    };

    return colors[status];
  };

  render() {
    const {
      user: { userMetadata: { userType } },
      reservations: { isFetched, data: reservationsList }
    } = this.props;

    let reservationsListFiltered = reservationsList;
    if (userType === USER_PHOTOGRAPHER) {
      reservationsListFiltered = reservationsList.filter((item) => item.status === RESERVATION_REQUESTED);
    }

    return (
      <Page style={{whiteSpace:'normal'}}>
        <UserAccountPanel>
          <h3 style={{marginBottom:'45px', marginTop:'20px', paddingLeft:'10px'}}>Reservations List</h3>
          <div className="table-responsive no-border">
            <table className="table table-list-reservation">
              <tbody>
                <tr>
                  <th>No</th>
                  <th>Code</th>
                  <th>Date</th>
                  { userType === USER_PHOTOGRAPHER ? null : <th>Destination</th> }
                  { userType === USER_PHOTOGRAPHER ? <th>Customer</th> : <th>Photographer</th> }
                  <th>Price</th>
                  <th>Status</th>
                </tr>

                {
                  isFetched && reservationsList && reservationsListFiltered.map((item, index) => (
                    <tr className="row-hover" key={index} onClick={() => this.detailHandler(item.status, item.reservationId, item.photographerId)}>
                      <td>{ index + 1 }</td>
                      <td>{ item.reservationId }</td>
                      <td>{ moment(item.startDateTime).format('MMMM Do YYYY') }</td>
                      { userType === USER_PHOTOGRAPHER ? null : <td>{ item.destination }</td> }

                      { userType === USER_PHOTOGRAPHER
                        ? <td>{ item.uidMapping[item.travellerId].displayName }</td>
                        : <td>{ item.uidMapping[item.photographerId].displayName }</td>
                      }
                      <td>USD { item.total }</td>
                      <td className={this.reservationStatusColor(item.status)}>{ item.status }</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </UserAccountPanel>
      </Page>
    );
  }
}

export default withRouter(connect(
  state => ({
    user: state.userAuth,
    reservations: state.reservations
  }),
  dispatch => ({
    fetchReservationsList: (userUID, userType) => dispatch(fetchReservationsList(userUID, userType)),
    emptyFetchedReservations: () => dispatch(emptyFetchedReservations())
  })
)(ReservationsList));
