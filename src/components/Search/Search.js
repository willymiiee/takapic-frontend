import React, { Component } from 'react';
import queryString from 'query-string';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { fetchCurrenciesRates } from "../../store/actions/photographerServiceInfoActions";

import Page from '../Page';
import SearchResult from './SearchResult';

const convertPrices = (data, currenciesRates) => {
  return data.map(item => {
    const USDRates = currenciesRates['USD' + item.currency];
    const convertedPrice = Math.round(item.priceStartFrom / USDRates);
    return { ...item, priceStartFrom: convertedPrice };
  });
};

const fetchPhotographerListings = (searchInfo, currenciesRates) => {
  return dispatch => {
    let { destination, date } = queryString.parse(searchInfo);
    const queryParams = `filter[destination]=${destination}&filter[date]=${date}`;

    axios
      .get(`${process.env.REACT_APP_API_HOSTNAME}/api/photographers/?${queryParams}`)
      .then(response => {
        const data = convertPrices(response.data.data, currenciesRates);
        dispatch({
          type: 'FETCH_PHOTOGRAPHERS_LISTING',
          payload: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

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
    const destinationValStr = !destination ? '' : destination.label;
    const dateValStr = !date ? '' : date.format('YYYY-MM-DD');

    this.props.history.push({
      pathname: '/search/',
      search: 'destination=' + destinationValStr + '&date=' + dateValStr
    });

    window.location.reload();
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

  setDefaultSearchInformation() {
    //
  }

  componentWillMount() {
    const searchQs = queryString.parse(this.props.location.search);
    const { destination, date } = searchQs;
    this.setState({
      ...this.state.search,
      destination: { label: destination },
      date: moment(date)
    });
    console.log('oka oka oka', searchQs)

    this.props.fetchCurrenciesRates();
  }

  componentDidMount() {
    window
      .$('#landing-page-search > div > input')
      .focus(function() {
        window.$('#landing-page-search').addClass('focus');
      })
      .blur(function() {
        window.$('#landing-page-search').removeClass('focus');
      });

    const { location: { search }, currenciesRates } = this.props;
    console.log('currenciesRates', currenciesRates);
    if (!currenciesRates.fetchCurrenciesRatesLoading) {
      this.props.fetchPhotographerListings(search, currenciesRates);
    }
  }

  render() {
    if (this.props.currenciesRates && this.props.photographerListings) {
      let yesterday = moment().subtract(1, 'day');
      let valid = function (current) {
        return current.isAfter(yesterday);
      };

      return (
        <Page>
          <div className="container">
            <div id="landing-page-top" className="srp">
              <div className="search-box-custom-again">
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


            { !this.props.currenciesRates.fetchCurrenciesRatesLoading ? <SearchResult items={this.props.photographerListings} rates={this.props.currenciesRates}/> : null }
          </div>
        </Page>
      );
    }
    return null;
  }
}

export default connect(
  state => ({
    photographerListings: state.photographerListings,
    currenciesRates: state.currenciesRates
  }),
  dispatch => ({
    fetchPhotographerListings: (searchInfo, currenciesRates) => dispatch(fetchPhotographerListings(searchInfo, currenciesRates)),
    fetchCurrenciesRates: () => dispatch(fetchCurrenciesRates())
  })
)(Search);
