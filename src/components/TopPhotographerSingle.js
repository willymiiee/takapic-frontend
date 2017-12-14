import { Link } from 'react-router-dom';
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const TopPhotographerSingle = props => {
  const {
    displayName,
    countryName,
    locationAdmLevel1,
    photoProfileUrl,
    rating,
    // speciality,
    uid
  } = props.item;

  return (
    <Link to={`/photographer/${uid}`}>
      <div className="no-select single-photographer-holder">
        <div className="profile-picture">
          <img className="cover circle-img border-smooth" alt="" src={photoProfileUrl} />
        </div>

        <h5 className="name-photograph">{displayName}</h5>
        <div className="location-photograph">{`${countryName}, ${locationAdmLevel1}`}</div>

        <div className="ratings">
          <StarRatingComponent
            name="rating"
            value={rating}
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

        {/*<div className="tags hide">
          {
            speciality && speciality.map((item, index) => <a key={`speciality-${index}`}>{item}</a>)
          }
        </div>*/}
      </div>
    </Link>
  );
};

export default TopPhotographerSingle;
