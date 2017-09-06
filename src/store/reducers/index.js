import { combineReducers } from 'redux';
import user from './user';

const rootReducer = combineReducers({
	user,
	locale: (state = 'en-US', action) =>
		action.type === 'SET_LOCALE' ? action.payload : state,
	localeLoaded: (state = false, action) =>
		action.type === 'LOCALE_LOADED'
			? true
			: action.type === 'LOAD_LOCALE' ? false : state,
});

export default rootReducer;
