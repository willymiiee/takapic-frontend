export const reservationInitializeAction = information => {
  return dispatch => {
    dispatch({
      type: 'RESERVATION_INITIALIZE',
      payload: information
    });
  };
};

export const reservationPaymentAction = information => {
  return dispatch => {
    dispatch({
      type: 'RESERVATION_PAYMENT',
      payload: information
    });
  };
};
