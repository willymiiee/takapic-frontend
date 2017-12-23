import React, { Component } from 'react';
import queryString from 'query-string';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import {
  fetchPhotographerListings,
  resetListings
} from "../../store/actions/photographerServiceInfoActions";
import { searchInformationLog } from "../../store/actions/userActions";

import Page from '../Page';
import SearchResult from './SearchResult';
import Animator from '../common/Animator';

class Search extends Component {
  constructor(props) {
    super(props);
    const searchQs = queryString.parse(this.props.location.search);
    const { destination, date } = searchQs;

    this.state = {
      search: {
        destination: !destination ? null : { label: destination },
        date: !date ? null : moment(date),
      }
    };
  }

  switchResultView = viewType => {
    if (viewType === 'list') {
      window.$('#result-view-list').addClass('active');
      window.$('#result-view-grid').removeClass('active');
      window.$('#result').removeClass('grid-view-lalala');
      window.$('#result').addClass('list-view');
    } else {
      window.$('#result-view-grid').addClass('active');
      window.$('#result-view-list').removeClass('active');
      window.$('#result').removeClass('list-view');
      window.$('#result').addClass('grid-view-lalala');
    }
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();

    let { destination, date } = this.state.search;
    const destinationValStr = !destination ? null : destination.label;
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

  componentWillUnmount() {
    this.props.resetListings();
  }

  componentDidMount() {
    if (!this.props.photographerListings.isFetching && !this.props.photographerListings.isFetched) {
      this.props.fetchPhotographerListings(this.props.location.search);
    }
  }

  render() {
    if (!this.props.photographerListings.isFetching && this.props.photographerListings.isFetched) {
      return (
        <Page>
          <div className="container">
            <div id="landing-page-top" className="srp">
              
              <div className="search-box-custom-again" id="search-box-home" style={{ marginTop: '120px'}}>
                <div className="search-box-destination">
                  <div style={{display:'flex'}}>
                    <span id="label-field-destination" style={{paddingLeft:'24px',marginRight:'5px'}}>Location</span>
                    <Select.Async
                      multi={false}
                      value={this.state.search.destination}
                      onChange={this.handleSearchDestinationChange}
                      valueKey="label"
                      labelKey="label"
                      loadOptions={this.retrieveLocations}
                      placeholder="Anywhere"
                      className="no-select"
                    />
                  </div>
                </div>

                <div className="search-box-date" id="select-date-home">
                  <div style={{display:'flex'}}>
                    <span id="label-field-date" style={{paddingLeft:'15px', marginRight:'15px'}}>Date</span>
                    <DatePicker
                      dateFormat="MMMM Do YYYY"
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

            {/*<div id="result-filter">
              <div>
                <div>
                  Price Range<div className="hidden">: $14 USD - $15 USD+</div>
                  <i className="fa fa-caret-down margin-left-5" />
                </div>
              </div>
            </div>*/}

            <div id="result-view">
              <i
                id="result-view-grid"
                className="fa fa-th-large active"
                title="Grid View"
                onClick={() => this.switchResultView('grid')}
              />
              <i
                id="result-view-list"
                className="fa fa-th-list"
                title="List View"
                onClick={() => this.switchResultView('list')}
              />
            </div>


            <SearchResult
              listings={this.props.photographerListings.results}
              currenciesRates={this.props.currenciesRates}
            />
          </div>
        </Page>
      );
    }

    return <Animator/>;
  }
}

export default connect(
  state => ({
    photographerListings: state.photographerListings,
    currenciesRates: state.currenciesRates
  }),
  dispatch => ({
    fetchPhotographerListings: searchInfo => dispatch(fetchPhotographerListings(searchInfo)),
    resetListings: () => dispatch(resetListings()),
    searchInformationLog: (strLocation, strDatetime) => dispatch(searchInformationLog(strLocation, strDatetime))
  })
)(Search);
