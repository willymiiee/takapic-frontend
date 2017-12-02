import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import MasonryGalleryThumbnails from './ImagesGallery/MasonryGalleryThumbnails';
import ImagePopupAndSlider from './ImagesGallery/ImagePopupAndSlider';

export default class PortofolioGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      showModal: false,
      initialSlide: 0,
    };

    this.close = this.close.bind(this);
  }

  componentWillMount() {
    const { data: { photosPortofolio } } = this.props
    let images = Object.keys(photosPortofolio).map(item => (photosPortofolio[item].url));

    this.setState({
      images: images,
    })
  }

  close() {
    this.setState({ showModal: false });
  }

  open = (evt, indexSlide) => {
    evt.preventDefault();
    this.setState({ showModal: true, initialSlide: indexSlide });
  };

  render() {
    const { images } = this.state

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
                <ImagePopupAndSlider state={this.state} />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
