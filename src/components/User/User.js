import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from "react-bootstrap";
import history from '../../services/history';
import {
  fetchPhotographerServiceInformation,
  resetPhotographerServiceInformationData
} from "../../store/actions/photographerServiceInfoActions";

import Animator from '../common/Animator';
import Page from "../Page";
import BasicInformation from "./BasicInformation";
import CameraEquipment from "./CameraEquipment";
import MeetingPoints from "./MeetingPoints";
import PhotosPortofolio from "./PhotosPortofolio";
import PackagesPrice from "./PackagesPrice";

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
  }

  getPhotographerServiceInformation = () => {
    const {
      photographerServiceInformation: { loading }, user: { userMetadata }
    } = this.props;

    if (loading) {
      if (userMetadata.userType === "photographer") {
        const uid = userMetadata.uid;
        this.props.fetchPhotographerServiceInformation(uid);
      } else {
        history.push('/');
      }
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
        continent: countriesSource[key].continent
      });

      currenciesObjects[countryCode] = countriesSource[key].currency_code;
    }

    this.setState({ countries: countriesList, currencies: currenciesObjects });
  };

  handleSelectedTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    if (this.props.photographerServiceInformation.loading || this.props.profile.loading) {
      return (<Animator/>);
    } else {
      const {photographerServiceInformation, activeTab, profile} = this.props;

      const tabsInstance = (
        <Tabs id="userInformation" defaultActiveKey={activeTab} animation={false}
              onSelect={(activeTab) => this.handleSelectedTab(activeTab)}>
          <Tab eventKey={1} title="Basic Information">
            <BasicInformation photographerServiceInformation={photographerServiceInformation} state={this.state}/>
          </Tab>

          <Tab eventKey={2} title="Camera Equipment">
            <CameraEquipment photographerServiceInformation={photographerServiceInformation}/>
          </Tab>

          <Tab eventKey={3} title="Meeting Points">
            { this.state.activeTab === 3 ? <MeetingPoints photographerServiceInformation={photographerServiceInformation}/> : null }
          </Tab>

          <Tab eventKey={4} title="Photos Portofolio">
            <PhotosPortofolio photographerServiceInformation={photographerServiceInformation} profile={profile}/>
          </Tab>

          <Tab eventKey={5} title="Packages Price">
            <PackagesPrice photographerServiceInformation={photographerServiceInformation}/>
          </Tab>
        </Tabs>
      );

      return (
        <Page>
          <div className="hidden-xs padding-bottom-60"/>
          <div className="container">{ tabsInstance }</div>
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
});

const mapDispatchToProps = dispatch => ({
  fetchPhotographerServiceInformation: uid => dispatch(fetchPhotographerServiceInformation(uid)),
  resetPhotographerServiceInformationData: () => dispatch(resetPhotographerServiceInformationData())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(User)
);
