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
          <img src="/images/photo/02.jpg" alt="" className="center-block" />
        </div>

        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img src="/images/photo/04.jpg" alt="" className="center-block" />
        </div>

        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img src="/images/photo/06.jpg" alt="" className="center-block" />
        </div>

        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img src="/images/photo/01.jpg" alt="" className="center-block" />
        </div>

        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img src="/images/photo/05.jpg" alt="" className="center-block" />
        </div>

        <div>
          <h3 className="text-center">I'm the title of image below</h3>
          <img src="/images/photo/03.jpg" alt="" className="center-block" />
        </div>
      </Slider>
    );
  }
}

export default ImagePopupAndSlider;
