import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from 'components/Route/PrivateRoute';
import Header from 'components/Header';
import Footer from 'components/Footer';

import Home from 'components/Home/Home';
import Signin from 'components/Signin';
import PhotographerDetail from 'components/Profile/PhotographerDetail';
import Search from 'components/Search/Search';
import ScrollToTop from 'components/common/ScrollToTop';
import Secret from 'components/Secret';
import initialize from 'hoc/initialize';

const App = initialize(props =>
  <Router>
    <ScrollToTop>
      <div>
        {props.animator}
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/photographer/:id" component={PhotographerDetail} />
        <Route path="/search" component={Search} />
        <PrivateRoute user={props.user} path="/secret" component={Secret} />
        <Footer
          locales={props.locales}
          currentLocale={props.locale}
          onLanguageChange={props.onLanguageChange}
        />
      </div>
    </ScrollToTop>
  </Router>
);

export default App