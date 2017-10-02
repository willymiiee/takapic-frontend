import { combineReducers } from 'redux';
import { userAuth, userSignup } from './userReducers';
import { userInitProfile } from './userInitProfileReducers';
import photographerServiceInfo from './photographerServiceInfoReducers';
import photographerServiceInfoStep2 from './photographerServiceInfoReducersStep2';
import photographerCameraEquipment from './photographerCameraEquipment';

const rootReducer = combineReducers({
  userAuth,
  userSignup,
  userInitProfile,
  photographerServiceInfo,
  photographerServiceInfoStep2,
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
