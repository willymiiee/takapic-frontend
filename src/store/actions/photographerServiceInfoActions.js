export const selfDescription = description => {
  return dispatch => {
    dispatch({
      type: 'BECOME_OUR_PHOTOGRAPHER_SELF_INTRO',
      payload: { selfDescription: description },
    });
  };
};
