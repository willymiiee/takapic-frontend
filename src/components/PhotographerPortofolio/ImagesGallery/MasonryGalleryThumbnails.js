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

const descentOrder = (a, b) => {
  const ratioA = a.ratio;
  const ratioB = b.ratio;

  return ratioA === ratioB ? 0 : ratioA < ratioB ? 1 : -1;
};

class MasonryGalleryThumbnails extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };

    Promise.all(this.props.images.map(load))
      .then(ratios => ratios.sort(descentOrder))
      .then(orderRatios => this.setState({ images: orderRatios }));
  }

  render() {
    const { openFunc } = this.props;
    const widest = this.state.images.length ? this.state.images[0].ratio : null;
    return (
      <div>
        <div className="cv-MasonryGallery">
          {this.state.images.map((image, index) => {
            return (
              <MasonryImage
                key={index}
                src={image.url}
                ratio={image.ratio}
                widest={widest}
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
