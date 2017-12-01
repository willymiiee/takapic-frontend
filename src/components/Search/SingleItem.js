import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.toDetail = this.toDetail.bind(this);
  }

  toDetail(id) {
    this.props.history.push({
      pathname: '/photographer/' + id,
    });
  }

  render() {
    const {
      displayName: name,
      photoProfileUrl,
      priceStartFrom,
      uid,
      defaultDisplayPictureUrl,
      rating
    } = this.props.item;

    return (
      <div onClick={() => this.toDetail(uid)}>
        <div className="photo">
          <img src={defaultDisplayPictureUrl} alt="" />
        </div>
        <div className="photographer">
          <div>
            <img
              src={
                photoProfileUrl ||
                '/images/photographer/outlook-photography-jobs-2.jpg'
              }
              alt=""
            />
          </div>
          <h4>
            <Link
              className="photographer-link"
              to={{
                pathname: '/photographer/123',
                state: { date: '' },
              }}
            >
              {name}
            </Link>
          </h4>
        </div>
        <div className="ratings">
          <StarRatingComponent
            name="rating"
            value={rating}
            starCount={5}
            editing={false}
            starColor="#ffff66"
            emptyStarColor="#ffff66"
            renderStarIcon={(index, value) => {
              return (
                <i className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />
              );
            }}
            renderStarIconHalf={() => <i className="fa fa-star-half-full" />}
          />
        </div>
        <div className="price">
          from <strong>USD { priceStartFrom }</strong>
        </div>
      </div>
    );
  }
}

SingleItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default withRouter(SingleItem);
