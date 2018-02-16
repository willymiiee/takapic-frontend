import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import { Tabs, Tab } from "react-bootstrap";
import {
  fetchPhotographerServiceInformation,
  resetPhotographerServiceInformationData,
  tellThemThatWasSuccessOrFailed
} from "../../store/actions/photographerServiceInfoActions";
import { setActiveTab } from "../../store/actions/profileUpdateActions";

import Animator from '../common/Animator';
import Page from "../Page";
import UserAccountPanel from './UserAccountPanel';
import BasicInformation from "./BasicInformation";
import CameraEquipment from "./CameraEquipment";
import MeetingPoints from "./MeetingPoints";
import PhotosPortofolio from "./PhotosPortofolio";
import PackagesPrice from "./PackagesPrice";
import ScheduleNotAvailable from './ScheduleNotAvailable';

class User extends Component{
  constructor() {
    super();
    this.state = {
      countries: [],
      currencies: {},
      meetingPoint: null,
      activeTab: 0
    };
  }

  componentDidMount() {
    const { activeTab } = this.props;
    this.formatCountriesSource();
    this.getPhotographerServiceInformation();

    if (activeTab === 3) {
      this.handleSelectedTab(activeTab);
    }
  }

  componentWillUnmount() {
    this.props.resetPhotographerServiceInformationData();
    this.props.setActiveTab(1);
  }

  getPhotographerServiceInformation = () => {
    const {
      photographerServiceInformation: { loading }, user: { userMetadata }
    } = this.props;

    if (loading) {
      this.props.fetchPhotographerServiceInformation(userMetadata.uid);
    }
  };

  formatCountriesSource = () => {
    const { countries: countriesSource } = this.props;
    let countriesList = [];
    let currenciesObjects = {};

    for (let key in countriesSource) {
      const countryCode = countriesSource[key]['iso3166alpha2'];
      countriesList.push({
        value: countryCode,
        label: countriesSource[key].name,
        continent: countriesSource[key].continent,
        phoneDialCode: countriesSource[key].phone_dial_code
      });

      currenciesObjects[countryCode] = countriesSource[key].currency_code;
    }

    this.setState({ countries: countriesList, currencies: currenciesObjects });
  };

  handleSelectedTab = (activeTab) => {
    this.props.tellThemThatWasSuccessOrFailed('nothing');
    this.setState({ activeTab });
  };

  render() {
    if (this.props.photographerServiceInformation.loading || this.props.profile.loading) {
      return (<Animator/>);
    } else {
      const {
        user,
        photographerServiceInformation,
        activeTab,
        profile,
        tellThemThatWasSuccessOrFailedInfo
      } = this.props;

      return (
        <Page style={{whiteSpace:'normal'}}>
          <UserAccountPanel>
            <div>
              {
                tellThemThatWasSuccessOrFailedInfo.whatsup === 'success'
                  ? (
                    <div className="notification success">
                      <p>
                        <span>Success!</span> You did it, enjoy it.
                        &nbsp;
                        <Link
                          style={{textDecoration:"underline", color:"black"}}
                          to={`/photographer-portofolio/${this.props.user.uid}/gallery`}
                        >
                          See your portfolio
                        </Link>
                      </p>
                    </div>
                  )
                  : null
              }

              <Tabs id="userInformation" defaultActiveKey={activeTab} animation={false} onSelect={(activeTab) => this.handleSelectedTab(activeTab)}>
                <Tab eventKey={1} title="Basic Information">
                  <BasicInformation
                    user={this.props.user}
                    photographerServiceInformation={this.props.photographerServiceInformation}
                    countries={this.state.countries}
                    currencies={this.state.currencies}
                  />
                </Tab>

                <Tab eventKey={2} title="Camera Equipment">
                  <CameraEquipment photographerServiceInformation={photographerServiceInformation}/>
                </Tab>

                <Tab eventKey={3} title="Meeting Points">
                  {
                    this.state.activeTab === 3
                      ? <MeetingPoints photographerServiceInformation={photographerServiceInformation}/>
                      : null
                  }
                </Tab>

                <Tab eventKey={4} title="Photos Portofolio">
                  <PhotosPortofolio
                    user={user}
                    photographerServiceInformation={photographerServiceInformation}
                    profile={profile}
                  />
                </Tab>

                <Tab eventKey={5} title="Packages Price">
                  <PackagesPrice photographerServiceInformation={photographerServiceInformation}/>
                </Tab>

                <Tab eventKey={6} title="Schedule">
                  <ScheduleNotAvailable/>
                </Tab>
              </Tabs>
            </div>
          </UserAccountPanel>
        </Page>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.userAuth,
  photographerServiceInformation: state.photographerServiceInformation,
  countries: state.countries,
  activeTab: state.profileUpdate.activeTab,
  profile: state.profileUpdate,
  tellThemThatWasSuccessOrFailedInfo: state.tellThemThatWasSuccessOrFailed
});

const mapDispatchToProps = dispatch => ({
  fetchPhotographerServiceInformation: uid => dispatch(fetchPhotographerServiceInformation(uid)),
  resetPhotographerServiceInformationData: () => dispatch(resetPhotographerServiceInformationData()),
  setActiveTab: (tabIndex) => dispatch(setActiveTab(tabIndex)),
  tellThemThatWasSuccessOrFailed: (whatsup) => dispatch(tellThemThatWasSuccessOrFailed(whatsup))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(User)
);
