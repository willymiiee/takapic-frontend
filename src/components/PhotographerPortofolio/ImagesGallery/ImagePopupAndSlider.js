import React, { Component } from 'react';
import Slider from 'react-slick';

class ImagePopupAndSlider extends Component {
  render() {
    const { initialSlide } = this.props;
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: initialSlide,
    };

    return (
      <Slider {...settings}>
        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img
            src="http://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/01.jpg"
            alt=""
            className="center-block"
          />
        </div>

        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img
            src="http://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/02.jpg"
            alt=""
            className="center-block"
          />
        </div>

        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img
            src="http://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/03.jpg"
            alt=""
            className="center-block"
          />
        </div>

        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img
            src="http://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/04.jpg"
            alt=""
            className="center-block"
          />
        </div>

        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img
            src="http://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/05.jpg"
            alt=""
            className="center-block"
          />
        </div>

        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img
            src="http://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/06.jpg"
            alt=""
            className="center-block"
          />
        </div>
      </Slider>
    );
  }
}

export default ImagePopupAndSlider;
