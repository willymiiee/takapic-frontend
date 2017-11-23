import { combineReducers } from 'redux';
import get from 'lodash/get';
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
    const packagesPrice = get(action.payload, 'packagesPrice', false);
    let totalReservationPriceInitiate = 0;

    if (packagesPrice) {
      const priceMin = parseInt(action.payload.packagesPrice[0].price);
      const credit = 0;
      totalReservationPriceInitiate = Math.round(credit + priceMin + priceMin * 0.15);
    }

    return {
      data: {
        ...action.payload,
        totalReservationPriceInitiate
      },
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
      return {
        packageSelectedIndex: action.payload.packageSelectedIndex,
        startDateTime: action.payload.startDateTime,
        photographerFee: action.payload.photographerFee,
        serviceFee: action.payload.serviceFee,
        credit: action.payload.credit,
        total: action.payload.total
      };

    case 'RESERVATION_PAYMENT':
      return {
        ...state,
        meetingPoints: {
          type: '-',
          detail: {}
        },
        message: '-',
        payment: {
          billingCountry: '',
          method: ''
        },
        passengers: {
          adults: 0,
          childrens: 0,
          infants: 0
        }
      };

    default:
      return state;
  }
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
  profileUpdate,
});

export default rootReducer;
