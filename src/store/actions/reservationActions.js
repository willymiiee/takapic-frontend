import { database } from "../../services/firebase";

export const fetchReservationAction = travellerId => {
  return dispatch => {
    database
      .database()
      .ref('/reservations')
      .child(travellerId)
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

export const reservationInitializeAction = (travellerId, information) => {
  return dispatch => {
    const db = database.database();
    const reservationRefChild = db.ref('/reservations').child(travellerId);
    reservationRefChild.set(information);

    dispatch({
      type: 'RESERVATION_INITIALIZE',
      payload: information
    });
  };
};

export const reservationPaymentAction = (travellerId, data) => {
  return dispatch => {
    const db = database.database();
    const reservationRefChild = db.ref('/reservations').child(travellerId);
    reservationRefChild.update(data);

    dispatch({
      type: 'RESERVATION_PAYMENT',
      payload: data
    });
  };
};
