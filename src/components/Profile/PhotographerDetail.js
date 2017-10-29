import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import store from 'store';

import ReactRating from 'react-rating-float';
import CircularProgressbar from 'react-circular-progressbar';
import Slider from 'react-slick';
import { Modal } from 'react-bootstrap';
import './../../react-slick.min.css';

import Page from 'components/Page';
import PhotographerDetailReservationForm from './PhotographerDetailReservationForm';

import { fetchPhotographerDetail } from '../../store/actions/photographerDetailActions';

const fetchPhotographerServiceInformation = () => {
  return dispatch => {
    const uid = window.location.pathname.split('/')[2];
    axios
      .get(`${process.env.REACT_APP_API_HOSTNAME}/api/photographers/${uid}`)
      .then(response => {
        dispatch({
          type: 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_SUCCESS',
          payload: response.data.data,
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  };
};

store.dispatch(fetchPhotographerServiceInformation());

class PhotographerDetail extends Component {
  constructor(props) {
    super(props);
    let { state } = this.props.location;
    this.state = {
      date: null,
      email: 'agungsuryabangsa-gmail-com',
      uuid: '0jknVmGuMwPLKjFetyLm9xYWSh62',
      reviews: {
        rating: {
          label: 'Average',
          value: 3.4,
        },
        impressions: [
          {
            label: 'Friendly',
            value: 0.6,
          },
          {
            label: 'Skillful',
            value: 0.8,
          },
          {
            label: 'Comprehensive',
            value: 0.7,
          },
        ],
      },
      datetime: state && state.date ? state.date : '',
      showModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.props.fetchPhotographerDetail(this.state.email);
  }

  componentDidMount() {
    var photographerTop = window.$('#photographer-top');
    var pageYOffset;

    window.$.fn.generateCircleProgress = function(opt) {
      window
        .$(this)
        .circleProgress({
          startAngle: -Math.PI / 2,
          value: opt.value,
          fill: { gradient: opt.gradient },
        })
        .prepend('<div>' + opt.value * 100 + '%</div>');
    };

    window.$(function() {
      window.$(window).scroll(function() {
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
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const settings = {
      customPaging: function(i) {
        return (
          <a>
            <img src={`/images/photo/0${i + 1}.jpg`} />
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
        <div className="hidden-xs padding-bottom-60" />
        <div className="container">
          <div id="photographer-top">
            <i className="fa fa-heart-o" />
            <i className="fa fa-share-alt" />
            <div id="photographer-profile-photo">
              <img
                width="400"
                height="300"
                className="cover"
                src="/images/photographer/outlook-photography-jobs-2.jpg"
                alt=""
              />
            </div>
            <h2>Dana Kim</h2>
            <h4>Seoul, Korea</h4>
            <a
              href="/photographer-portofolio/1"
              className="button button-white"
            >
              Go to Portofolio
            </a>
          </div>

          <Slider {...settings}>
            {[1, 2, 3, 4, 5, 6].map(item => (
              <div key={item} style={{ textAlign: 'center' }}>
                <img
                  style={{ display: 'inline-block' }}
                  width="400"
                  height="300"
                  src={`/images/photo/0${item}.jpg`}
                  alt=""
                />
              </div>
            ))}
          </Slider>

          <button
            id="photographer-reservation-btn-2"
            className="button button-white padding-left-35 padding-right-35"
            onClick={this.openModal}
          >
            Reserve
          </button>

          <Modal id="reservation-modal" show={this.state.showModal}>
            <Modal.Body>
              <PhotographerDetailReservationForm
                photographerServiceInformation={
                  this.props.photographerServiceInformation
                }
              />
            </Modal.Body>
          </Modal>

          <div className="row">
            <div className="col-sm-6 col-md-7 margin-top-70">
              <div id="photographer-info">
                <h3 className="has-dot">About Me</h3>
                <div className="has-border">
                  <h1>Dana Kim</h1>
                  <h3>Seoul, South Korea</h3>
                  <p>
                    Hi, welcome to Seoul.<br />I'm particurarly specialized in
                    snaps.
                  </p>
                  <div className="tags margin-bottom-15">
                    <a>#couple</a>
                    <a>#natural</a>
                    <a>#paparazzi</a>
                    <a>#snaps</a>
                  </div>
                </div>
                <h3 className="has-dot">Reviews</h3>
                <div className="has-border">
                  <div style={{ marginBottom: 30 }}>
                    <h3 style={{ color: '#666' }}>
                      {this.state.reviews.rating.label}
                    </h3>
                    <ReactRating
                      rate={this.state.reviews.rating.value}
                      total={5}
                    />
                  </div>
                  <div id="photographer-stats">
                    {this.state.reviews.impressions.map((item, key) => (
                      <div style={{ padding: 10 }} key={key}>
                        <CircularProgressbar
                          percentage={item.value * 100}
                          initialAnimation
                        />
                        <b>{item.label}</b>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="has-dot">
                  Comments <span className="thin">(38)</span>
                </h3>
              </div>
            </div>

            <div className="col-sm-6 col-md-5 margin-top-70">
              <PhotographerDetailReservationForm
                photographerServiceInformation={
                  this.props.photographerServiceInformation
                }
              />
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  photographerServiceInformation: state.photographerServiceInformation,
  photographerDetail: state.photographerDetail,
});

const mapDispatchToProps = dispatch => ({
  fetchPhotographerDetail: email => dispatch(fetchPhotographerDetail(email)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhotographerDetail)
);
