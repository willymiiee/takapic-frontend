import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import ReactRating from 'react-rating-float';
import CircularProgressbar from 'react-circular-progressbar';
import Slider from 'react-slick';
import { Modal } from 'react-bootstrap';
import { nl2br } from "../../helpers/helpers";
import { fetchPhotographerServiceInformation, resetPhotographerServiceInformationData } from "../../store/actions/photographerServiceInfoActions";

import './../../react-slick.min.css';
import Animator from '../common/Animator';
import Page from '../Page';
import PhotographerDetailReservationForm from './PhotographerDetailReservationForm';

class PhotographerDetail extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    if (!this.props.photographerServiceInformation.loading) {
      let photographerTop = window.$('#photographer-top');
      let pageYOffset;

      window.$.fn.generateCircleProgress = function (opt) {
        window
          .$(this)
          .circleProgress({
            startAngle: -Math.PI / 2,
            value: opt.value,
            fill: {gradient: opt.gradient},
          })
          .prepend('<div>' + opt.value * 100 + '%</div>');
      };

      window.$(function () {
        window.$(window).scroll(function () {
          if (
            window.matchMedia('(min-width: 481px) and (max-width: 767px)').matches
          ) {
            pageYOffset = window.pageYOffset;
            if (pageYOffset > 67) {
              photographerTop.addClass('sticky');
            } else {
              photographerTop.removeClass('sticky');
            }
          }
        });
      });

    } else {
      const { match: { params: { photographerId } } } = this.props;
      this.props.fetchPhotographerServiceInformation(photographerId);
    }
  }

  componentWillUnmount() {
    this.props.resetPhotographerServiceInformationData();
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    if (!this.props.photographerServiceInformation.loading) {
      const {
        photographerServiceInformation: {
          data: {
            userMetadata: {
              uid: photographerId,
              displayName,
              locationMerge,
              photoProfileUrl
            },
            photosPortofolio,
            selfDescription,
            // speciality,
            serviceReviews: {
              rating,
              impressions
            },
            packagesPrice
          }
        },
        currenciesRates
      } = this.props;

      const settings = {
        customPaging: function (i) {
          const item = photosPortofolio[i];
          return (
            <a>
              <img src={item.url} alt="This an alt text"/>
            </a>
          );
        },
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

      return (
        <Page>
          <div className="hidden-xs padding-bottom-60"/>
          <div className="container">
            <div id="photographer-top">
              <i className="fa fa-heart-o"/>
              <i className="fa fa-share-alt"/>
              <div id="photographer-profile-photo">
                <img
                  width="400"
                  height="300"
                  className="cover"
                  src={photoProfileUrl}
                  alt=""
                />
              </div>
              <h2>{displayName}</h2>
              <p>{locationMerge}</p>
              <Link
                to={`/photographer-portofolio/${photographerId}/gallery`}
                className="button button-white"
              >
                Go to Portofolio
              </Link>
            </div>

            {
              photosPortofolio
                ?
                <Slider {...settings}>
                  {
                    photosPortofolio.map((item, index) => <div key={`portofolio-photo-${index}`} style={{textAlign: 'center'}}>
                      <img
                          className="img-photographer-detail"
                        style={{display: 'inline-block'}}
                        src={item.url}
                        alt=""
                      />
                    </div>)
                  }
                </Slider>
                : null
            }

            <button
              id="photographer-reservation-btn-2"
              className="button button-white padding-left-35 padding-right-35"
              onClick={this.openModal}
            >
              Reserve
            </button>

            <Modal id="reservation-modal" show={this.state.showModal}>
              <Modal.Body>
                <div className="close-popup-button">
                  <i className="fa fa-times" onClick={this.closeModal} />
                </div>
                {
                  packagesPrice && currenciesRates ? <PhotographerDetailReservationForm
                    photographerServiceInformation={this.props.photographerServiceInformation}
                  /> : null
                }
              </Modal.Body>
            </Modal>

            <div className="row">
              <div className="col-sm-6 col-md-6 margin-top-70">
                <div id="photographer-info">
                  <h3 className="has-dot">About Me</h3>
                  <div className="has-border">
                    <h1>{ displayName }</h1>

                    <h4>{ locationMerge }</h4>

                    <p>
                      { nl2br(selfDescription) }
                    </p>

                    {/*<div className="tags margin-bottom-15">
                      {
                        speciality.map((item, index) => <a key={`speciality-item-${index}`}>#{ item }</a>)
                      }
                    </div>*/}
                  </div>

                  <h3 className="has-dot">Reviews</h3>
                  <div className="has-border">
                    <div className="ratings-star" style={{marginBottom: 30}}>
                      <h4 >
                        { rating.label }
                      </h4>
                      <ReactRating
                        rate={ rating.value }
                        total={5}
                      />
                    </div>

                    <div id="photographer-stats">
                      {
                        impressions.map((item, key) => (
                        <div style={{padding: 10}} key={key}>
                          <CircularProgressbar
                            percentage={item.value * 100}
                            initialAnimation
                          />
                          <b>{item.label}</b>
                        </div>
                      ))
                      }
                    </div>
                  </div>

                  <h3 className="has-dot">
                    Comments <span className="thin">(0)</span>
                  </h3>
                </div>
              </div>

              <div className="col-sm-6 col-md-5 col-md-offset-1 margin-top-70">
                {
                  packagesPrice && currenciesRates ? <PhotographerDetailReservationForm/> : null
                }
              </div>
            </div>
          </div>
        </Page>
      );
    }

    return (
      <Animator/>
    )
  }
}

const mapStateToProps = state => ({
  photographerServiceInformation: state.photographerServiceInformation,
  currenciesRates: state.currenciesRates
});

const mapDispatchToProps = dispatch => ({
  fetchPhotographerServiceInformation: photographerId => dispatch(fetchPhotographerServiceInformation(photographerId)),
  resetPhotographerServiceInformationData: () => dispatch(resetPhotographerServiceInformationData())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhotographerDetail)
);
