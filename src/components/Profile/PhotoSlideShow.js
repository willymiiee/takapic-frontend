import React, { Component } from 'react';

class SlideShow extends Component {
  componentDidMount() {
    window.$('.single-carousel').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.nav-carousel',
    });
    window.$('.nav-carousel').slick({
      slidesToShow: this.props.photos.length > 6 ? 6 : this.props.photos.length,
      slidesToScroll: 1,
      asNavFor: '.single-carousel',
      arrows: false,
      infinite: true,
      focusOnSelect: true,
    });
  }
  render() {
    let photosData = this.props.photos.map(photo => (
      <div className="slide-show-item">
        <img src={photo} alt="slideshow" />
      </div>
    ));
    return (
      <div className="carousel-profile">
        <div className="single-carousel">{photosData}</div>
        <div className="nav-carousel">{photosData}</div>
      </div>
    );
  }
}

export default SlideShow;
