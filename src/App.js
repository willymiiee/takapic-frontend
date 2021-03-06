import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from 'services/history';
import store from "./store";
import {
  resetPhotographerServiceInformationData,
  // fetchPhotographerListings
} from "./store/actions/photographerServiceInfoActions";
import withGATracker from './hoc/withGATracker';

import ScrollToTop from './components/common/ScrollToTop';
import Home from 'pages/home';
import PortofolioAbout from 'components/PhotographerPortofolio/PortofolioAbout';
import PortofolioGalleryyy from 'components/PhotographerPortofolio/PortofolioGalleryyy';
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
import TermConditions from "./components/About/TermConditions";
import ContactUs from "./components/About/ContactUs";
import HowItWorks from "./components/About/HowItWorks";
import ReservationsList from './components/User/ReservationsList';
import PhotoAlbum from './components/User/PhotoAlbum';
import PhotoAlbumDetail from './components/User/PhotoAlbumDetail';
import CashOut from './components/User/CashOut';
import ContactUsSuccess from './components/About/ContactUsSuccess';
import PaymentSuccess from './components/User/PaymentSuccess';
import PaymentError from './components/User/PaymentError';
import BlogHomepage from './components/Blog/BlogHomepage';
import BlogDetailBelitung from './components/Blog/BlogDetailBelitung';
import BlogDetailBali from './components/Blog/BlogDetailBali';
import BlogDetailGili from './components/Blog/BlogDetailGili';
import BlogDetail from './components/Blog/BlogDetail';

history.listen((location) => {
  if (location.pathname.includes('/photographer') || location.pathname.includes('/photographer-portofolio')) {
    store.dispatch(resetPhotographerServiceInformationData());
  }
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    { ...rest }
    render={(props) => {
      const initialLoginData = localStorage.getItem('initial_login_data');
      if (!initialLoginData) {
        return <Redirect
          to={{
            pathname: '/'
          }}
        />
      }
      return <Component { ...props }/>
    }}
  />
);

const App = (props) => (
  <Router history={history}>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={withGATracker(Home)} />
        <PrivateRoute path="/booking/:photographerId/:reservationId" component={PhotographerBooking}/>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/photographer/:photographerId" component={withGATracker(PhotographerDetail)} />

        <PrivateRoute path="/me/reservations/:reservationid/:photographerId" component={ReservationCreatedDetail} />

        <PrivateRoute path="/me/reservations" component={ReservationsList} />
        <PrivateRoute path="/me/albums/:reservationId" component={PhotoAlbumDetail}/>
        <PrivateRoute path="/me/albums" component={PhotoAlbum}/>
        <PrivateRoute path="/me/cashout" component={CashOut}/>
        <PrivateRoute path="/me/payment/success" component={PaymentSuccess}/>
        <PrivateRoute path="/me/payment/error" component={PaymentError}/>

        <Route path="/search" component={withGATracker(Search)} />
        <Route path="/traveller-registration" component={withGATracker(TravellerRegistration)} />
        <Route
          path="/photographer-portofolio/:photographerId/gallery"
          component={withGATracker(PortofolioGalleryyy)}
        />
        <Route
          path="/photographer-portofolio/:photographerId/about-me"
          component={withGATracker(PortofolioAbout)}
        />
        <Route
          path="/welcome-photographer"
          component={withGATracker(WelcomePhotographer)}
        />
        <Route
          path="/photographer-registration/s1"
          component={withGATracker(PhotographerRegistrationStep1)}
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
          path="/me/edit/photographer"
          component={User}
        />
        <Route
          path="/traveller-faq"
          component={withGATracker(TravellerFaq)}
        />
        <Route
          path="/privacy-policy"
          component={withGATracker(PrivacyPolicy)}
        />
        <Route
          path="/about-us"
          component={withGATracker(AboutUs)}
        />
        <Route
          path="/packages"
          component={withGATracker(Packages)}
        />
        <Route
          path="/term-conditions"
          component={withGATracker(TermConditions)}
        />
        <Route
          path="/contact-us"
          component={withGATracker(ContactUs)}
        />
        <Route
          path="/photographer-faq"
          component={withGATracker(PhotographerFaq)}
        />
        <Route
          path="/how-it-works"
          component={withGATracker(HowItWorks)}
        />
        <Route
          path="/contact-us-success"
          component={ContactUsSuccess}
        />
        <Route
          path="/blog/example"
          component={BlogDetail}
        />
        <Route
          path="/blog/belitung"
          component={BlogDetailBelitung}
        />
        <Route
          path="/blog/bali"
          component={BlogDetailBali}
        />
        <Route
          path="/blog/gili"
          component={BlogDetailGili}
        />
        <Route
          path="/blog"
          component={BlogHomepage}
        />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </ScrollToTop>
  </Router>
);

export default App;
