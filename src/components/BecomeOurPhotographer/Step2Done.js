import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Page from '../Page';

const Step2Done = (props) => (
  <Page>
    <div className="container" id="photographer-landing">
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
          <p
            className="text-center margin-top-60"
            style={{ fontSize: '1em' }}
          >
            <div style={{marginBottom:'20px'}}><i className="fa fa-check-circle fa-3x" /></div>
            Thanks!<br />
            Now, it's time for you as a Takapic photographer to wow
            travellers with your beautiful photography! Let's go to your <Link style={{textDecoration:"underline", color:"black"}} to={`/photographer/${this.props.user.uid}`}> Portofolio Page </Link>
          </p>
        </div>
      </div>
    </div>
  </Page>
);

export default connect(state => ({ user: state.userAuth }))(Step2Done);
