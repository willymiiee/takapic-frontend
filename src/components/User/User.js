import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import Page from '../Page'
import BasicInformation from './BasicInformation'
import CameraEquipment from './CameraEquipment'
import MeetingPoints from './MeetingPoints'
import PhotosPortofolio from './PhotosPortofolio'
import PricePackage from './PricePackage'

export default class User extends Component {
  render() {
    const { user: { userMetadata } } = this.props;

    const tabsInstance = (
      <Tabs defaultActiveKey={1} animation={false}>
        <Tab eventKey={1} title="Basic Information">
          <BasicInformation userMetadata={userMetadata}/>
        </Tab>
        <Tab eventKey={2} title="Camera Equipment">
          <CameraEquipment/>
        </Tab>
        <Tab eventKey={3} title="Meeting Points">
          <MeetingPoints/>
        </Tab>
        <Tab eventKey={4} title="Photos Portofolio">
          <PhotosPortofolio/>
        </Tab>
        <Tab eventKey={5} title="Price Package">
          <PricePackage userMetadata={userMetadata}/>
        </Tab>
      </Tabs>
    );

    return (
      <Page>
        <div className="hidden-xs padding-bottom-60"/>
        <div className="container">
          {tabsInstance}
        </div>
      </Page>
    );
  }
}
