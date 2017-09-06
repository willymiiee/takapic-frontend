import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from 'components/Route/PrivateRoute';

import Animator from 'components/common/Animator';

import Home from 'pages/home';
import Signin from 'components/Signin';
import PhotographerDetail from 'components/Profile/PhotographerDetail';
import Search from 'components/Search/Search';
import ScrollToTop from 'components/common/ScrollToTop';
import Secret from 'components/Secret';
import withLocale from 'hoc/withLocale';

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
          <PrivateRoute user={props.user} path="/secret" component={Secret} />
        </Switch>
      </ScrollToTop>
    </div>
  </Router>
);

export default App;
