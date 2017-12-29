import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ReactRating from 'react-rating-float';
import cloudinary from 'cloudinary-core';

const cloudinaryInstance = cloudinary.Cloudinary.new({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  secure: true
});

const PersonalInfoAndNav = props => {
  const {
    photographerUserMetadata: {
      photoProfilePublicId,
      displayName,
      locationMerge,
      rating,
      uid
    }
  } = props;

  return (
    <div id="photographer-portofolio-left">
      <img
        src={cloudinaryInstance.url(photoProfilePublicId, { width: 400, crop: 'scale' })}
        alt="This is a photographer face"
      />
      <h3>{ displayName }</h3>
      <h5>{ locationMerge }</h5>

      <div className="ratings">
        <ReactRating rate={rating} total={5}/>
      </div>

      <hr/>

      <div className="a-block">
        <NavLink
          to={`/photographer-portofolio/${uid}/gallery`}
          activeClassName="photographer-portofolio-active-nav-item"
          className="photographer-portofolio-nav-item"
        >
          Gallery
        </NavLink>

        <NavLink
          to={`/photographer-portofolio/${uid}/about-me`}
          activeClassName="photographer-portofolio-active-nav-item"
          className="photographer-portofolio-nav-item"
        >
          About Me
        </NavLink>
      </div>

      <div className="photographer-portofolio-others" style={{marginTop: '20px'}}>
        <Link
          to={`/photographer/${uid}`}
          className="button button-white"
          style={{width: '100%', textAlign: 'center'}}
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default PersonalInfoAndNav;
