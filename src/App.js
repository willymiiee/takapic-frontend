import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import withLocale from "hoc/withLocale";
import PrivateRoute from "components/Route/PrivateRoute";
import Animator from "components/common/Animator";
import ScrollToTop from "components/common/ScrollToTop";
import { ConnectedRouter } from "react-router-redux";
import { connect } from "react-redux";
import qs from "qs";
import history from "services/history";
import { lifecycle, compose } from "recompose";
import { replace } from "react-router-redux";

import Home from "pages/home";
import Signin from "components/Signin";
import PhotographerDetail from "components/Profile/PhotographerDetail";
import PortofolioContent from "components/PhotographerPortofolio/PortofolioContent";
import PortofolioAbout from "components/PhotographerPortofolio/PortofolioAbout";
import PortofolioReviews from "components/PhotographerPortofolio/PortofolioReviews";
import Search from "components/Search/Search";
import Secret from "components/Secret";
import NotFoundPage from "pages/not-found";

import PhotographerRegistrationStep1 from "components/PhotographerRegistration/PhotographerRegistrationStep1";
import PhotographerRegistrationStep2 from "components/PhotographerRegistration/PhotographerRegistrationStep2";
import PhotographerRegistrationStep3 from "components/PhotographerRegistration/PhotographerRegistrationStep3";

import Step1Welcome from "components/BecomeOurPhotographer/Step1Welcome";
import Step1GrabCity from "components/BecomeOurPhotographer/Step1GrabCity";
import Step1GrabInterestingSelfIntroduction from "components/BecomeOurPhotographer/Step1GrabInterestingSelfIntroduction";
import Step1GrabCameraEquipment from "components/BecomeOurPhotographer/Step1GrabCameraEquipment";
import Step2Welcome from "components/BecomeOurPhotographer/Step2Welcome";
import Step2IndicatePrice from "components/BecomeOurPhotographer/Step2IndicatePrice";
import Step2DateAvailability from "components/BecomeOurPhotographer/Step2DateAvailability";
import Step2IntiatePortofolio from "components/BecomeOurPhotographer/Step2InitiatePortofolio";
import Step2SetupMeetingPointA from "components/BecomeOurPhotographer/Step2SetupMeetingPointA";
import Step2SetupMeetingPointB from "components/BecomeOurPhotographer/Step2SetupMeetingPointB";
import Step2Done from "components/BecomeOurPhotographer/Step2Done";

import store from "store";
import { getProfile } from "services/auth";

store.dispatch({ type: "LOADING_AUTH" });
getProfile({
  accessToken: localStorage.getItem("accessToken")
});

const redirect = props => {
  props.replace(
    qs.parse(props.location.search.replace("?", "")).from ||
      qs.parse(props.location.search.replace("?", "")).to ||
      "/"
  );
};

const onlyLoggedOut = WrappedComponent =>
  compose(
    connect(state => ({ user: state.user, authLoaded: state.authLoaded }), {
      replace
    }),
    lifecycle({
      componentDidMount() {
        if (this.props.user) {
          redirect(this.props);
        }
      },
      componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
          redirect(nextProps);
        }
      }
    })
  )(
    props => (props.authLoaded ? <WrappedComponent {...props} /> : <Animator />)
  );

const onlyLoggedIn = WrappedComponent =>
  compose(
    connect(state => ({ user: state.user, authLoaded: state.authLoaded }), {
      replace
    }),
    lifecycle({
      componentDidMount() {
        if (!this.props.user) {
          redirect(this.props);
        }
      },
      componentWillReceiveProps(nextProps) {
        if (!nextProps.user) {
          redirect(nextProps);
        }
      }
    })
  )(
    props => (props.authLoaded ? <WrappedComponent {...props} /> : <Animator />)
  );
const App = connect(state => state)(props => {
  return (
    <Router history={history}>
      <div>
        {props.localeLoaded && props.authLoaded ? null : <Animator />}
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={Signin} />
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
              path="/photographer-registration/s2"
              component={onlyLoggedOut(PhotographerRegistrationStep2)}
            />
            <Route
              path="/photographer-registration/s3"
              component={onlyLoggedOut(PhotographerRegistrationStep3)}
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
              component={onlyLoggedIn(Step2IntiatePortofolio)}
            />
            <Route
              path="/become-our-photographer/step-2-3"
              component={onlyLoggedIn(Step2IntiatePortofolio)}
            />
            <Route
              path="/become-our-photographer/step-2-4a"
              component={onlyLoggedIn(Step2SetupMeetingPointA)}
            />
            <Route
              path="/become-our-photographer/step-2-4b"
              component={onlyLoggedIn(Step2SetupMeetingPointB)}
            />
            <Route
              path="/become-our-photographer/step-2-5"
              component={onlyLoggedIn(Step2Done)}
            />
            <PrivateRoute user={props.user} path="/secret" component={Secret} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </ScrollToTop>
      </div>
    </Router>
  );
});

export default App;
