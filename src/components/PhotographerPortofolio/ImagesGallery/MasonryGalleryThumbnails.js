import React, { Component } from 'react';
import MasonryImage from './MasonryImage';

const load = url => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      resolve({ url, ratio: img.naturalWidth / img.naturalHeight });
    };
    img.src = url;
  });
};

class MasonryGalleryThumbnails extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };

    Promise.all(this.props.images.map(load))
      .then(orderRatios => this.setState({ images: orderRatios }));
  }

  render() {
    const { openFunc } = this.props;
    return (
      <div>
        <div className="cv-MasonryGallery">
          {this.state.images.map((image, index) => {
            return (
              <MasonryImage
                key={index}
                src={image.url}
                ratio={image.ratio}
                widest={image.ratio}
                openFunc={openFunc}
                indexItem={index}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default MasonryGalleryThumbnails;
