import React from 'react';

import Page from '../Page';

const AboutUs = props => {
  return (
    <Page>
      <div className="container" style={{ marginTop: '50px'}}>
        <div className="panel setup-content no-box-shadow">
          <div className="panel-body" style={{padding:'0px'}}>
            <h2>About Us</h2>
            <hr/>
            <p style={{textAlign:'justify'}}>
              Founded in May 2017 and based in Indonesia, Takapic is a trusted community marketplace connecting travellers with a community of hundreds of local photographers around the world for a fun and unforgettable photo shoot experience.
            </p>
            <p style={{textAlign:'justify'}}>
              Whether it is an occasion like pre-wedding photoshoot, honeymoon, anniversaries, families on multi-generational trips, couples’ and friend getaways, solo adventures or even marriage proposals, Takapic captures these special moments for you, and at a price that suits you.
            </p>
            <p style={{textAlign:'justify'}}>Our founding team are travel enthusiasts as well as avid photographers. We are growing a vibrant community where people can enjoy an authentic travel experience and have their memories captured in beautiful high quality photos, and local photographers have the chance to showcase their skills and interesting places in their city to a worldwide audience. </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AboutUs;
