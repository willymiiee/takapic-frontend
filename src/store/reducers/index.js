import { combineReducers } from "redux";
import user from "./user";

const rootReducer = combineReducers({
  user,
  locale: (state = "en-US", action) =>
    action.type === "SET_LOCALE" ? action.payload : state,
  localeLoaded: (state = false, action) =>
    action.type === "LOCALE_LOADED"
      ? true
      : action.type === "LOAD_LOCALE" ? false : state,
  bop: (
    state = {
      location: {
        bounds: null,
        center: {
          lat: 47.6205588,
          lng: -122.3212725
        },
        markers: []
      }
    },
    action
  ) => {
    if (action.type === "BECOME_OUR_PHOTOGRAPHER_PLACES_CHANGED") {
      return {
        ...state,
        location: {
          ...state.location,
          ...action.payload
        }
      };
    }
    return state;
  }
});

export default rootReducer;
