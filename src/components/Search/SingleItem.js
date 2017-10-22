import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

class SingleItem extends Component {
  toDetail() {
    this.props.history.push({
      pathname: '/photographer/' + this.props.id,
      state: { date: this.props.date },
    });
  }

  render() {
    const { displayName: name } = this.props.item;

    return (
      <div onClick={this.toDetail.bind(this)}>
        <div className="photo">
          <img src={this.props.img} alt="" />
        </div>
        <div className="photographer">
          <div>
            <img src={this.props.pp} alt="" />
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
          from<b>$100</b>
        </div>
      </div>
    );
  }
}

SingleItem.propTypes = {
  name: PropTypes.string.isRequired,
  pp: PropTypes.string,
  img: PropTypes.string,
  rating: PropTypes.number.isRequired,
  basePrice: PropTypes.number,
  id: PropTypes.any.isRequired,
  date: PropTypes.string,
};

SingleItem.defaultProps = {
  pp: '/images/photographer/outlook-photography-jobs-2.jpg',
  img: '/images/photo/01.jpg',
  date: '',
};

export default withRouter(SingleItem);
