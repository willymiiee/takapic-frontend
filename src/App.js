import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withLocale from 'hoc/withLocale';
import PrivateRoute from 'components/Route/PrivateRoute';
import Animator from 'components/common/Animator';
import ScrollToTop from 'components/common/ScrollToTop';

import Home from 'pages/home';
import Signin from 'components/Signin';
import PhotographerDetail from 'components/Profile/PhotographerDetail';
import PhotographerPortofolio from 'components/PhotographerPortofolio';
import Search from 'components/Search/Search';
import Secret from 'components/Secret';



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
          <Route path="/photographer-portofolio/:id" component={PhotographerPortofolio} />
          <PrivateRoute user={props.user} path="/secret" component={Secret} />
        </Switch>
      </ScrollToTop>
    </div>
  </Router>
);

export default App;
