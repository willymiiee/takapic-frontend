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
    case 'SUBMIT_UPLOAD_PHOTOS_PORTFOLIO':
      return {
        loading: true,
        loaded: false,
        files: action.files,
        percentages: action.percentages,
      };
    case 'SUBMIT_UPLOAD_PHOTOS_PORTFOLIO_SUCCESS':
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case 'SUBMIT_UPLOAD_PHOTOS_PORTFOLIO_ERROR':
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
