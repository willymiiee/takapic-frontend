import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import cloudinary from 'cloudinary-core';

class SingleItem extends Component {
  constructor() {
    super();
    this.cloudinaryInstance = cloudinary.Cloudinary.new({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      secure: true
    });
  }

  toDetail = (id) => {
    this.props.history.push({
      pathname: '/photographer/' + id,
    });
  };

  render() {
    const {
      displayName: name,
      photoProfilePublicId,
      priceStartFrom,
      uid,
      defaultDisplayPicturePublicId,
      rating
    } = this.props.item;

    return (
      <div onClick={() => this.toDetail(uid)}>
      
        <div className="bg-caption"/>

        <div className="photo">
          <img
            src={this.cloudinaryInstance.url(defaultDisplayPicturePublicId, { width: 1280, crop: 'scale', quality: 'auto:best' })}
            alt=""
          />
        </div>

        <div className="photographer">
          <div>
            <img
              src={this.cloudinaryInstance.url(photoProfilePublicId, { width: 100, crop: 'scale' })}
              alt=""
            />
          </div>

          <h4>{ name }</h4>

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
