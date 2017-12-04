import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchPhotographerServiceInformation,
  resetPhotographerServiceInformationData
} from "../../store/actions/photographerServiceInfoActions";
import get from 'lodash/get';

import Animator from '../common/Animator';
import Page from '../Page';
import Gallery from './PortofolioGallery';
import About from './PortofolioAbout';

class PhotographerPortofolio extends Component {
  constructor() {
    super();

    this.state = {
      activeMenu: "gallery",
    };
  }

  componentDidMount() {
    this.fetchPhotographerInformation();
  }

  componentWillUnmount() {
    this.props.resetPhotographerServiceInformationData();
  }

  fetchPhotographerInformation = () => {
    if (this.props.photographerServiceInformation.loading) {
      const { match: { params: { photographerId } } } = this.props;
      this.props.fetchPhotographerServiceInformation(photographerId);
    }
  };

  handleMenuClick = (event) => {
    const { id } = event.target;
    this.setState({
      activeMenu: id
    })
  };

  getRating = () => {
    const {
      photographerServiceInformation: { data }
    } = this.props;

    let ratings = [];
    let stars = data.serviceReviews.rating.value;
    let starsO = Math.round(5 - stars);
    let key = 0;
    for (let i = 0; i < stars; i++) {
      key++;
      ratings.push(
        <i key={key} className="fa fa-star" />
      )
    }
    for (let j = 0; j < starsO; j++) {
      key++;
      ratings.push(
        <i key={key} className="fa fa-star-o" />
      )
    }

    return ratings;
  };

  render() {
    const {
      photographerServiceInformation: { loading }, currenciesRates
    } = this.props;

    const { activeMenu } = this.state;

    if (!loading && currenciesRates) {
      const { photographerServiceInformation: { data } } = this.props;
      const packagesPrice = get(data, 'packagesPrice', null);
      let convertedPackagesPrice = [];

      if (packagesPrice) {
        convertedPackagesPrice = packagesPrice.map(item => {
          const USDRates = currenciesRates['USD' + data.userMetadata.currency];
          const convertedPrice = Math.round(item.price / USDRates);
          return {...item, price: convertedPrice};
        });
      }

      let mainContent = packagesPrice ? <Gallery data={data} /> : null;
      if (activeMenu === "aboutMe") {
        mainContent = packagesPrice ? <About data={data} convertedPackagesPrice={convertedPackagesPrice}/> : null;
      }

      return (
        <Page>
          <div className="container" id="photographer-portofolio">
            <div className="row">
              <div className="col-sm-3 margin-top-50">
                <div id="photographer-portofolio-left">
                  <img src={data.userMetadata.photoProfileUrl} alt="This is a photographer face" />
                  <h3>{data.userMetadata.displayName}</h3>
                  <h5>{data.userMetadata.locationMerge}</h5>
                  <div className="ratings">
                    {this.getRating()}
                  </div>
                  <hr />
                  <div className="a-block">
                    <div id="gallery" onClick={this.handleMenuClick} style={{cursor: 'pointer'}}>
                      Gallery
                    </div>
                    <div id="aboutMe" onClick={this.handleMenuClick} style={{cursor: 'pointer'}}>
                      About Me
                    </div>
                  </div>
                </div>
              </div>
              {mainContent}
            </div>
          </div>
        </Page>
      );
    }

    return (
      <Animator/>
    )
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
  connect(mapStateToProps, mapDispatchToProps)(PhotographerPortofolio)
);
