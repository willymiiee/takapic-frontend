import React, { Component } from 'react';
import Slider from 'react-slick';

class ImagePopupAndSlider extends Component {
  render() {
    const { initialSlide, images } = this.props;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: initialSlide,
    };

    let figures = []
    images.forEach((image,key) => {
      figures.push(
        <figure key={key} className="cap-bot">
          <div className="img-container">
            <img
              src={image}
              alt=""
              className="center-block"
            />
          </div>
        </figure>
      );
    })

    return (
      <Slider {...settings}>
        {figures}
      </Slider>
    );
  }
}

export default ImagePopupAndSlider;
