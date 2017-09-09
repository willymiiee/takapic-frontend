import React, { Component } from 'react';
import PhotographerPortofolio from 'components/PhotographerPortofolio';

export default class PortofolioAbout extends Component {
  render() {
    return (
      <PhotographerPortofolio>
        <div className="col-sm-9 margin-top-50">
          <div
            id="photographer-portofolio-about"
            className="photographer-portofolio-container"
          >
            <div id="photographer-portofolio-about-photo">
              <img src="images/takapic-bg.jpeg" className="cover" />
            </div>
            <p className="l-h-22">
              Aaron Smith was born and raised in Kansas City. His creative
              interest first began when he turned his bedroom walls into a
              drawing board. A few years after picking up his first skateboard
              he picked up his first camera. Both of them blended together and
              it shaped his photography into what it is today.
            </p>
            <div>Equipment: Canon 50D (Lens: EF17-40mm f4)</div>
            <div>Language: English</div>
            <div>Experience: 5 years</div>
            <div id="photographer-portofolio-tags">
              Speciality: <a href>Wedding</a>, <a href>Couple</a>,{' '}
              <a href>Family</a>
            </div>
            <div id="photographer-portofolio-package">
              Package:
              <div>
                <span>1 hour</span>$100
              </div>
              <div>
                <span>2 hour</span>$200
              </div>
              <div>
                <span>4 hour</span>$400
              </div>
              <div>
                <span>8 hour</span>$800
              </div>
            </div>
          </div>
        </div>
      </PhotographerPortofolio>
    );
  }
}
