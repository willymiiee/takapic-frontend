import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { database } from "./services/firebase";
import store from 'store';
import registerServiceWorker from './registerServiceWorker';

import App from 'App';
import Animator from 'components/common/Animator';

const fetchCountriesAction = () => {
  return dispatch => {
    const db = database.database();
    const countriesRef = db.ref('/countries');

    return countriesRef.once('value')
      .then(snapshot => {
        return snapshot.val();
      })
      .then(value => {
        return dispatch({
          type: 'INIT_FETCH_COUNTRIES_SUCCESS',
          payload: value
        });
      })
  }
};

const fetchCurrenciesRates = () => {
  return dispatch => {
    const db = database.database();
    const ratesRef = db.ref('/currency_exchange_rates');

    return ratesRef.once('value')
      .then(snapshot => {
        return snapshot.val()
      })
      .then(value => {
        return dispatch({
          type: 'FETCH_CURRENCIES_RATES',
          payload: value
        });
      });
  };
};

const doEverything = () => {
  return dispatch => Promise.all([
    dispatch({ type: 'USER_AUTH_LOADING_AUTH' }),
    dispatch(fetchCountriesAction()),
    dispatch(fetchCurrenciesRates())
  ]);
};

ReactDOM.render(
  <Animator/>,
  document.getElementById('root')
);

store.dispatch(doEverything()).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

  registerServiceWorker();
});
