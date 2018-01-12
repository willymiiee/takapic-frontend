import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import cloudinary from 'cloudinary-core';
import store from '../store';
import { searchInformationLog } from "../store/actions/userActions";
import { reactSelectNewOptionCreator } from "../helpers/helpers";

import '../react-date-picker-custom.css';
import TopPhotographers from '../components/TopPhotographers';
import Page from '../components/Page';

const fetchHomepageData = () => {
  return dispatch => {
    axios
      .get(`${process.env.REACT_APP_API_HOSTNAME}/api/topPhotographers`)
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
        destination: null,
        date: null
      },
      jancuk: null
    };
    this.interval = null;

    this.cloudinaryInstance = cloudinary.Cloudinary.new({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      secure: true
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
    this.cloudinaryInstance = null;
    clearInterval(this.interval);
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    let { destination, date } = this.state.search;
    let destinationValStr = null;

    if (!destination) {
      destinationValStr = this.state.jancuk || '';
    } else {
      destinationValStr = destination.label;
    }

    const dateValStr = !date ? '' : date.format('YYYY-MM-DD');
    this.props.searchInformationLog(destinationValStr, dateValStr);

    this.props.history.push({
      pathname: '/search/',
      search: 'destination=' + destinationValStr + '&date=' + dateValStr
    });
  };

  handleSearchDestinationChange = value => {
    this.setState({ search: { ...this.state.search, destination: value } });
  };

  handleSearchDestinationBlur = (e) => {
    this.setState({ jancuk: e.target.value });
  };

  handleSearchDateChange = date => {
    this.setState({ search: { ...this.state.search, date } });
  };

  retrieveLocations(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    const result = [];
    result.push({ label: input });

    return axios
      .get(`${process.env.REACT_APP_API_HOSTNAME}/api/locations?keyword=${input}`)
      .then(response => {
        return { options: result.concat(response.data.data) };
      })
      .catch(error => {
        console.error(error);
      });
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
          <img src={this.cloudinaryInstance.url('assets/hero1', { width: 1600, crop: 'scale', quality: 'auto:best' })} alt="This is an alt text"/>
          <img src={this.cloudinaryInstance.url('assets/hero2', { width: 1600, crop: 'scale', quality: 'auto:best' })} alt="This is an alt text"/>
          <img src={this.cloudinaryInstance.url('assets/hero3', { width: 1600, crop: 'scale', quality: 'auto:best' })} alt="This is an alt text"/>
        </div>

        <div className="container">
          <div id="landing-page-top">
            <img src="https://res.cloudinary.com/debraf3cg/image/upload/v1514881033/assets/CL_small_w.png" alt="This is an alt text"/>
            <h1>Capture your travel moments</h1>
            <p>Connect with a Takapic photographer</p>

            <div className="search-box-custom-again" id="search-box-home" style={{ marginTop: '120px'}}>
              <div className="search-box-destination">
                <div style={{display:'flex'}}>
                  <span id="label-field-destination" style={{paddingLeft:'24px',marginRight:'5px'}}>Where</span>
                  <Select.AsyncCreatable
                    promptTextCreator={() => false}
                    newOptionCreator={reactSelectNewOptionCreator}
                    value={this.state.search.destination}
                    shouldKeyDownEventCreateNewOption={(keyCode) => (keyCode === 13 || keyCode === 9)}
                    onBlurResetsInput={false}
                    onCloseResetsInput={false}
                    onChange={this.handleSearchDestinationChange}
                    onBlur={this.handleSearchDestinationBlur}
                    valueKey="label"
                    labelKey="label"
                    loadOptions={this.retrieveLocations}
                    placeholder="Anywhere"
                  />
                </div>
              </div>

              <div className="search-box-date" id="select-date-home">
                <div style={{display:'flex'}}>
                  <span id="label-field-date" style={{paddingLeft:'15px', marginRight:'15px'}}>When</span>
                  <DatePicker
                    dateFormat="MMMM Do YYYY"
                    minDate={moment()}
                    selected={this.state.search.date}
                    onChange={this.handleSearchDateChange}
                    placeholderText="Anytime"
                    style={{flex:'1'}}
                  />
                </div>
              </div>

              <div className="search-box-submit">
                <button className="button radius-8 key-color"
                        onClick={this.handleSearchSubmit}>
                  <i className="fa fa-search"/>
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

          <h1 className="title margin-bottom-40" style={{fontSize:'24px'}}>Featured Destination</h1>

          <div className="text-right margin-bottom-10">
            <Link to="/search/?destination=&date=" style={{fontSize:'14px'}}>
              See All
            </Link>
          </div>

          <div className="row posters">
            <div className="col-xs-4">
              <Link to="/search/?destination=Bali,%20Indonesia&date=" className="poster">
                <div className="text">BALI</div>
                <img src="https://res.cloudinary.com/debraf3cg/image/upload/v1514881230/assets/bali.jpg" alt="Featured destination - Bali"/>
              </Link>
            </div>

            <div className="col-xs-4">
              <Link to="/search/?destination=Seoul,%20South%20Korea&date=" className="poster">
                <div className="text">SEOUL</div>
                <img src="https://res.cloudinary.com/debraf3cg/image/upload/v1514881230/assets/seoul.jpg" alt="Featured destination - Seoul"/>
              </Link>
            </div>

            <div className="col-xs-4">
              <Link to="/search/?destination=Paris,%20France&date=" className="poster">
                <div className="text">PARIS</div>
                <img src="https://res.cloudinary.com/debraf3cg/image/upload/v1514881230/assets/paris.jpg" alt="Featured destination - Paris"/>
              </Link>
            </div>
          </div>

          <div id="top-photographer-home">
            <h1 className="title" style={{marginTop:'80px',marginBottom:'80px',fontSize:'24px'}}>
              Top Photographers
            </h1>

            {
              topPhotographers && !loadingHomepageData
                ? <TopPhotographers topPhotographers={topPhotographers}/>
                : null
            }
          </div>

          <h1 className="title why-be-traveller" style={{marginTop:'60px',marginBottom:'35px', fontSize:'24px'}}>
            Why be a Takapic traveller?
          </h1>

          <div className="row icons-container" style={{ paddingBottom: '25px' }}>
            <div className="col-sm-4">
              <div className="icon-box-2 with-line">
                <i className="im im-icon-Map2"/>
                <h3 style={{fontSize:'20px'}}>Travel like a local</h3>
                <p style={{fontSize:'14px'}}>
                  Local photographers will guide you to the best locations in
                  their city so you will not feel like a tourist
                </p>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="icon-box-2 with-line">
                <i className="im im-icon-Camera-5"/>
                <h3 style={{fontSize:'20px'}}>Capture your precious moments</h3>
                <p style={{fontSize:'14px'}}>
                  Forget about selfies and photos taken by random strangers. You
                  will be in the hands of a talented photographer with a
                  creative eye ready to capture your best travel memories
                </p>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="icon-box-2">
                <i className="im im-icon-Checked-User"/>
                <h3 style={{fontSize:'20px'}}>Trust and Safety</h3>
                <p style={{fontSize:'14px'}}>
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
  }),
  dispatch => ({
    searchInformationLog: (strLocation, strDatetime) => dispatch(searchInformationLog(strLocation, strDatetime))
  })
)(Home);
