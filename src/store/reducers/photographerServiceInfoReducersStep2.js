import camelCase from 'lodash/camelCase';

const initialState = null;

const photographerServiceInfoStep2 = (state = initialState, action) => {
  switch (action.type) {
    case 'BECOME_OUR_PHOTOGRAPHER_PRICING_CHANGED':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default photographerServiceInfoStep2;
