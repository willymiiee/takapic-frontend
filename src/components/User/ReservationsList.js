import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
          <h3 className="margin-top-0">Your reservations list</h3>
          <hr/>
          <div className="table-responsive">
            <table className="basic-table table table-list-reservation">
              <tbody>
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Date</th>
                  { userType === USER_PHOTOGRAPHER ? null : <th>Destination</th> }
                  { userType === USER_PHOTOGRAPHER ? <th>Customer</th> : <th>Photographer</th> }
                  <th>Price</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>

                {
                  isFetched && reservationsList && reservationsListFiltered.map((item, index) => (
                    <tr key={index}>
                      <td>{ index + 1 }</td>
                      <td>{ item.reservationId }</td>
                      <td>{ moment(item.startDateTime).format('MMMM Do YYYY') }</td>
                      { userType === USER_PHOTOGRAPHER ? null : <td>{ item.destination }</td> }

                      { userType === USER_PHOTOGRAPHER
                        ? <td>{ item.uidMapping[item.travellerId].displayName }</td>
                        : <td>{ item.uidMapping[item.photographerId].displayName }</td>
                      }
                      <td>USD { item.total }</td>
                      <td>{ item.status }</td>
                      <td>
                        {
                          item.status !== RESERVATION_UNPAID
                            ? (
                              <Link to={`/me/reservations/${item.reservationId}/${item.photographerId}`} style={{ textDecoration: 'underline' }}>
                                View detail
                              </Link>
                            )
                            : (
                              <Link to={`/booking/${item.photographerId}/${item.reservationId}/`} style={{ textDecoration: 'underline' }}>
                                Process payment
                              </Link>
                            )
                        }
                      </td>
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

export default connect(
  state => ({
    user: state.userAuth,
    reservations: state.reservations
  }),
  dispatch => ({
    fetchReservationsList: (userUID, userType) => dispatch(fetchReservationsList(userUID, userType)),
    emptyFetchedReservations: () => dispatch(emptyFetchedReservations())
  })
)(ReservationsList);
