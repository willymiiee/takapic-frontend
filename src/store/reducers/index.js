import { combineReducers } from 'redux';
import { userAuth, userSignup } from './userReducers';
import { userInitProfile } from './userInitProfileReducers';
import photographerDetail from './photographerDetailReducers';
import photographerServiceInfo from './photographerServiceInfoReducers';
import photographerServiceInfoStep2 from './photographerServiceInfoReducersStep2';

const photographerPhotosPortofolio = (state = [], action) => {
  if (action.type === 'SUBMIT_UPLOAD_PHOTOS_PORTFOLIO_ITEM_SUCCESS') {
    let newData = state.slice();
    newData.splice(state.length, 0, action.payload);
    return newData;
  }
  return state;
};

const photographerServiceInformation = (
  state = { loading: true, data: {} },
  action
) => {
  if (action.type === 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_SUCCESS') {
    const priceMin = parseInt(action.payload.packagesPrice[0].price);
    const credit = 0;
    const totalReservationPriceInitiate = credit + priceMin + priceMin * 0.15;

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


const rootReducer = combineReducers({
  userAuth,
  userSignup,
  userInitProfile,
  photographerDetail,
  photographerServiceInfo,
  photographerServiceInfoStep2,
  photographerPhotosPortofolio,
  photographerServiceInformation,
  homepageData,
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
});

export default rootReducer;
