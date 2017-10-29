import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import enUs from 'rmc-date-picker/lib/locale/en_US';
import PopPicker from 'rmc-date-picker/lib/Popup';
import DatePicker from 'rmc-date-picker/lib/DatePicker';
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';

const CalculationTotal = props => {
  const {
    loading,
    packagesPrice,
    reservation: { credit, package: { value }, serviceFee },
  } = props;

  if (!loading && packagesPrice) {
    const total =
      credit +
      parseInt(packagesPrice[value].price) +
      packagesPrice[value].price * serviceFee;
    return (
      <span>
        Total <i>{total}</i>
      </span>
    );
  }
  return null;
};

class PhotographerDetailReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      reservation: {
        startingTime: {
          startDate: '',
        },
        package: {
          value: 0,
          opened: false,
        },
        photographerFee: '',
        serviceFee: 0.15,
        credit: 0,
        total: '',
      },
    };
  }

  dismiss = _ => _;
  show = _ => _;

  changeStartDateHandler = date => {
    this.setState({ date });
  };

  handleReserve = () => {
    const {
      photographerServiceInformation: { data: { packagesPrice } },
    } = this.props;

    const {
      reservation: { credit, package: { value }, serviceFee },
    } = this.state;

    const total =
      credit +
      parseInt(packagesPrice[value].price) +
      packagesPrice[value].price * serviceFee;
    this.setState({ total });
    this.props.history.push('/booking');
  };

  choosePackage = (event, value) => {
    event.stopPropagation();
    let { reservation } = this.state;
    reservation.package = { value, opened: false };
    this.setState({ reservation });
  };

  formatTheDate(date) {
    let mday = date.getDate();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    mday = mday < 10 ? `0${mday}` : mday;
    return `${mday}-${month}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  componentDidMount() {
    window.$(function() {
      window.$('.input-start-date-lalala').pickadate();
      window.$('.input-start-time-lalala').pickatime();
    });
  }

  render() {
    const {
      photographerServiceInformation: { data: { packagesPrice }, loading },
    } = this.props;

    const { date } = this.state;
    const now = new Date();
    const minDate = new Date(2015, 8, 15, 10, 30, 0);
    const maxDate = new Date(2018, 1, 1, 23, 49, 59);

    return (
      <div>
        <div id="photographer-reservation-bg" />
        <div className="card" id="photographer-reservation">
          <h3>Reservation form</h3>
          <h4>
            From <strong>$100</strong>
          </h4>

          <div id="reservation-starting-time">
            <input
              type="text"
              className="input-start-date-lalala"
              placeholder="Choose start date"
            />
            <input
              type="text"
              className="input-start-time-lalala"
              placeholder="Choose start time"
            />
          </div>

          <div
            className="reservation-opt"
            id="reservation-package"
            onClick={event => {
              event.stopPropagation();
              let { reservation } = this.state;
              if (reservation.package.opened) {
                reservation.package.opened = false;
              } else {
                reservation.package.opened = true;
              }
              this.setState({ reservation });
            }}
          >
            <div
              className="card-popup"
              style={{
                display: this.state.reservation.package.opened
                  ? 'block'
                  : 'none',
              }}
            >
              {!loading &&
                packagesPrice.map((data, key) => (
                  <i
                    className={
                      this.state.reservation.package.value === key ? (
                        'active'
                      ) : (
                        ''
                      )
                    }
                    onClick={event => this.choosePackage(event, key)}
                    key={key}
                  >
                    {data.packageName}
                  </i>
                ))}
            </div>

            {!loading && packagesPrice ? (
              <span>
                {
                  packagesPrice[this.state.reservation.package.value]
                    .packageName
                }{' '}
                Package
              </span>
            ) : null}
          </div>

          <div id="photographer-reservation-calc">
            <div>
              Photographer Fee&nbsp;
              {!loading && packagesPrice ? (
                <span>
                  ({
                    packagesPrice[this.state.reservation.package.value]
                      .packageName
                  })
                </span>
              ) : null}
              {!loading && packagesPrice ? (
                <i>
                  ${packagesPrice[this.state.reservation.package.value].price}
                </i>
              ) : null}
            </div>

            <div>
              Service fee
              {!loading && packagesPrice ? (
                <i>
                  ${packagesPrice[this.state.reservation.package.value].price *
                    this.state.reservation.serviceFee}
                </i>
              ) : null}
            </div>

            <div>
              Credit <i>${this.state.reservation.credit}</i>
            </div>
          </div>

          <div id="photographer-reservation-calc-total">
            <CalculationTotal
              reservation={this.state.reservation}
              packagesPrice={packagesPrice}
              loading={loading}
            />
          </div>

          <div id="photographer-reservation-bottom">
            <button
              onClick={this.handleReserve}
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
    );
  }
}

export default withRouter(PhotographerDetailReservationForm);
