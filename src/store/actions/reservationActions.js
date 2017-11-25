import { database } from "../../services/firebase";

const fakeTravellerId = 'googlecom-123-456';

export const fetchReservationAction = () => {
  return dispatch => {
    database
      .database()
      .ref('/reservations')
      .child(fakeTravellerId)
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

export const reservationInitializeAction = information => {
  return dispatch => {
    const db = database.database();
    const reservationRefChild = db.ref('/reservations').child(fakeTravellerId);
    reservationRefChild.set(information);

    dispatch({
      type: 'RESERVATION_INITIALIZE',
      payload: information
    });
  };
};

export const reservationPaymentAction = data => {
  return dispatch => {
    const db = database.database();
    const reservationRefChild = db.ref('/reservations').child(fakeTravellerId);
    reservationRefChild.update(data);

    dispatch({
      type: 'RESERVATION_PAYMENT',
      payload: data
    });
  };
};
