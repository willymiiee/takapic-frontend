import React, { Component } from 'react';
import queryString from 'query-string';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import {
  fetchPhotographerListings,
  resetListings
} from "../../store/actions/photographerServiceInfoActions";
import { searchInformationLog } from "../../store/actions/userActions";
import { reactSelectNewOptionCreator } from "../../helpers/helpers";

import Page from '../Page';
import SearchResult from './SearchResult';
import Animator from '../common/Animator';

class Search extends Component {
  constructor(props) {
    super(props);

    const searchQs = queryString.parse(this.props.location.search);
    const { destination, date, page } = searchQs;
    const pageFix = typeof page === 'undefined' ? 0 : page - 1;

    this.state = {
      search: {
        destination: !destination ? null : { label: destination },
        date: !date ? null : moment(date),
        page: pageFix
      },
      jancuk: null,
      viewType: '',
      selectedPage: pageFix
    };
  }

  componentWillUnmount() {
    this.props.resetListings();
  }

  componentDidMount() {
    if (!this.props.photographerListings.isFetching && !this.props.photographerListings.isFetched) {
      this.props.fetchPhotographerListings(this.props.location.search);
    }
  }

  componentWillReceiveProps() {
    const searchQs = queryString.parse(this.props.location.search);
    const { destination } = searchQs;
    this.setState({ search: { ...this.state.search, destination: !destination ? null : { label: destination } } });
  }

  switchResultView = (viewType) => {
    this.setState({ viewType: viewType });
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
    let destinationValStr = this.state.jancuk;
    const dateValStr = !date ? '' : date.format('YYYY-MM-DD');

    if (!destinationValStr) {
      if (destination) {
        destinationValStr = destination.label;
      } else {
        destinationValStr = '';
      }
    }

    this.props.searchInformationLog(destinationValStr, dateValStr);

    this.props.history.push({
      pathname: '/search/',
      search: 'destination=' + destinationValStr + '&date=' + dateValStr
    });
  };

  handlePaginationNavigate = (data) => {
    const page = data.selected;
    const newState = {
      selectedPage: page,
      search: { ...this.state.search, page }
    };

    this.setState(newState, () => {
      let { destination, date } = this.state.search;
      let destinationValStr = this.state.jancuk;
      const dateValStr = !date ? '' : date.format('YYYY-MM-DD');

      if (!destinationValStr) {
        if (destination) {
          destinationValStr = destination.label;
        } else {
          destinationValStr = '';
        }
      }

      this.props.history.push({
        pathname: '/search/',
        search: `destination=${destinationValStr}&date=${dateValStr}&page=${page + 1}`
      });
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
    if (!this.props.photographerListings.isFetching && this.props.photographerListings.isFetched) {
      return (
        <Page>
          <div className="container">
            <div id="landing-page-top" className="srp">
              
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
                  <button className="button radius-8 key-color" onClick={this.handleSearchSubmit}>
                    <i className="fa fa-search"/>
                    <span>Search</span>
                  </button>
                </div>
              </div>
            
            </div>

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

            {
              this.props.photographerListings.results.length > 0
                ? (
                  <div>
                    <SearchResult
                      listings={this.props.photographerListings.results}
                      currenciesRates={this.props.currenciesRates}
                      viewType={this.state.viewType}
                    />
                    <div id="react-paginate">
                      <ReactPaginate
                        pageCount={this.props.photographerListings.totalAvailablePages}
                        initialPage={this.state.search.page}
                        forcePage={this.state.selectedPage}
                        onPageChange={this.handlePaginationNavigate}
                        disableInitialCallback={true}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                      />
                    </div>
                  </div>
                )
                : (
                  <p className="no-photographer-found">
                    No photographer found. Will be available soon
                  </p>
                )
            }
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
