import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import store from '../../store';
import history from '../../services/history';
import { fetchCurrenciesRates } from "../../store/actions/photographerServiceInfoActions";

import Animator from '../common/Animator';
import Page from '../Page';
import Gallery from './PortofolioGallery';
import About from './PortofolioAbout';

const uid = window.location.pathname.split('/')[2];

const fetchPhotographerServiceInformation = () => {
  return dispatch => {
    dispatch({ type: 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_LOADING' });
    axios
      .get(`${process.env.REACT_APP_API_HOSTNAME}/api/photographers/${uid}`)
      .then(response => {
        dispatch({
          type: 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_SUCCESS',
          payload: response.data.data,
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  };
};

const resetData = () => {
  return dispatch => {
    dispatch({ type: 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_DATA_RESET' })
  };
};

history.listen((location, action) => {
  if (location.pathname.includes('/photographer-portofolio')) {
    store.dispatch(resetData());
  }
});

class PhotographerPortofolio extends Component {
  constructor() {
    super();

    this.state = {
      activeMenu: "gallery",
    }

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentWillMount() {
    const keys = Object.keys(this.props.currenciesRates);
    if (keys.length < 2) {
      this.props.fetchCurrenciesRates();
    }
  }

  componentDidMount() {
    this.fetchPhotographerInformation();
  }

  fetchPhotographerInformation = () => {
    const {
      photographerServiceInformation: { loading }
    } = this.props;

    if (loading) {
      this.props.fetchPhotographerServiceInformation();
    }
  };

  handleMenuClick = (event) => {
    const {id} = event.target;
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

    if (!loading && !currenciesRates.fetchCurrenciesRatesLoading) {
      const { photographerServiceInformation: { data } } = this.props;
      const convertedPackagesPrice = data.packagesPrice.map(item => {
        const USDRates = currenciesRates['USD' + data.userMetadata.currency];
        const convertedPrice = Math.round(item.price / USDRates);
        return { ...item, price: convertedPrice };
      });

      let mainContent = <Gallery data={data} />;
      if (activeMenu === "aboutMe") {
        mainContent = <About data={data} convertedPackagesPrice={convertedPackagesPrice}/>;
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
  fetchPhotographerServiceInformation: () => dispatch(fetchPhotographerServiceInformation()),
  fetchCurrenciesRates: () => dispatch(fetchCurrenciesRates())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhotographerPortofolio)
);
