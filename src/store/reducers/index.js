import { combineReducers } from 'redux';
import user from './user';
import {
  photographerReg,
  photographerRegSubmit,
} from './photographerRegReducers';

const rootReducer = combineReducers({
  user,
  photographerReg,
  photographerRegSubmit,
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
  authLoaded: (state = false, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
      case 'LOGIN_ERROR':
        return true;
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
