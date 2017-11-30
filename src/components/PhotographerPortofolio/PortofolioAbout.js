import React, { Component } from 'react';

export default class PortofolioAbout extends Component {
  render() {
    const { data, convertedPackagesPrice } = this.props;
    let packagePrices = convertedPackagesPrice.map(m => { return m.price });
    let packageHours = convertedPackagesPrice.map(m => { return m.packageName })

    let contentCameraEquipmentBodies = [];
    data.cameraEquipment.body.forEach((body, key) => {
      contentCameraEquipmentBodies.push(<li key={key}>{body}</li>);
    });

    let contentCameraEquipmentLenses = [];
    data.cameraEquipment.lens.forEach((lens, key) => {
      contentCameraEquipmentLenses.push(<li key={key}>{lens}</li>);
    });

    let contentPackagePrices = []
    packagePrices.forEach((price, key) => {
      contentPackagePrices.push(<p key={key}>${price}</p>);
    });

    let contentPackageHours = []
    packageHours.forEach((hour, key) => {
      contentPackageHours.push(<p key={key}>{hour}</p>);
    });

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
                {data.selfDescription}
              </p>
            </li>
            <li>
              <h3>Equipment</h3>
              <div className="about-content">
                <ul>
                  <li>
                    <ul>
                      <li><h3>Body</h3></li>
                      <div className="about-content">
                        {contentCameraEquipmentBodies}
                      </div>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li><h3>Lens</h3></li>
                      <div className="about-content">
                        {contentCameraEquipmentLenses}
                      </div>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <h3>Language</h3>
              <div className="about-content">
                {data.languages ? data.languages.join(', ') : ""}
              </div>
            </li>
            <li id="photographer-portofolio-package">
              <h3>Package</h3>
              <div className="package">
                <div className="package-detail hour">
                  {contentPackageHours}
                </div>
                <div className="package-detail price">
                  {contentPackagePrices}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
