import { combineReducers } from 'redux';
import { userAuth, userSignup } from './userReducers';
import { userInitProfile } from './userInitProfileReducers';
import photographerServiceInfo from './photographerServiceInfoReducers';
import photographerServiceInfoStep2 from './photographerServiceInfoReducersStep2';
import profileUpdate from './profileUpdateReducers';

const photographerPhotosPortofolio = (state = [], action) => {
  if (action.type === 'SUBMIT_UPLOAD_PHOTOS_PORTFOLIO_ITEM_SUCCESS') {
    let newData = state.slice();
    newData.splice(state.length, 0, action.payload);
    return newData;
  }
  return state;
};

const photographerServiceInformation = (state = { loading: true, data: {} }, action) => {
  if (action.type === 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_DATA_RESET') {
    return { data: {}, loading: true };

  } else if (action.type === 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_SUCCESS') {
    return {
      data: action.payload,
      loading: false,
    };
  }
  return state;
};

const homepageData = (state = { loading: true }, action) => {
  if (action.type === 'HOMEPAGE_FETCH_TOP_PHOTOGRAPHERS_SUCCESS') {
    return {
      ...state,
      topPhotographers: action.payload,
      loading: false
    };
  }
  return state;
};

const countries = (state = {}, action) => {
  if (action.type === 'INIT_FETCH_COUNTRIES_SUCCESS') {
    return action.payload;
  }
  return state;
};

const currenciesRates = (state = {}, action) => {
  if (action.type === 'FETCH_CURRENCIES_RATES') {
    return action.payload;
  }
  return state;
};

const reservation = (state = {}, action) => {
  switch (action.type) {
    case 'RESERVATION_INITIALIZE':
      return action.payload;

    case 'RESERVATION_PAYMENT':
      return {
        ...state,
        ...action.payload
      };

    case 'RESERVATION_FETCH':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

const photographerListings = (state = [], action) => {
  if (action.type === 'FETCH_PHOTOGRAPHERS_LISTING') {
    return action.payload;
  } else if (action.type === 'EMPTY_PHOTOGRAPHER_LISTINGS') {
    return [];
  }
  return state;
};

const tellThemThatWasSuccessOrFailed = (state = { whatsup: 'nothing' }, action) => {
  if (action.type === 'PROFILE_MANAGER_TELL_THEM_THAT_WAS_SUCCESS_OR_FAILED') {
    return { ...state, whatsup: action.payload };
  }
  return state;
};

const rootReducer = combineReducers({
  userAuth,
  userSignup,
  userInitProfile,
  photographerServiceInfo,
  photographerServiceInfoStep2,
  photographerPhotosPortofolio,
  photographerServiceInformation,
  homepageData,
  countries,
  currenciesRates,
  reservation,
  photographerListings,
  tellThemThatWasSuccessOrFailed,
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
  profileUpdate
});

export default rootReducer;
