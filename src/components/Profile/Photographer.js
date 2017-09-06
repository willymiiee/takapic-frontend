import React, { Component } from 'react';
import { Rate, Progress, Tag } from 'element-react';
import PhotoProfile from './PhotoProfile';
import SlideShow from './PhotoSlideShow';

import './photographer.css';
// TODO: Cleaning
class Photographer extends Component {
  render() {
    return (
      <div
        className="container photographer-profile"
        style={{ marginTop: '25px', marginBottom: '50px' }}
      >
        <div className="simple-profile" style={{ textAlign: 'center' }}>
          <PhotoProfile
            src="images/sample/happy-client-02.jpg"
            size="100px"
            name="Photografer 4"
            motto="Photograph is Amazing"
          />
          <button className="button border">Contact</button>
        </div>
        <hr />
        <SlideShow
          photos={[
            'images/sample/popular-location-01.jpg',
            'images/sample/popular-location-02.jpg',
            'images/sample/popular-location-03.jpg',
            'images/sample/popular-location-04.jpg',
            'images/sample/queenstown.jpg',
            'images/sample/sydney.jpg',
            'images/sample/tokyo.jpg',
          ]}
        />
        <hr />
        <ul className="timeline">
          <li className="timeline-inverted">
            <div className="timeline-badge" />
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">
                  <b>Profile</b>
                </h4>
              </div>
              <div className="timeline-body">
                <h2>
                  <b>Photographer 4</b>
                </h2>
                <h2>Seoul, South Korea</h2>
                <Tag style={{ marginRight: '5px' }}>Wedding</Tag>
                <Tag>Party</Tag>
              </div>
            </div>
          </li>
          <li className="timeline-inverted">
            <div className="timeline-badge" />
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">
                  <b>Reviews</b>
                </h4>
              </div>
              <div className="timeline-body">
                <div style={{ marginBottom: '10px' }}>
                  <h3 style={{ display: 'inline', marginRight: '10px' }}>
                    Average
                  </h3>
                  <Rate
                    disabled={true}
                    value={3.9}
                    style={{ display: 'inline-flex' }}
                  />{' '}
                  3.9
                </div>
                <div style={{ display: 'flex', textAlign: 'center' }}>
                  <div style={{ marginRight: '10px' }}>
                    <Progress type="circle" percentage={0} />
                    <p>Friendly</p>
                  </div>
                  <div style={{ marginRight: '10px', marginLeft: '10px' }}>
                    <Progress type="circle" percentage={70} />
                    <p>Skill</p>
                  </div>
                  <div style={{ marginLeft: '10px' }}>
                    <Progress type="circle" percentage={90} />
                    <p>Concept</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="timeline-inverted">
            <div className="timeline-badge" />
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">
                  <b>Comments (38)</b>
                </h4>
              </div>
              <div className="timeline-body" />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Photographer;
