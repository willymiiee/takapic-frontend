import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'store/reducers';
import history from 'services/history';
import { routerMiddleware } from 'react-router-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
);
