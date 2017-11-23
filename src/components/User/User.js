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
  componentWillMount() {
    const {
      photographerServiceInformation: { loading }
    } = this.props;

    if (loading) {
      const uid = this.props.user.userMetadata.uid;
      this.props.fetchPhotographerServiceInformation(uid);
    }
  }

  render() {
    const { user: { userMetadata }, photographerServiceInformation } = this.props;

    const tabsInstance = (
      <Tabs defaultActiveKey={1} animation={false}>
        <Tab eventKey={1} title="Basic Information">
          <BasicInformation userMetadata={userMetadata} photographerServiceInformation={photographerServiceInformation} />
        </Tab>
        <Tab eventKey={2} title="Camera Equipment">
          <CameraEquipment />
        </Tab>
        <Tab eventKey={3} title="Meeting Points">
          <MeetingPoints />
        </Tab>
        <Tab eventKey={4} title="Photos Portofolio">
          <PhotosPortofolio />
        </Tab>
        <Tab eventKey={5} title="Price Package">
          <PricePackage userMetadata={userMetadata} />
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
});

const mapDispatchToProps = dispatch => ({
  fetchPhotographerServiceInformation: uid => dispatch(fetchPhotographerServiceInformation(uid))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(User)
);
