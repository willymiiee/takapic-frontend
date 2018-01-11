import React, { Component } from 'react';
import SingleItem from './SingleItem';

class SearchResult extends Component {
  constructor() {
    super();
    this.state = {
      listings: []
    };
  }

  componentWillMount() {
    const { listings, currenciesRates } = this.props;
    const listingsConvertedPrice = listings.map(item => {
      const USDRates = currenciesRates['USD' + item.currency];
      const convertedPrice = Math.round(item.priceStartFrom / USDRates);
      return { ...item, priceStartFrom: convertedPrice };
    });
    this.setState({ listings: listingsConvertedPrice });
  }

  render() {
    return (
      <div id="result" className="search-result-page">
        {
          this.state.listings.map((item, index) => (
            <SingleItem key={index} item={item} viewType={this.props.viewType} />
          ))
        }
      </div>
    );
  }
}

export default SearchResult;
