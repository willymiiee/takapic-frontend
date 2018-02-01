import firebase from 'firebase';
import { database } from "../../services/firebase";

export const fetchReservationAction = reservationNumber => {
  return dispatch => {
    database
      .database()
      .ref('/reservations')
      .child(reservationNumber)
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        dispatch({
          type: 'RESERVATION_FETCH',
          payload: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const resetEmptyReservationData = () => {
  return dispatch => {
    dispatch({ type: 'RESET_EMPTY_RESERVATION_DATA' });
  };
};

export const reservationInitializeAction = (reservationNumber, information) => {
  return dispatch => {
    const db = database.database();
    const reservationRefChild = db.ref('/reservations').child(reservationNumber);
    information.created = firebase.database.ServerValue.TIMESTAMP;
    information.albumDelivered = 'N';
    reservationRefChild.set(information);

    dispatch({
      type: 'RESERVATION_INITIALIZE',
      payload: information
    });
  };
};

export const reservationPaymentAction = (reservationId, data) => {
  return dispatch => {
    const db = database.database();
    const reservationRefChild = db.ref('/reservations').child(reservationId);
    data.updated = firebase.database.ServerValue.TIMESTAMP;
    reservationRefChild.update(data);

    dispatch({
      type: 'RESERVATION_PAYMENT',
      payload: data
    });
  };
};
