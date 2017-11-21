import { Link } from 'react-router-dom';
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const TopPhotographerSingle = props => {
  const {
    displayName,
    countryName,
    locationAdmLevel1,
    photoProfileUrl,
    speciality,
    serviceReviews,
    uid
  } = props.item;

  return (
    <div>
      <div className="profile-picture">
        <img className="cover" alt="" src={photoProfileUrl} />
      </div>

      <h5 className="name-photograph">{displayName}</h5>
      <div className="location-photograph">{`${countryName}, ${locationAdmLevel1}`}</div>

      <div className="ratings">
        <StarRatingComponent
          name="rating"
          value={serviceReviews || 0}
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

      <div className="tags">
        {
          speciality && speciality.map((item, index) => <a key={`speciality-${index}`}>{item}</a>)
        }
      </div>

      <Link className="button" to={`/photographer/${uid}`}>
        Detail
      </Link>
    </div>
  );
};

export default TopPhotographerSingle;
