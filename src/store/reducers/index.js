import { combineReducers } from 'redux';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import orderBy from 'lodash/orderBy';
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
    const packagesPriceXYZ = get(action.payload, 'packagesPrice', false);
    let newPackagesPriceList = [];
    forEach(packagesPriceXYZ, (value, key) => {
      newPackagesPriceList.push({
        ...value,
        id: key
      });
    });

    const sortedList = orderBy(newPackagesPriceList, ['price'], ['asc']);
    let newPackagesPriceObjects = {};
    sortedList.forEach(item => {
      newPackagesPriceObjects[item.id] = {
        packageName: item.packageName,
        price: item.price,
        requirement: item.requirement
      };
    });

    const newPayloadData= {
      ...action.payload,
      packagesPrice: newPackagesPriceObjects,
      meetingPoints: {
        '0000': '--- Choose ---',
        ...action.payload.meetingPoints
      }
    };


    const packagesPrice = get(newPayloadData, 'packagesPrice', false);
    let totalReservationPriceInitiate = 0;

    if (packagesPrice) {
      const packagesPriceObjKeys = Object.keys(packagesPrice);
      const priceOfFirstPackage = packagesPrice[packagesPriceObjKeys[0]].price;
      // eslint-disable-next-line
      const priceMin = parseInt(priceOfFirstPackage);
      totalReservationPriceInitiate = Math.round(priceMin + priceMin * 0.15);
    }

    return {
      data: {
        ...newPayloadData,
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

const currenciesRates = (state = null, action) => {
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
        ...action.payload
      };

    case 'RESERVATION_FETCH':
      return { ...state, ...action.payload };

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
