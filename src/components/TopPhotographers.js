import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import SliderSlick from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class TopPhotographers extends Component {
  render() {
    const settingsSlider = {
      dots: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 481,
          settings: {
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    };
    const { topPhotographers } = this.props;

    return (
      topPhotographers ? (
        <SliderSlick { ...settingsSlider } className="profile-list" style={{ marginBottom:'0px' }}>
          {
            topPhotographers.map((item, index) => (
              <div key={index}>
                <Link to={`/photographer/${item.uid}`}>
                  <div className="no-select single-photographer-holder">
                    <div className="profile-picture">
                      <img className="cover circle-img border-smooth" alt="" src={item.photoProfileUrl}/>
                    </div>

                    <h5 className="name-photograph">{item.displayName}</h5>

                    <div className="location-photograph">
                      {`${item.countryName}, ${item.locationAdmLevel1}`}
                    </div>

                    <div className="ratings">
                      <StarRatingComponent
                        name="rating"
                        value={item.rating}
                        starCount={5}
                        editing={false}
                        starColor="#707070"
                        emptyStarColor="#707070"
                        renderStarIcon={(indexA, value) => <i className={indexA <= value ? 'fa fa-star' : 'fa fa-star-o'} />}
                        renderStarIconHalf={() => <i className="fa fa-star-half-full" />}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </SliderSlick>
      )
      : null
    );
  }
}

export default TopPhotographers;
