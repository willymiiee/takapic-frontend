import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Animator from 'components/common/Animator';
import ScrollToTop from 'components/common/ScrollToTop';
import { connect } from 'react-redux';
import qs from 'qs';
import { lifecycle, compose } from 'recompose';
import { replace } from 'react-router-redux';

import history from 'services/history';
import store from 'store';

import Home from 'pages/home';
import PhotographerBooking from 'components/Profile/PhotographerBooking';
import PhotographerDetail from 'components/Profile/PhotographerDetail';
import PortofolioContent from 'components/PhotographerPortofolio/PortofolioContent';
import PortofolioAbout from 'components/PhotographerPortofolio/PortofolioAbout';
import PortofolioReviews from 'components/PhotographerPortofolio/PortofolioReviews';
import Search from 'components/Search/Search';
import NotFoundPage from 'pages/not-found';
import SignIn from './components/SignIn/SignIn';

import PhotographerRegistrationStep1 from 'components/PhotographerRegistration/PhotographerRegistrationStep1';
import PhotographerRegistrationStep1CheckMail from 'components/PhotographerRegistration/PhotographerRegistrationStep1CheckMail';
import PhotographerRegistrationStep2 from 'components/PhotographerRegistration/PhotographerRegistrationStep2';
import PhotographerRegistrationStep3 from 'components/PhotographerRegistration/PhotographerRegistrationStep3';
import PhotographerRegistrationStepFinish from 'components/PhotographerRegistration/PhotographerRegistrationStepFinish';

import Step1Welcome from 'components/BecomeOurPhotographer/Step1Welcome';
import Step1GrabCity from 'components/BecomeOurPhotographer/Step1GrabCity';
import Step1GrabInterestingSelfIntroduction from 'components/BecomeOurPhotographer/Step1GrabInterestingSelfIntroduction';
import Step1GrabCameraEquipment from 'components/BecomeOurPhotographer/Step1GrabCameraEquipment';
import Step2Welcome from 'components/BecomeOurPhotographer/Step2Welcome';
import Step2IndicatePrice from 'components/BecomeOurPhotographer/Step2IndicatePrice';
import Step2DateAvailability from 'components/BecomeOurPhotographer/Step2DateAvailability';
import Step2InitiatePortofolio from 'components/BecomeOurPhotographer/Step2InitiatePortofolio';
import Step2SetupMeetingPointA from 'components/BecomeOurPhotographer/Step2SetupMeetingPointA';
import Step2Done from 'components/BecomeOurPhotographer/Step2Done';

store.dispatch({ type: 'USER_AUTH_LOADING_AUTH' });

const redirect = props => {
  props.replace(
    qs.parse(props.location.search.replace('?', '')).from ||
      qs.parse(props.location.search.replace('?', '')).to ||
      '/'
  );
};

const onlyLoggedOut = WrappedComponent =>
  compose(
    connect(state => ({ user: state.userAuth }), {
      replace,
    }),
    lifecycle({
      componentDidMount() {
        if (this.props.user.uid) {
          redirect(this.props);
        }
      },
      componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
          redirect(nextProps);
        }
      },
    })
  )(props => <WrappedComponent {...props} />);

const onlyLoggedIn = WrappedComponent =>
  compose(
    connect(state => ({ user: state.userAuth }), {
      replace,
    }),
    lifecycle({
      componentDidMount() {
        if (!this.props.user.uid) {
          redirect(this.props);
        }
      },
      componentWillReceiveProps(nextProps) {
        if (!nextProps.user) {
          redirect(nextProps);
        }
      },
    })
  )(props => <WrappedComponent {...props} />);

const App = connect(state => state)(props => {
  return (
    <Router history={history}>
      <div>
        {props.localeLoaded ? null : <Animator />}
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/booking" component={PhotographerBooking} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/photographer/:id" component={PhotographerDetail} />
            <Route path="/search" component={Search} />
            <Route
              path="/photographer-portofolio/:id"
              component={PortofolioContent}
            />
            <Route
              path="/photographer-portofolio-about"
              component={PortofolioAbout}
            />
            <Route
              path="/photographer-portofolio-reviews"
              component={PortofolioReviews}
            />
            <Route
              path="/photographer-registration/s1"
              component={onlyLoggedOut(PhotographerRegistrationStep1)}
            />
            <Route
              path="/photographer-registration/s1-checkmail"
              component={PhotographerRegistrationStep1CheckMail}
            />
            <Route
              path="/photographer-registration/s2"
              component={onlyLoggedIn(PhotographerRegistrationStep2)}
            />
            <Route
              path="/photographer-registration/s3"
              component={onlyLoggedIn(PhotographerRegistrationStep3)}
            />
            <Route
              path="/photographer-registration/finish"
              component={onlyLoggedIn(PhotographerRegistrationStepFinish)}
            />
            <Route
              path="/become-our-photographer/welcome-1"
              component={onlyLoggedIn(Step1Welcome)}
            />
            <Route
              path="/become-our-photographer/step-1-1"
              component={onlyLoggedIn(Step1GrabCity)}
            />
            <Route
              path="/become-our-photographer/step-1-2"
              component={onlyLoggedIn(Step1GrabInterestingSelfIntroduction)}
            />
            <Route
              path="/become-our-photographer/step-1-3"
              component={onlyLoggedIn(Step1GrabCameraEquipment)}
            />
            <Route
              path="/become-our-photographer/welcome-2"
              component={onlyLoggedIn(Step2Welcome)}
            />
            <Route
              path="/become-our-photographer/step-2-1"
              component={onlyLoggedIn(Step2IndicatePrice)}
            />
            <Route
              path="/become-our-photographer/step-2-2"
              component={onlyLoggedIn(Step2DateAvailability)}
            />
            <Route
              path="/become-our-photographer/step-2-3"
              component={onlyLoggedIn(Step2SetupMeetingPointA)}
            />
            <Route
              path="/become-our-photographer/step-2-4"
              component={onlyLoggedIn(Step2InitiatePortofolio)}
            />
            <Route
              path="/become-our-photographer/step-2-5"
              component={onlyLoggedIn(Step2Done)}
            />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </ScrollToTop>
      </div>
    </Router>
  );
});

export default App;
