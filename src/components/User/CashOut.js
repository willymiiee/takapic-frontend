import React, { Component } from 'react';

import Page from '../Page';
import UserAccountPanel from './UserAccountPanel';

class CashOut extends Component {
  render() {
    return (
      <Page style={{whiteSpace:'normal'}}>
        <UserAccountPanel>
          <h3 className="margin-top-0">Cash Out</h3>
          <hr/>
        </UserAccountPanel>
      </Page>
    )
  }
}

export default CashOut;
