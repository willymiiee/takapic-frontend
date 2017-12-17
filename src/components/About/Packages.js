import React from 'react';

import Page from '../Page';

const Packages = props => {
  return (
    <Page>
      <div className="container" style={{ marginTop: '50px'}}>
        <div className="panel setup-content no-box-shadow">
          <div className="panel-body" style={{padding:'0px'}}>
            <h2>Packages</h2>
            <hr/>
            <p style={{textAlign:'justify'}}>
              Prices for our photo shoot packages will vary between destinations and photographers, as we try to cater to all budgets. Standard packages are 1, 2, and 4 hours.
            </p>
            <p style={{textAlign:'justify'}}>
              Groups of 8 people or more require a minimum 2 hours package. Also note that prices do not include any admission fees or transportation fees for the photographer incurred during the photo shoot. This could include but is not limited to for example paid entry to museums or attractions, Uber, transportation etc.
            </p>
            <div className="row">
              <div className="col-sm-6 col-md-3">
                <div className="icon-box-2 with-line">
                  <i className="im im-icon-Camera-2"/>
                  <h3>1 Hour package</h3>
                  <p>
                    Get 30 High Quality photos <br/> 1-2 Locations
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="icon-box-2 with-line">
                  <i className="im im-icon-Camera-3"/>
                  <h3>2 Hour package</h3>
                  <p>
                    Get 60 High Quality photos <br/> 1-3 Locations
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="icon-box-2 with-line">
                  <i className="im im-icon-Camera-Back"/>
                  <h3>4 Hour package</h3>
                  <p>
                    Get 120 High Quality photos <br/> Multiple Locations
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="icon-box-2">
                  <i className="im im-icon-Camera-5"/>
                  <h3>8 Hour package</h3>
                  <p>
                    Get 200 High Quality photos <br/> Multiple Locations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Packages;
