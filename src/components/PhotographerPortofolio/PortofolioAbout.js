import React, { Component } from 'react';

export default class PortofolioAbout extends Component {
  render() {
    return (
      <div className="col-sm-9 margin-top-50">
        <div
          id="photographer-portofolio-about"
          className="photographer-portofolio-container"
        >
          <ul>
            <li>
              <h3>About Me</h3>
              <p className="l-h-22 about-content">
                Aaron Smith was born and raised in Kansas City. His creative
                interest first began when he turned his bedroom walls into a
                drawing board. A few years after picking up his first
                skateboard he picked up his first camera. Both of them blended
                together and it shaped his photography into what it is today.
              </p>
            </li>
            <li>
              <h3>Equipment</h3>
              <div className="about-content">
                Canon 50D (Lens: EF17-40mm f4)
              </div>
            </li>
            <li>
              <h3>Language</h3>
              <div className="about-content">English</div>
            </li>
            <li>
              <h3>Experience</h3>
              <div className="about-content">5 years</div>
            </li>
            <li id="photographer-portofolio-tags">
              <h3>Speciality</h3>
              <div className="about-content">
                <a href>Wedding,</a>
                <a href>Couple,</a>
                <a href>Family</a>
              </div>
            </li>
            <li id="photographer-portofolio-package">
              <h3>Package</h3>
              <div className="package">
                <div className="package-detail hour">
                  <p>1 hour</p>
                  <p>2 hours</p>
                  <p>4 hours</p>
                  <p>8 hours</p>
                </div>
                <div className="package-detail price">
                  <p>$100</p>
                  <p>$200</p>
                  <p>$400</p>
                  <p>$800</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
