import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route
} from 'react-router-dom'
import './App.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from './store/actions';

import _ from 'lodash';
import intl from 'react-intl-universal';
import axios from 'axios';

import PrivateRoute from './components/Route/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home/Home';
import Signin from './components/Signin';
import PhotographerDetail from './components/Profile/PhotographerDetail';
import Search from './components/Search/Search';
import ScrollToTop from './components/common/ScrollToTop';
import Secret from './components/Secret';
import Animator from './components/common/Animator';
// import {firebase} from './services/firebase';

const SUPPOER_LOCALES = [
  {
    label: "English",
    value: "en-US"
  },
  {
    label: "Indonesia",
    value: "id-ID"
  }
];

class App extends Component {
  state = {initDone: false, locale: 'en-US'};

  constructor(props) {
    super(props);
    this.props.getUser();
    this.onLanguageChange = this.onLanguageChange.bind(this);
  }

  componentDidMount(){
    this.loadLocales();
  }

  loadLocales() {
    let currentLocale = localStorage.getItem('locale')?localStorage.getItem('locale'):'en-US';
    if (!_.find(SUPPOER_LOCALES, { value: currentLocale })) {
      currentLocale = "en-US";
    }
    this.setState({locale: currentLocale});

    this.setState({ initDone: false });
    axios
      .get(`/locales/${currentLocale}.json`)
      .then(res => {
        // init method will load CLDR locale data according to currentLocale
        return intl.init({
          currentLocale,
          locales: {
            [currentLocale]: res.data
          }
        });
      })
      .then(() => {
        // After loading CLDR locale data, start to render
        window.scrollTo(0, 0);
        this.setState({ initDone: true });
      })
      .catch((error) => console.log(error));
  }

  onLanguageChange(value){
    localStorage.setItem('locale', value);
    this.loadLocales();
  }

  render() {
    let animator = !this.state.initDone?<Animator />:null;
    return (
      <Router>
        <ScrollToTop>
          <div>
            {animator}
            <Header />
            <Route exact path="/" component={Home}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/photographer/:id" component={PhotographerDetail}/>
            <Route path="/search" component={Search}/>
            {/*<Route path="/secret" component={Secret} />*/}
            <PrivateRoute user={this.props.user} path="/secret" component={Secret}/>
            <Footer
              locales={SUPPOER_LOCALES}
              currentLocale={this.state.locale}
              onLanguageChange={this.onLanguageChange} />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
