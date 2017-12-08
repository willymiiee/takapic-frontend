import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
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
  constructor() {
    super();
    this.state = {
      search: {
        destination: { label: 'Anywhere' },
        date: null
      }
    };
    this.interval = null;
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
    }

    let bgSlide = window.$('#bg-slide');
    this.interval = setInterval(function() {
      window.$('#bg-slide > img:first').appendTo(bgSlide);
    }, 6000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      homepageData: {
        loading: loadingHomepageData,
        topPhotographers
      }
    } = this.props;

    return (
      <Page>
        <div id="bg-slide">
          <img src="/images/insung-yoon-259475.jpg" alt="This is an alt text"/>
          <img src="/images/hero_1.jpg" alt="This is an alt text"/>
          <img src="/images/hero_2.jpg" alt="This is an alt text"/>
        </div>

        <div className="container">
          <div id="landing-page-top">
            <img src="/images/takapic-logo/CL small w.png" alt="This is an alt text"/>
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
                  placeholder="Choose your destination or leave it empty to go Anywhere"
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
              <Link to="/search/?destination=Bali,%20Indonesia&date=" className="poster">
                <div className="text">BALI</div>
                <img src="images/location/bali.jpg" alt="Featured destination - Bali"/>
              </Link>
            </div>

            <div className="col-xs-4">
              <Link to="/search/?destination=Seoul,%20South%20Korea&date=" className="poster">
                <div className="text">SEOUL</div>
                <img src="images/location/seoul.jpg" alt="Featured destination - Seoul"/>
              </Link>
            </div>

            <div className="col-xs-4">
              <Link to="/search/?destination=Paris,%20France&date=" className="poster">
                <div className="text">PARIS</div>
                <img src="images/location/paris.jpg" alt="Featured destination - Paris"/>
              </Link>
            </div>
          </div>

          <h1 className="title margin-bottom-50">Top Photographers</h1>

          {
            topPhotographers && !loadingHomepageData ? <TopPhotographers topPhotographers={topPhotographers}/> : null
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
}

export default connect(
  state => ({
    homepageData: state.homepageData
  })
)(Home);
