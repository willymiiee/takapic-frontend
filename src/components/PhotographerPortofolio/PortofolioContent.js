import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import PhotographerPortofolio from 'components/PhotographerPortofolio';
import MasonryGalleryThumbnails from './ImagesGallery/MasonryGalleryThumbnails';
import ImagePopupAndSlider from './ImagesGallery/ImagePopupAndSlider';

export default class PortofolioContent extends Component {
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
              <MasonryGalleryThumbnails images={images} openFunc={this.open} />

              <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton />
                <Modal.Body>
                  <ImagePopupAndSlider initialSlide={this.state.initialSlide} />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </PhotographerPortofolio>
    );
  }
}
