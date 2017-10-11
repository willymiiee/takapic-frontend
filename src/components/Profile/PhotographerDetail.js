import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DateTime from 'react-datetime';
import moment from 'moment';
import Page from 'components/Page';
import ReactRating from 'react-rating-float';
import CircularProgressbar from 'react-circular-progressbar';
import Slider from 'react-slick';
import './../../react-slick.min.css';

class PhotographerDetail extends Component {
  constructor(props) {
    super(props);
    let { state } = this.props.location;
    console.log(state);
    this.state = {
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
      progress1: 0.6,
      progress2: 0.8,
      progress3: 0.7,
      datetime: state && state.date ? state.date : '',
    };
  }

  onDateChange(event) {
    let value = event.format('MM-DD-YYYY HH:mm');
    this.setState({
      datetime: value,
    });
  }

  componentDidMount() {
    var self = this;
    // var photoCollection = window.$('#photographer-photo-collection');
    var photographerTop = window.$('#photographer-top'),
      reserveBtn2 = window.$('#photographer-reservation-btn-2'),
      reservationForm = window.$('#photographer-reservation'),
      reservationFormCloseBtn = window.$(
        '#photographer-reservation > .fa-times'
      ),
      reservationFormBg = window.$('#photographer-reservation-bg'),
      reservationDateTime = window.$('#reservation-starting-time'),
      reservationDateTimeTxt = window.$('#reservation-starting-time > span'),
      reservationPackage = window.$('#reservation-package'),
      reservationPackageTxt = window.$('#reservation-package > span'),
      s;

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

    // function photoCollectionSlick() {
    //   try {
    //     if (window.matchMedia('(max-width: 767px)').matches)
    //       photoCollection.slick({ slidesToShow: 1, slidesToScroll: 1 });
    //     else photoCollection.slick('unslick');
    //   } catch (e) { }
    // }

    var disableTime = ['11:00', '12:00', '17:00', '18:00', '23:00'],
      availablePackage = [1, 2, 3];

    function html_reservationTime() {
      var time = [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
        ],
        i = 0,
        html = '<div id="reservation-time"><div><div>';
      while (i < 9)
        html +=
          '<i class="' +
          (reservationDateTime.data('time') === time[i] ? 'active' : '') +
          (disableTime.indexOf(time[i]) === -1 ? '' : ' disabled') +
          '">' +
          time[i++] +
          '</i>';
      html += '</div><div>';
      while (i < 16)
        html +=
          '<i class="' +
          (reservationDateTime.data('time') === time[i] ? 'active' : '') +
          (disableTime.indexOf(time[i]) === -1 ? '' : ' disabled') +
          '">' +
          time[i++] +
          '</i>';
      html += '</div></div></div>';
      return html;
    }

    function html_reservationPackage() {
      var i = 0,
        n = availablePackage.length,
        html = '',
        txt = '';
      while (i < n) {
        txt =
          availablePackage[i] +
          ' hour' +
          (availablePackage[i] > 1 ? 's' : '') +
          ' package';
        html +=
          '<i' +
          (reservationPackageTxt.html() === txt ? ' class="active">' : '>') +
          txt +
          '</i>';
        i++;
      }
      return html;
    }

    window.$(function() {
      window
        .$(window)
        .resize(function() {
          // photoCollectionSlick();
        })
        .scroll(function() {
          if (
            window.matchMedia('(min-width: 481px) and (max-width: 767px)')
              .matches
          ) {
            s = window.pageYOffset;
            if (s > 67) {
              photographerTop.addClass('sticky');
              // photoCollection.addClass('sticky');
              if (s > 490) reserveBtn2.addClass('sticky');
              else reserveBtn2.removeClass('sticky');
            } else {
              photographerTop.removeClass('sticky');
              // photoCollection.removeClass('sticky');
            }
          }
        });

      window
        .$('#reservation-date')
        .datepicker({
          startDate: 'd',
          orientation: 'bottom right',
        })
        .on('show', function() {
          window
            .$('.datepicker.datepicker-dropdown.dropdown-menu')
            .addClass('reservation')
            .prepend(html_reservationTime())
            .on('click', '#reservation-time i:not(.disabled)', function() {
              window.$('#reservation-time i').removeClass('active');
              window.$(this).addClass('active');
              reservationDateTime.data('time', window.$(this).html());
              reservationDateTimeTxt.html(
                window.$('#reservation-date').val() +
                  ' ' +
                  reservationDateTime.data('time')
              );
            });
        })
        .on('changeDate', function() {
          reservationDateTimeTxt.html(
            window.$(this).val() + ' ' + reservationDateTime.data('time')
          );
        });
      // reservationDateTime.click(function() {
      //     window.$('#reservation-date').datepicker('show');
      // });

      reservationPackage
        .click(function() {
          window
            .$(this)
            .find('.card-popup')
            .html(html_reservationPackage())
            .toggle();
        })
        .on('click', '.card-popup > i:not(.disabled)', function() {
          window.$('#reservation-package i').removeClass('active');
          window.$(this).addClass('active');
          reservationPackageTxt.html(window.$(this).html());
        });
      window.$(document).mouseup(function(e) {
        if (
          !reservationPackage.is(e.target) &&
          reservationPackage.has(e.target).length === 0
        )
          reservationPackage.find('.card-popup').hide();
      });
    });
  }

  focus() {
    console.log(this.textInput);
    this.textInput.openCalendar();
  }

  render() {
    let yesterday = moment().subtract(1, 'day');
    let valid = function(current) {
      return current.isAfter(yesterday);
    };
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
          >
            Reserve
          </button>

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
              <div id="photographer-reservation-bg" />
              <div className="card" id="photographer-reservation">
                <i className="fa fa-times" />
                <h3>Reservation form</h3>
                <h4>
                  From <b>$100</b>
                </h4>
                <div id="reservation-status">OK</div>
                <div
                  onClick={this.focus.bind(this)}
                  className="reservation-opt"
                  id="reservation-starting-time"
                  data-time="-"
                >
                  <DateTime
                    value={this.state.datetime}
                    ref={input => {
                      this.textInput = input;
                    }}
                    inputProps={{
                      placeholder: 'Date',
                      style: { display: 'none' },
                    }}
                    timeFormat="HH:mm"
                    dateFormat="MM-DD-YYYY"
                    onChange={this.onDateChange.bind(this)}
                    isValidDate={valid}
                  />
                  <span>
                    {this.state.datetime === '' ? (
                      'Starting Time'
                    ) : (
                      this.state.datetime
                    )}
                  </span>
                </div>
                <div className="reservation-opt" id="reservation-package">
                  <div className="card-popup" />
                  <span>1 hour package</span>
                </div>
                <div id="photographer-reservation-calc">
                  <div>
                    2 hours<i>$110</i>
                  </div>
                  <div>
                    Service fee<i>$10</i>
                  </div>
                  <div>
                    Credit<i>-$20</i>
                  </div>
                </div>
                <div id="photographer-reservation-calc-total">
                  Total<i>$100</i>
                </div>
                <div id="photographer-reservation-bottom">
                  <button
                    id="photographer-reservation-btn"
                    className="button button-white padding-left-40 padding-right-40"
                  >
                    Reserve
                  </button>
                  <div>
                    or<br />
                    <a href="">contact to your photographer</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default withRouter(PhotographerDetail);
