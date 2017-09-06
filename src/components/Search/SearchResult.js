import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

import SingleResult from './SingleResult';

class SearchResult extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    var token = '5930c6caeae22eb42e7b23c6';
    var project = 'takapic';
    var collection = 'photographer';
    var appid = '59462292eae22e263cb11c1a';
    this.setState({
      loading: true,
    });

    fetch(
      'https://api.takapic.com/v2/select_where/token/' +
        token +
        '/project/' +
        project +
        '/collection/' +
        collection +
        '/appid/' +
        appid +
        '/where_field/city/where_value/' +
        this.props.destination
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });

    window.$('#result-view-grid').click(function() {
      window.$('#result-view-grid').addClass('active');
      window.$('#result-view-list').removeClass('active');
      window.$('#result').removeClass('list-view');
    });
    window.$('#result-view-list').click(function() {
      window.$('#result-view-list').addClass('active');
      window.$('#result-view-grid').removeClass('active');
      window.$('#result').addClass('list-view');
    });
  }

  render() {
    if (this.state.loading) {
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
      <div id="result">
        <SingleResult
          name="Sam Juliano"
          rating={4.5}
          id={3}
          date={this.props.date}
        />
        <div>
          <div className="photo">
            <img src="images/photo/02.jpg" alt="" />
          </div>
          <div className="photographer">
            <div>
              <img
                src="images/photographer/outlook-photography-jobs-2.jpg"
                alt=""
              />
            </div>
            <h4>Sam Julian</h4>
          </div>
          <div className="ratings">
            <StarRatingComponent
              name="rating"
              value={4.5}
              starCount={5}
              editing={false}
              starColor="#ffff66"
              emptyStarColor="#ffff66"
              renderStarIcon={(index, value) => {
                return (
                  <i
                    className={index <= value ? 'fa fa-star' : 'fa fa-star-o'}
                  />
                );
              }}
              renderStarIconHalf={() => <i className="fa fa-star-half-full" />}
            />
          </div>
          <div className="price">
            from<b>$100</b>
          </div>
        </div>
        <div>
          <div className="photo">
            <img src="images/photo/03.jpg" alt="" />
          </div>
          <div className="photographer">
            <div>
              <img
                src="images/photographer/outlook-photography-jobs-2.jpg"
                alt=""
              />
            </div>
            <h4>Sam Julian</h4>
          </div>
          <div className="ratings">
            <StarRatingComponent
              name="rating"
              value={4.5}
              starCount={5}
              editing={false}
              starColor="#ffff66"
              emptyStarColor="#ffff66"
              renderStarIcon={(index, value) => {
                return (
                  <i
                    className={index <= value ? 'fa fa-star' : 'fa fa-star-o'}
                  />
                );
              }}
              renderStarIconHalf={() => <i className="fa fa-star-half-full" />}
            />
          </div>
          <div className="price">
            from<b>$100</b>
          </div>
        </div>
        <div>
          <div className="photo">
            <img src="images/photo/04.jpg" alt="" />
          </div>
          <div className="photographer">
            <div>
              <img
                src="images/photographer/outlook-photography-jobs-2.jpg"
                alt=""
              />
            </div>
            <h4>Sam Julian</h4>
          </div>
          <div className="ratings">
            <StarRatingComponent
              name="rating"
              value={4.5}
              starCount={5}
              editing={false}
              starColor="#ffff66"
              emptyStarColor="#ffff66"
              renderStarIcon={(index, value) => {
                return (
                  <i
                    className={index <= value ? 'fa fa-star' : 'fa fa-star-o'}
                  />
                );
              }}
              renderStarIconHalf={() => <i className="fa fa-star-half-full" />}
            />
          </div>
          <div className="price">
            from<b>$100</b>
          </div>
        </div>
        <div>
          <div className="photo">
            <img src="images/photo/05.jpg" alt="" />
          </div>
          <div className="photographer">
            <div>
              <img
                src="images/photographer/outlook-photography-jobs-2.jpg"
                alt=""
              />
            </div>
            <h4>Sam Julian</h4>
          </div>
          <div className="ratings">
            <StarRatingComponent
              name="rating"
              value={4.5}
              starCount={5}
              editing={false}
              starColor="#ffff66"
              emptyStarColor="#ffff66"
              renderStarIcon={(index, value) => {
                return (
                  <i
                    className={index <= value ? 'fa fa-star' : 'fa fa-star-o'}
                  />
                );
              }}
              renderStarIconHalf={() => <i className="fa fa-star-half-full" />}
            />
          </div>
          <div className="price">
            from<b>$100</b>
          </div>
        </div>
        <div>
          <div className="photo">
            <img src="images/photo/06.jpg" alt="" />
          </div>
          <div className="photographer">
            <div>
              <img
                src="images/photographer/outlook-photography-jobs-2.jpg"
                alt=""
              />
            </div>
            <h4>Sam Julian</h4>
          </div>
          <div className="ratings">
            <StarRatingComponent
              name="rating"
              value={4.5}
              starCount={5}
              editing={false}
              starColor="#ffff66"
              emptyStarColor="#ffff66"
              renderStarIcon={(index, value) => {
                return (
                  <i
                    className={index <= value ? 'fa fa-star' : 'fa fa-star-o'}
                  />
                );
              }}
              renderStarIconHalf={() => <i className="fa fa-star-half-full" />}
            />
          </div>
          <div className="price">
            from<b>$100</b>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
