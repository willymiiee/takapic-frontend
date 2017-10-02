export const setPricing = payload => {
  return dispatch => {
    dispatch({
      type: 'BECOME_OUR_PHOTOGRAPHER_PRICING_CHANGED',
      payload,
    });
  };
};
