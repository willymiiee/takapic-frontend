import camelCase from 'lodash/camelCase';

const initialState = {
  loading: false,
  loaded: false,
};

const photographerDetail = (state = initialState, action) => {
  switch (action.type) {
    case 'PHOTOGRAPHER_DETAIL_FETCH':
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case 'PHOTOGRAPHER_DETAIL_FETCH_SUCCESS':
      delete state.error;
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload,
      };
    case 'PHOTOGRAPHER_DETAIL_FETCH_ERROR':
      delete state.data;
      return {
        ...state,
        loading: true,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default photographerDetail;
