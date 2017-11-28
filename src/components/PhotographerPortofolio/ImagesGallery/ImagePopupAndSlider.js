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
        <figure className="cap-bot">
          <h3 className="text-center hide">I'm the title of image below</h3>
          <div className="img-container">
            <img
              src="https://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/01.jpg"
              alt=""
              className="center-block"
            />
            <figcaption className="action-btn">
              <a href="#" title="Share">
                <span className="share-icon">
                  <i className="fa fa-share-alt" aria-hidden="true" />
                </span>
              </a>
              <a href="#" title="Like">
                <span className="favorite-icon">
                  <i className="fa fa-heart-o" aria-hidden="true" />
                </span>
              </a>
            </figcaption>
            {/*<figcaption className="theme-info">
              <span># Family</span>
            </figcaption>*/}
          </div>
        </figure>

        <figure className="cap-bot">
          <h3 className="text-center hide">I'm the title of image below</h3>
          <div className="img-container">
            <img
              src="https://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/02.jpg"
              alt=""
              className="center-block"
            />
            <figcaption className="action-btn">
              <a href="#" title="Share">
                <span className="share-icon">
                  <i className="fa fa-share-alt" aria-hidden="true" />
                </span>
              </a>
              <a href="#" title="Like">
                <span className="favorite-icon">
                  <i className="fa fa-heart-o" aria-hidden="true" />
                </span>
              </a>
            </figcaption>
            {/*<figcaption className="theme-info">
              <span># Family</span>
            </figcaption>*/}
          </div>
        </figure>

        <figure className="cap-bot">
          <h3 className="text-center hide">I'm the title of image below</h3>
          <div className="img-container">
            <img
              src="https://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/03.jpg"
              alt=""
              className="center-block"
            />
            <figcaption className="action-btn">
              <a href="#" title="Share">
                <span className="share-icon">
                  <i className="fa fa-share-alt" aria-hidden="true" />
                </span>
              </a>
              <a href="#" title="Like">
                <span className="favorite-icon">
                  <i className="fa fa-heart-o" aria-hidden="true" />
                </span>
              </a>
            </figcaption>
            {/*<figcaption className="theme-info">
              <span># Family</span>
            </figcaption>*/}
          </div>
        </figure>

        <figure className="cap-bot">
          <h3 className="text-center hide">I'm the title of image below</h3>
          <div className="img-container">
            <img
              src="https://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/04.jpg"
              alt=""
              className="center-block"
            />
            <figcaption className="action-btn">
              <a href="#" title="Share">
                <span className="share-icon">
                  <i className="fa fa-share-alt" aria-hidden="true" />
                </span>
              </a>
              <a href="#" title="Like">
                <span className="favorite-icon">
                  <i className="fa fa-heart-o" aria-hidden="true" />
                </span>
              </a>
            </figcaption>
            {/*<figcaption className="theme-info">
              <span># Family</span>
            </figcaption>*/}
          </div>
        </figure>

        <figure className="cap-bot">
          <h3 className="text-center hide">I'm the title of image below</h3>
          <div className="img-container">
            <img
              src="https://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/05.jpg"
              alt=""
              className="center-block"
            />
            <figcaption className="action-btn">
              <a href="#" title="Share">
                <span className="share-icon">
                  <i className="fa fa-share-alt" aria-hidden="true" />
                </span>
              </a>
              <a href="#" title="Like">
                <span className="favorite-icon">
                  <i className="fa fa-heart-o" aria-hidden="true" />
                </span>
              </a>
            </figcaption>
            {/*<figcaption className="theme-info">
              <span># Family</span>
            </figcaption>*/}
          </div>
        </figure>

        <figure className="cap-bot">
          <h3 className="text-center hide">I'm the title of image below</h3>
          <div className="img-container">
            <img
              src="https://res.cloudinary.com/okaprinarjaya/image/upload/v1507620490/takapic/06.jpg"
              alt=""
              className="center-block"
            />
            <figcaption className="action-btn">
              <a href="#" title="Share">
                <span className="share-icon">
                  <i className="fa fa-share-alt" aria-hidden="true" />
                </span>
              </a>
              <a href="#" title="Like">
                <span className="favorite-icon">
                  <i className="fa fa-heart-o" aria-hidden="true" />
                </span>
              </a>
            </figcaption>
            {/*<figcaption className="theme-info">
              <span># Family</span>
            </figcaption>*/}
          </div>
        </figure>
      </Slider>
    );
  }
}

export default ImagePopupAndSlider;
