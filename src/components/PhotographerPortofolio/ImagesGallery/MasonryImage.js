import React from 'react';
import PropTypes from 'prop-types';

const WIDTH = 270;

const MasonryImage = props => {
  const { widest, ratio, src, openFunc, indexItem } = props;
  let flex = 1 / (widest / ratio);
  flex = flex !== 0 ? flex : 1;
  const width = WIDTH * flex;

  return (
    <div>
      <a
        className="cv-MasonryGallery-figure"
        style={{ width: width }}
        onClick={evt => openFunc(evt, indexItem)}
      >
        <img className="cv-MasonryGallery-image" src={src} alt="" />
      </a>
    </div>
  );
};

MasonryImage.propTypes = {
  src: PropTypes.string,
  ratio: PropTypes.number,
  widest: PropTypes.number,
};

export default MasonryImage;
