import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from 'store/actions';
import _ from 'lodash';
import intl from 'react-intl-universal';
import axios from 'axios';

const locales = [
  {
    label: 'English',
    value: 'en-US',
  },
  {
    label: 'Indonesia',
    value: 'id-ID',
  },
];

let savedLocale = null;

try {
  savedLocale = JSON.parse(localStorage.getItem('locale'));
} catch (ignored) {
  //ignored
}

const withLocale = WrappedComponent =>
  connect(
    state => ({
      locale: state.locale,
      localeLoaded: state.localeLoaded,
    }),
    dispatch => ({
      loadLocales(locale = 'en-US') {
        dispatch({
          type: 'LOAD_LOCALE',
          payload: { locale: locale, initDone: false },
        });
        axios
          .get(`/locales/${locale}.json`)
          .then(res => {
            // init method will load CLDR locale data according to locale
            return intl.init({
              currentLocale: locale,
              locales: {
                [locale]: res.data,
              },
            });
          })
          .then(() => {
            // After loading CLDR locale data, start to render
            window.scrollTo(0, 0);
            dispatch({ type: 'LOCALE_LOADED' });
          })
          .catch(error => console.log(error));
      },
    })
  )(
    class Initiliazed extends Component {
      componentDidMount() {
        this.props.loadLocales();
      }

      onLanguageChange = value => {
        this.props.loadLocales(value);
      };

      render() {
        return (
          <WrappedComponent
            {...this.props}
            locales={locales}
            onLanguageChange={this.onLanguageChange}
          />
        );
      }
    }
  );
export default withLocale;
