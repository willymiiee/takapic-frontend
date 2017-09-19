export const photographerReg = (state = {}, action) => {
  if (action.type === 'POPULATE_PHOTOGRAPHER_ACCOUNT_DATA') {
    return { ...state, ...action.payload };
  }
  return state;
};

export const photographerRegSubmit = (state = {}, action) => {
  if (action.type === 'PHOTOGRAPHER_REGISTRATION_DATA_SUBMIT_LOADING') {
    return { isSubmittingData: true, payload: {} };
  } else if (action.type === 'PHOTOGRAPHER_REGISTRATION_DATA_SUBMIT_SUCCESS') {
    return { isSubmittingData: false, payload: action.payload };
  } else if (action.type === 'PHOTOGRAPHER_REGISTRATION_DATA_SUBMIT_ERROR') {
    return { isSubmittingData: 'FAILED', payload: action.payload };
  }
  return state;
};
