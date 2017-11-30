import React, { Component } from 'react';
import SingleItem from './SingleItem';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  render() {
    console.log(this.props.rates);
    if (!this.props.items) {
      return (
        <div>
          <img
            style={{ margin: 'auto', display: 'block' }}
            src="images/ajax-loader.gif"
            alt=""
          />
        </div>
      );
    }

    return (
      <div id="result" className="grid-view-lalala">
        {this.props.items.map((item, index) => (
          <SingleItem key={index} item={item} />
        ))}
      </div>
    );
  }
}

export default SearchResult;
