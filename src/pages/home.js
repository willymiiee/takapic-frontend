import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select';
import intl from 'react-intl-universal';
import store from '../store';

import '../react-date-picker-custom.css';
import TopPhotographers from '../components/TopPhotographers';
import Page from '../components/Page';

const fetchHomepageData = () => {
  return dispatch => {
    const queryParams = 'filter[destination]=jakarta, indonesia&filter[date]=';
    axios
      .get(`${process.env.REACT_APP_API_HOSTNAME}/api/photographers/?${queryParams}`)
      .then(response => {
        dispatch({
          type: 'HOMEPAGE_FETCH_TOP_PHOTOGRAPHERS_SUCCESS',
          payload: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        destination: null,
        date: null
      }
    };
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();

    let { destination, date } = this.state.search;
    const destinationValStr = !destination ? '' : destination.label;
    const dateValStr = !date ? '' : date.format('YYYY-MM-DD');

    this.props.history.push({
      pathname: '/search/',
      search: 'destination=' + destinationValStr + '&date=' + dateValStr
    });
  };

  handleSearchDestinationChange = value => {
    this.setState({ search: { ...this.state.search, destination: value } });
  };

  handleSearchDateChange = date => {
    this.setState({ search: { ...this.state.search, date } });
  };

  retrieveLocations(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return axios
      .get(`${process.env.REACT_APP_API_HOSTNAME}/api/locations?keyword=${input}`)
      .then(response => {
        return { options: response.data.data };
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    const {
      homepageData: {
        loading: loadingHomepageData
      }
    } = this.props;

    if (loadingHomepageData) {
      store.dispatch(fetchHomepageData());
    } else {
      let bgSlide = window.$('#bg-slide');

      window.$('.search-toggle').click(function() {
        window.$('#landing-page-search').slideToggle();
      });

      setInterval(function() {
        window.$('#bg-slide > img:first').appendTo(bgSlide);
      }, 1000);
    }
  }

  render() {
    const {
      homepageData: {
        loading: loadingHomepageData
      }
    } = this.props;

    if (!loadingHomepageData) {
      const {
        homepageData: {
          topPhotographers
        }
      } = this.props;

      let yesterday = moment().subtract(1, 'day');
      let valid = function (current) {
        return current.isAfter(yesterday);
      };

      return (
        <Page>
          <div id="bg-slide">
            <img src="/images/insung-yoon-259475.jpg" alt=""/>
            <img src="/images/hero_1.jpg" alt=""/>
            <img src="/images/hero_2.jpg" alt=""/>
          </div>

          <div className="container">
            <div id="landing-page-top">
              <img src="/images/takapic-logo/CL small w.png" alt=""/>
              <h1>{ intl.get('TAGLINE') }</h1>
              <p>{ intl.get('SUBHEADER') }</p>

              <div className="search-box-custom-again" style={{ marginTop: '90px'}}>
                <div className="search-box-destination">
                  <Select.Async
                    multi={false}
                    value={this.state.search.destination}
                    onChange={this.handleSearchDestinationChange}
                    valueKey="label"
                    labelKey="label"
                    loadOptions={this.retrieveLocations}
                    placeholder="Choose your destination"
                  />
                </div>

                <div className="search-box-date">
                  <DatePicker
                    dateFormat="MMMM Do YYYY"
                    selected={this.state.search.date}
                    onChange={this.handleSearchDateChange}
                    placeholderText="Choose a date"
                  />
                </div>

                <div className="search-box-submit">
                  <button className="button" onClick={this.handleSearchSubmit}>
                    <i className="fa fa-search"/>
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>

            <h1 className="title margin-bottom-40">Featured Destination</h1>

            <div className="text-right margin-bottom-10">
              <Link to="/">See All</Link>
            </div>

            <div className="row posters">
              <div className="col-xs-4">
                <a className="poster" href="">
                  <div className="text">BALI</div>
                  <img src="images/location/bali.jpg" alt="Featured destination - Bali"/>
                </a>
              </div>

              <div className="col-xs-4">
                <a className="poster" href="/">
                  <div className="text">SEOUL</div>
                  <img src="images/location/seoul.jpg" alt="Featured destination - Seoul"/>
                </a>
              </div>

              <div className="col-xs-4">
                <a className="poster" href="/">
                  <div className="text">PARIS</div>
                  <img src="images/location/paris.jpg" alt="Featured destination - Paris"/>
                </a>
              </div>
            </div>

            <h1 className="title margin-bottom-50">Top Photographers</h1>

            {
              topPhotographers && <TopPhotographers topPhotographers={topPhotographers}/>
            }

            <h1 className="title">Why be a Takapic traveller?</h1>

            <div className="row icons-container">
              <div className="col-sm-4">
                <div className="icon-box-2 with-line">
                  <i className="im im-icon-Map2"/>
                  <h3>Travel like a local</h3>
                  <p>
                    Local photographers will guide you to the best locations in
                    their city so you will not feel like a tourist
                  </p>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="icon-box-2 with-line">
                  <i className="im im-icon-Camera-5"/>
                  <h3>Capture your precious moments</h3>
                  <p>
                    Forget about selfies and photos taken by random strangers. You
                    will be in the hands of a talented photographer with a
                    creative eye ready to capture your best travel memories
                  </p>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="icon-box-2">
                  <i className="im im-icon-Checked-User"/>
                  <h3>Trust and Safety</h3>
                  <p>
                    Only verified photographers are registered and you can view
                    ratings and reviews left by travellers like you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Page>
      );
    }
    return null;
  }
}

export default connect(
  state => ({
    homepageData: state.homepageData
  })
)(Home);
