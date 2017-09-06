import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

class TopPhotographerSingle extends Component {
  render() {
    let tags = this.props.tags.map(tag => <a key={tag.toLowerCase()}>{tag}</a>);
    return (
      <div>
        <div className="profile-picture">
          <img className="cover" alt="" src={this.props.img} />
        </div>
        <h3>{this.props.name}</h3>
        <div>{this.props.city}</div>
        <div className="ratings">
          <StarRatingComponent
            name="rating"
            value={this.props.rating}
            starCount={5}
            editing={false}
            starColor="#707070"
            emptyStarColor="#707070"
            renderStarIcon={(index, value) => {
              return (
                <i className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />
              );
            }}
            renderStarIconHalf={() => <i className="fa fa-star-half-full" />}
          />
        </div>
        <div className="tags">{tags}</div>
        <Link className="button" to={'/photographer/' + this.props.id}>
          Detail
        </Link>
      </div>
    );
  }
}

TopPhotographerSingle.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  id: PropTypes.any.isRequired,
  city: PropTypes.string.isRequired,
  img: PropTypes.string,
};

TopPhotographerSingle.defaultProps = {
  tags: [],
  img: 'images/photographer/white-photography-ideas.jpg',
};

export default TopPhotographerSingle;
