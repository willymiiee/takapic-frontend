import camelCase from 'lodash/camelCase';

const initialState = {
  loading: false,
  loaded: false,
  percentages: [],
};

const photographerServiceInfoStep2 = (state = initialState, action) => {
  switch (action.type) {
    case 'BECOME_OUR_PHOTOGRAPHER_PRICING_CHANGED':
      return {
        ...state,
        loading: false,
        loaded: true,
        ...action.payload,
      };
    case 'SUBMIT_UPLOAD_PORTFOLIO':
      return {
        loading: true,
        loaded: false,
        percentages: action.percentages,
      };
    case 'SUBMIT_UPLOAD_PORTFOLIO_SUCCESS':
      return {
        loading: false,
        loaded: true,
        ...state.percentages,
      };
    case 'SUBMIT_UPLOAD_PORTFOLIO_ERROR':
      return {
        loading: false,
        loaded: true,
        error: action.error,
      };
    default:
      return state;
  }
};

export default photographerServiceInfoStep2;
