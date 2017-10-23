import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

class SingleItem extends Component {
  toDetail() {
    this.props.history.push({
      pathname: '/photographer/' + '123',
      state: { date: this.props.date },
    });
  }

  render() {
    const {
      displayName: name,
      photoProfileUrl,
      priceStartFrom,
    } = this.props.item;

    return (
      <div onClick={this.toDetail.bind(this)}>
        <div className="photo">
          <img src="/images/photo/01.jpg" alt="" />
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
                pathname: '/photographer/' + '123',
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
            value={5}
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
          from<b>${priceStartFrom}</b>
        </div>
      </div>
    );
  }
}

SingleItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default withRouter(SingleItem);
