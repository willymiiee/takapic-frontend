import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from 'services/history';

import Home from 'pages/home';
import PhotographerPortofolio from 'components/PhotographerPortofolio/PhotographerPortofolio';
import PhotographerBooking from 'components/Profile/PhotographerBooking';
import PhotographerDetail from 'components/Profile/PhotographerDetail';
import Search from 'components/Search/Search';
import NotFoundPage from 'pages/not-found';
import SignIn from './components/SignIn/SignIn';

import PhotographerRegistrationStep1 from 'components/PhotographerRegistration/PhotographerRegistrationStep1';
import PhotographerRegistrationStep1CheckMail from 'components/PhotographerRegistration/PhotographerRegistrationStep1CheckMail';
import PhotographerRegistrationStep2 from 'components/PhotographerRegistration/PhotographerRegistrationStep2';
import PhotographerRegistrationStep3 from 'components/PhotographerRegistration/PhotographerRegistrationStep3';
import PhotographerRegistrationStepFinish from 'components/PhotographerRegistration/PhotographerRegistrationStepFinish';

import WelcomePhotographer from 'components/BecomeOurPhotographer/WelcomePhotographer';
import Step1Welcome from 'components/BecomeOurPhotographer/Step1Welcome';
import Step1GrabCityNew from './components/BecomeOurPhotographer/Step1GrabCityNew';
import Step1GrabInterestingSelfIntroduction from 'components/BecomeOurPhotographer/Step1GrabInterestingSelfIntroduction';
import Step1GrabCameraEquipment from 'components/BecomeOurPhotographer/Step1GrabCameraEquipment';
import Step2Welcome from 'components/BecomeOurPhotographer/Step2Welcome';
import Step2IndicatePrice from 'components/BecomeOurPhotographer/Step2IndicatePrice';
import Step2DateAvailability from 'components/BecomeOurPhotographer/Step2DateAvailability';
import Step2InitiatePortofolio from 'components/BecomeOurPhotographer/Step2InitiatePortofolio';
import Step2SetupMeetingPointA from 'components/BecomeOurPhotographer/Step2SetupMeetingPointA';
import Step2Done from 'components/BecomeOurPhotographer/Step2Done';
import TravellerRegistration from 'components/Traveller/TravellerRegistration';
import ReservationCreatedDetail from 'components/User/ReservationCreatedDetail';
import User from 'components/User/User';
import PhotographerFaq from 'components/About/PhotographerFaq';
import PrivacyPolicy from "./components/About/PrivacyPolicy";
import TravellerFaq from "./components/About/TravellerFaq";
import AboutUs from "./components/About/AboutUs";
import Packages from "./components/About/Packages";
import ContactUs from "./components/About/ContactUs";
import HowItWorks from "./components/About/HowItWorks";

import 'index.css';
import 'element-theme-default';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    { ...rest }
    render={(props) => {
      const initialLoginData = localStorage.getItem('initial_login_data');
      if (!initialLoginData) {
        return <Redirect
          to={{
            pathname: '/',
            state: { from: 'hahaha' }
          }}
        />
      }
      return <Component { ...props }/>
    }}
  />
);

const App = (props) => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/booking/:photographerId/:reservationId" component={PhotographerBooking}/>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/photographer/:photographerId" component={PhotographerDetail} />
      <PrivateRoute path="/me/reservations/:reservationid" component={ReservationCreatedDetail} />
      <Route path="/search" component={Search} />
      <Route path="/traveller-registration" component={TravellerRegistration} />
      <Route
        path="/photographer-portofolio/:photographerId"
        component={PhotographerPortofolio}
      />
      <Route
        path="/welcome-photographer"
        component={WelcomePhotographer}
      />
      <Route
        path="/photographer-registration/s1"
        component={PhotographerRegistrationStep1}
      />
      <Route
        path="/photographer-registration/s1-checkmail"
        component={PhotographerRegistrationStep1CheckMail}
      />
      <PrivateRoute
        path="/photographer-registration/s2"
        component={PhotographerRegistrationStep2}
      />
      <PrivateRoute
        path="/photographer-registration/s3"
        component={PhotographerRegistrationStep3}
      />
      <PrivateRoute
        path="/photographer-registration/finish"
        component={PhotographerRegistrationStepFinish}
      />
      <PrivateRoute
        path="/become-our-photographer/welcome-1"
        component={Step1Welcome}
      />
      <PrivateRoute
        path="/become-our-photographer/step-1-1"
        component={Step1GrabCityNew}
      />
      <PrivateRoute
        path="/become-our-photographer/step-1-2"
        component={Step1GrabInterestingSelfIntroduction}
      />
      <PrivateRoute
        path="/become-our-photographer/step-1-3"
        component={Step1GrabCameraEquipment}
      />
      <PrivateRoute
        path="/become-our-photographer/welcome-2"
        component={Step2Welcome}
      />
      <PrivateRoute
        path="/become-our-photographer/step-2-1"
        component={Step2IndicatePrice}
      />
      <PrivateRoute
        path="/become-our-photographer/step-2-2"
        component={Step2DateAvailability}
      />
      <PrivateRoute
        path="/become-our-photographer/step-2-3"
        component={Step2SetupMeetingPointA}
      />
      <PrivateRoute
        path="/become-our-photographer/step-2-4"
        component={Step2InitiatePortofolio}
      />
      <PrivateRoute
        path="/become-our-photographer/step-2-5"
        component={Step2Done}
      />
      <PrivateRoute
        path="/me/edit"
        component={User}
      />
      <Route
        path="/traveller-faq"
        component={TravellerFaq}/>
      <Route
        path="/privacy-policy"
        component={PrivacyPolicy}/>
      <Route
        path="/about-us"
        component={AboutUs}/>
      <Route
        path="/packages"
        component={Packages}/>
      <Route
        path="/contact-us"
        component={ContactUs}/>
      <Route
        path="/photographer-faq"
        component={PhotographerFaq}/>
      <Route
        path="/how-it-works"
        component={HowItWorks}/>
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </Router>
);

export default App;
