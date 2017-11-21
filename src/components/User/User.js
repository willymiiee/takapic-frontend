import React, { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

import Page from '../Page'
import BasicInformation from './BasicInformation'

export default class User extends Component {
  render() {
    const { user: { userMetadata } } = this.props;

    const tabsInstance = (
      <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
        <Tab eventKey={1} title="Basic Information">
          <BasicInformation userMetadata={userMetadata}/>
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
