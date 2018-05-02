import React, { Component } from 'react';
import queryString from 'query-string';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import ReactScrollPaginator from 'react-scroll-paginator';
import { searchInformationLog } from "../../store/actions/userActions";
import { reactSelectNewOptionCreator } from "../../helpers/helpers";

import Page from '../Page';
import Animator from '../common/Animator';
import SingleItem from './SingleItem';
import LazyLoadPlaceholder from '../LazyLoadPlaceholder';

class Search extends Component {
  constructor(props) {
    super(props);

    const searchQs = queryString.parse(this.props.location.search);
    const { destination, date, page } = searchQs;
    const pageFix = typeof page === 'undefined' ? 0 : page - 1;

    this.state = {
      listings: [],
      totalListings: 100,
      search: {
        destination: !destination ? null : { label: destination },
        date: !date ? null : moment(date),
        page: pageFix
      },
      jancuk: null,
      viewType: ''
    };

    this.currentPage = 0;
  }

  componentWillReceiveProps(props) {
    const searchQs = queryString.parse(props.location.search);
    const { destination } = searchQs;
    this.setState({
      search: { ...this.state.search, destination: !destination ? null : { label: destination } }
    });
  }

  fetchPhotographerListings(destination, date, page) {
    const queryParams = `filter[destination]=${destination}&filter[date]=${date}&filter[page]=${page}`;
    return axios
      .get(`${process.env.REACT_APP_API_HOSTNAME}/api/photographers/?${queryParams}`)
      .then(response => {
        if (response.data.data.length > 0) {
          this.setState({
            listings: this.state.listings.concat(response.data.data),
            totalListings: response.data.metaInfo.nbHits
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  actionHandler = () => {
    this.currentPage += 1;
    const { destination, date } = queryString.parse(this.props.location.search);
    return this.fetchPhotographerListings(destination, date, this.currentPage - 1);
  };

  renderChild = (row, index) => {
    const criteriaMatch = row.hasOwnProperty('photoProfilePublicId') &&
      row.hasOwnProperty('phoneNumber') &&
      row.hasOwnProperty('defaultDisplayPicturePublicId');

    if (criteriaMatch && row.enable) {
      return <SingleItem key={index} item={row} viewType={this.state.viewType} />
    }
  };

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

  handleSearchSubmit = () => {
    const { destination, date } = this.state.search;
    const dateValStr = !date ? '' : date.format('YYYY-MM-DD');
    let destinationValStr = this.state.jancuk;

    if (!destinationValStr) {
      destinationValStr = destination ? destination.label : '';
    }

    this.props.history.push({
      pathname: '/search/',
      search: 'destination=' + destinationValStr + '&date=' + dateValStr
    });

    window.location.reload(true);
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
    const totalListings = this.state.totalListings;
    return (
      <div>
        {
          this.state.listings.length === 0 && <Animator/>
        }
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

            <ReactScrollPaginator
              ref="wassup"
              action={this.actionHandler}
              rows={this.state.listings}
              count={totalListings}
              renderContainer={({ children }) => <div id="result" className="search-result-page">{children}</div>}
              progressComponent={<LazyLoadPlaceholder/>}
            >
              { this.renderChild }
            </ReactScrollPaginator>
          </div>
        </Page>
      </div>
    );
  }
}

export default connect(
  state => ({
    currenciesRates: state.currenciesRates
  }),
  dispatch => ({
    searchInformationLog: (strLocation, strDatetime) => dispatch(searchInformationLog(strLocation, strDatetime))
  })
)(Search);
