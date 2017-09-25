import { combineReducers } from 'redux';
import { userAuth, userSignup } from './userReducers';

const rootReducer = combineReducers({
  userAuth,
  userSignup,
  locale: (state = 'en-US', action) =>
    action.type === 'SET_LOCALE' ? action.payload : state,
  localeLoaded: (state = false, action) => {
    switch (action.type) {
      case 'LOCALE_LOADED':
        return true;
      case 'LOAD_LOCALE':
        return false;
      default:
        return state;
    }
  },
  bop: (
    state = {
      location: {
        bounds: null,
        center: {
          lat: 47.6205588,
          lng: -122.3212725,
        },
        markers: [],
      },
    },
    action
  ) => {
    if (action.type === 'BECOME_OUR_PHOTOGRAPHER_PLACES_CHANGED') {
      return {
        ...state,
        location: {
          ...state.location,
          ...action.payload,
        },
      };
    }
    return state;
  },
});

export default rootReducer;
