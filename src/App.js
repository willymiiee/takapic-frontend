import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withLocale from 'hoc/withLocale';
import PrivateRoute from 'components/Route/PrivateRoute';
import Animator from 'components/common/Animator';
import ScrollToTop from 'components/common/ScrollToTop';

import Home from 'pages/home';
import Signin from 'components/Signin';
import PhotographerDetail from 'components/Profile/PhotographerDetail';
import PortofolioContent from 'components/PhotographerPortofolio/PortofolioContent';
import PortofolioAbout from 'components/PhotographerPortofolio/PortofolioAbout';
import PortofolioReviews from 'components/PhotographerPortofolio/PortofolioReviews';
import Search from 'components/Search/Search';
import Secret from 'components/Secret';
import NotFoundPage from 'pages/not-found';

const App = withLocale(props =>
  <Router>
    <div>
      {props.localeLoaded ? null : <Animator />}
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/photographer/:id" component={PhotographerDetail} />
          <Route path="/search" component={Search} />
          <Route path="/photographer-portofolio/:id" component={PortofolioContent} />
          <Route path="/photographer-portofolio-about" component={PortofolioAbout} />
          <Route path="/photographer-portofolio-reviews" component={PortofolioReviews} />
          <PrivateRoute user={props.user} path="/secret" component={Secret} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </ScrollToTop>
    </div>
  </Router>
);

export default App;
