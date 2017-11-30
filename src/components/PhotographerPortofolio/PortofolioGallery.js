import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import MasonryGalleryThumbnails from './ImagesGallery/MasonryGalleryThumbnails';
import ImagePopupAndSlider from './ImagesGallery/ImagePopupAndSlider';

export default class PortofolioGallery extends Component {
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
      'http://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/01.jpg',
      'http://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/02.jpg',
      'http://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/03.jpg',
      'http://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/04.jpg',
      'http://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/05.jpg',
      'http://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/06.jpg',
    ];

    return (
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
    );
  }
}
