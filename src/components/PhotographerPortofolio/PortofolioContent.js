import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotographerPortofolio from 'components/PhotographerPortofolio';
import { Modal, Button } from 'react-bootstrap';
import Slider from 'react-slick';

const WIDTH = 270;

class MasonryImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      initialSlide: 0,
    };
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open = (evt, indexSlide) => {
    evt.preventDefault();
    this.setState({ showModal: true, initialSlide: indexSlide });
  };

  render() {
    let flex = 1 / (this.props.widest / this.props.ratio);
    flex = flex !== 0 ? flex : 1;
    const width = WIDTH * flex;

    return (
      <div>
        <a
          href="#"
          href="#"
          className="cv-MasonryGallery-figure"
          style={{ width: width }}
          onClick={evt => this.open(evt)}
        >
          <img
            className="cv-MasonryGallery-image"
            src={this.props.src}
            alt=""
          />
        </a>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton />
          <Modal.Body>
            <GallerySlider initialSlide={this.state.initialSlide} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

MasonryImage.propTypes = {
  src: React.PropTypes.string.isRequired,
  ratio: React.PropTypes.number.isRequired,
  widest: React.PropTypes.number.isRequired,
};

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

class MasonryGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };

    Promise.all(this.props.images.map(load))
      .then(ratios => ratios.sort(descentOrder))
      .then(orderRatios => this.setState({ images: orderRatios }));
  }

  render() {
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
              />
            );
          })}
        </div>
      </div>
    );
  }
}

MasonryGallery.propTypes = { images: React.PropTypes.array.isRequired };

class GallerySlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: this.props.initialSlide,
    };
    return (
      <Slider {...settings}>
        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img src="/images/photo/01.jpg" alt="" className="center-block" />
        </div>
        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img src="/images/photo/02.jpg" alt="" className="center-block" />
        </div>
        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img src="/images/photo/03.jpg" alt="" className="center-block" />
        </div>
        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img src="/images/photo/04.jpg" alt="" className="center-block" />
        </div>
        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img src="/images/photo/05.jpg" alt="" className="center-block" />
        </div>
        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img src="/images/photo/06.jpg" alt="" className="center-block" />
        </div>
      </Slider>
    );
  }
}

export default class PortofolioContent extends Component {
  render() {
    const images = [
      '01.jpg',
      '02.jpg',
      '03.jpg',
      '04.jpg',
      '05.jpg',
      '06.jpg',
    ].map(filename => `/images/photo/${filename}`);
    return (
      <PhotographerPortofolio>
        <div className="col-sm-9 margin-top-50">
          <div
            id="photographer-portofolio-gallery"
            className="photographer-portofolio-container"
          >
            <div className="masonry-container">
              <MasonryGallery images={images} />
            </div>
            <div className="load">Load More</div>
          </div>
        </div>
      </PhotographerPortofolio>
    );
  }
}
