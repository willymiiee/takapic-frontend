import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from 'store/actions';
import Animator from 'components/common/Animator';
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

const withLocale = WrappedComponent =>
  connect(null, { getUser })(
    class Initiliazed extends Component {
      state = { initDone: false, locale: 'en-US' };

      constructor(props) {
        super(props);
        this.props.getUser();
        this.onLanguageChange = this.onLanguageChange.bind(this);
      }

      componentDidMount() {
        this.loadLocales();
      }

      loadLocales() {
        let currentLocale = localStorage.getItem('locale')
          ? localStorage.getItem('locale')
          : 'en-US';
        if (!_.find(locales, { value: currentLocale })) {
          currentLocale = 'en-US';
        }
        this.setState({ locale: currentLocale });

        this.setState({ initDone: false });
        axios
          .get(`/locales/${currentLocale}.json`)
          .then(res => {
            // init method will load CLDR locale data according to currentLocale
            return intl.init({
              currentLocale,
              locales: {
                [currentLocale]: res.data,
              },
            });
          })
          .then(() => {
            // After loading CLDR locale data, start to render
            window.scrollTo(0, 0);
            this.setState({ initDone: true });
          })
          .catch(error => console.log(error));
      }

      onLanguageChange(value) {
        localStorage.setItem('locale', value);
        this.loadLocales();
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...this.state}
            locales={locales}
            onLanguageChange={this.onLanguageChange}
            loader={this.state.initDone ? null : <Animator />}
          />
        );
      }
    }
  );
export default withLocale;
