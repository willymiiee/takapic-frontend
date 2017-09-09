import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

export default class Step2Done extends Component {
  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              <p
                className="text-center margin-top-60"
                style={{ fontSize: '1em' }}
              >
                Thanks!<br />
                Now, it's time for you as a Takapic photographer to wow
                travellers with your beautiful photography!
              </p>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}
