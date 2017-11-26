import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from "react-bootstrap";

import { fetchPhotographerServiceInformation } from "../../store/actions/photographerServiceInfoActions";

import Page from "../Page";
import BasicInformation from "./BasicInformation";
import CameraEquipment from "./CameraEquipment";
import MeetingPoints from "./MeetingPoints";
import PhotosPortofolio from "./PhotosPortofolio";
import PricePackage from "./PricePackage";

class User extends Component{
  constructor() {
    super();
    this.state = {
      countries: [],
      currencies: {},
    };
  }

  componentWillMount() {
    this.getPhotographerServiceInformation();
    this.formatCountriesSource();
  }

  getPhotographerServiceInformation() {
    const {
      photographerServiceInformation: { loading }, user: { userMetadata }
    } = this.props;

    if (loading) {
      const uid = userMetadata.uid;
      this.props.fetchPhotographerServiceInformation(uid);
    }
  }

  formatCountriesSource() {
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
  }

  render() {
    const { user: { userMetadata }, photographerServiceInformation, activeTab } = this.props;

    const tabsInstance = (
      <Tabs defaultActiveKey={activeTab} animation={false}>
        <Tab eventKey={1} title="Basic Information">
          <BasicInformation userMetadata={userMetadata} photographerServiceInformation={photographerServiceInformation} state={this.state}/>
        </Tab>
        <Tab eventKey={2} title="Camera Equipment">
          <CameraEquipment photographerServiceInformation={photographerServiceInformation}/>
        </Tab>
        <Tab eventKey={3} title="Meeting Points">
          <MeetingPoints />
        </Tab>
        <Tab eventKey={4} title="Photos Portofolio">
          <PhotosPortofolio />
        </Tab>
        <Tab eventKey={5} title="Price Package">
          <PricePackage userMetadata={userMetadata} photographerServiceInformation={photographerServiceInformation} />
        </Tab>
      </Tabs>
    );

    return (
      <Page>
        <div className="hidden-xs padding-bottom-60" />
        <div className="container">{tabsInstance}</div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  photographerServiceInformation: state.photographerServiceInformation,
  countries: state.countries,
  activeTab: state.profileUpdate.activeTab,
});

const mapDispatchToProps = dispatch => ({
  fetchPhotographerServiceInformation: uid => dispatch(fetchPhotographerServiceInformation(uid))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(User)
);
