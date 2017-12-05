import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchPhotographerServiceInformation,
  resetPhotographerServiceInformationData
} from "../../store/actions/photographerServiceInfoActions";

import Animator from '../common/Animator';
import Page from '../Page';
import PersonalInfoAndNav from './PersonalInfoAndNav';

class PortofolioAbout extends Component {
  componentDidMount() {
    this.fetchPhotographerInformation();
  }

  componentWillUnmount() {
    this.props.resetPhotographerServiceInformationData();
  }

  fetchPhotographerInformation() {
    if (this.props.photographerServiceInformation.loading) {
      const { match: { params: { photographerId } } } = this.props;
      this.props.fetchPhotographerServiceInformation(photographerId);
    }
  }

  convertCurrenciesToUSD(packagesPrice, currency) {
    return packagesPrice.map(item => {
      const USDRates = this.props.currenciesRates['USD' + currency];
      const convertedPrice = Math.round(item.price / USDRates);
      return { ...item, price: convertedPrice };
    });
  }

  render() {
    const {
      photographerServiceInformation: { loading }, currenciesRates
    } = this.props;

    if (!loading && currenciesRates) {
      const {
        photographerServiceInformation: {
          data: {
            userMetadata: photographerUserMetadata,
            userMetadata: {
              currency,
              defaultDisplayPictureUrl
            },
            selfDescription,
            cameraEquipment: { body, lens },
            languages,
            packagesPrice
          }
        }
      } = this.props;

      const convertedPackagesPrice = packagesPrice
        ? this.convertCurrenciesToUSD(packagesPrice, currency)
        : [];

      /* // */
      const packagesPriceList = convertedPackagesPrice.map(m => { return m.price });
      const packagesHoursList = convertedPackagesPrice.map(m => { return m.packageName });

      let contentCameraEquipmentBodies = [];
      body.forEach((body, key) => {
        contentCameraEquipmentBodies.push(<li key={key}>{ body }</li>);
      });

      let contentCameraEquipmentLenses = [];
      lens.forEach((lens, key) => {
        contentCameraEquipmentLenses.push(<li key={key}>{ lens }</li>);
      });

      let contentPackagePrices = [];
      packagesPriceList.forEach((price, key) => {
        contentPackagePrices.push(<p key={key}>USD { price }</p>);
      });

      let contentPackageHours = [];
      packagesHoursList.forEach((hour, key) => {
        contentPackageHours.push(<p key={key}>{ hour }</p>);
      });
      /* // */

      return (
        <Page>
          <div className="container" id="photographer-portofolio">
            <div className="row">
              <div className="col-sm-3 margin-top-50">
                <PersonalInfoAndNav photographerUserMetadata={photographerUserMetadata}/>
              </div>

              {/**/}
              <div className="col-sm-9 margin-top-50">
                <div
                  id="photographer-portofolio-about"
                  className="photographer-portofolio-container"
                >
                  <div className="photographer-portofolio-about-heading-image-wrapper">
                    <div className="photographer-portofolio-about-heading-image-sub-wrapper">
                      <img src={defaultDisplayPictureUrl} alt="This is an alt text"/>
                    </div>
                  </div>

                  <p>{ selfDescription }</p>

                  <ul>
                    <li>
                      <h3>Equipment</h3>
                      <div className="about-content">
                        <ul>
                          <li>
                            <ul>
                              <li><h3>Body</h3></li>
                              <div className="about-content">
                                { contentCameraEquipmentBodies }
                              </div>
                            </ul>
                          </li>

                          <li>
                            <ul>
                              <li><h3>Lens</h3></li>
                              <div className="about-content">
                                { contentCameraEquipmentLenses }
                              </div>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </li>

                    <li>
                      <h3>Language</h3>
                      <div className="about-content">
                        { languages ? languages.join(', ') : '' }
                      </div>
                    </li>

                    <li id="photographer-portofolio-package">
                      <h3>Package</h3>
                      <div className="package">
                        <div className="package-detail hour">
                          { contentPackageHours }
                        </div>
                        <div className="package-detail price">
                          { contentPackagePrices }
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/**/}

            </div>
          </div>
        </Page>
      );
    }

    return <Animator/>
  }
}

const mapStateToProps = state => ({
  photographerServiceInformation: state.photographerServiceInformation,
  currenciesRates: state.currenciesRates
});

const mapDispatchToProps = dispatch => ({
  fetchPhotographerServiceInformation: photographerId => dispatch(fetchPhotographerServiceInformation(photographerId)),
  resetPhotographerServiceInformationData: () => dispatch(resetPhotographerServiceInformationData())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PortofolioAbout)
);
