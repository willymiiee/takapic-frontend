import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const CalculationTotal = props => {
  const {
    loading,
    packagesPrice,
    reservationCredit,
    reservationPackageValue,
    reservationServiceFee
  } = props;

  if (!loading && packagesPrice) {
    let total = reservationCredit + parseInt(packagesPrice[reservationPackageValue].price);
    total = total + packagesPrice[reservationPackageValue].price * reservationServiceFee;

    return (
      <span>
        Total <i>{total}</i>
      </span>
    );
  }
  return null;
};

const StartServicePrice = props => {
  const { loading, packagesPrice } = props;
  if (!loading && packagesPrice) {
    const prices = packagesPrice.map(item => parseInt(item.price));
    const minPrice = prices.reduce((a, b) => Math.min(a, b));

    return (
      <h4>
        From <strong>${ minPrice }</strong>
      </h4>
    );
  }
  return null;
};

class PhotographerDetailReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: {
        startingDate: null,
        startingTime: null,
        package: {
          value: 0,
          opened: false,
        },
        photographerFee: 0,
        serviceFee: 0.15,
        credit: 0,
        total: 0,
      }
    };
  }

  dismiss = _ => _;
  show = _ => _;

  handleReserve = () => {
    if (this.state.reservation.total < 1) {
      const {
        photographerServiceInformation: {data: { totalReservationPriceInitiate }},
      } = this.props;
      console.log('Total = ', totalReservationPriceInitiate);
    } else {
      console.log('Total = ', this.state.reservation.total);
    }
    this.props.history.push('/booking');
  };

  calculateTotal(indexValue) {
    const {
      photographerServiceInformation: { data: { packagesPrice } },
    } = this.props;

    const {
      reservation: { credit, serviceFee },
    } = this.state;

    return credit + parseInt(packagesPrice[indexValue].price) + packagesPrice[indexValue].price * serviceFee;
  }

  choosePackage = (event, value) => {
    if (event) {
      event.stopPropagation();
    }

    const total = this.calculateTotal(value);
    const newCopyData = {
      ...this.state,
      reservation: {
        ...this.state.reservation,
        package: {
          value,
          opened: false
        },
        total
      }
    };
    this.setState(newCopyData);
  };

  selectedDateHandler = context => {
    const newCopyOhMyGod = {
      ...this.state,
      reservation: {
        ...this.state.reservation,
        startingDate: moment(new Date(context.select)).format('YYYY-MM-DD')
      }
    };
    this.setState(newCopyOhMyGod);
  };

  selectedTimeHandler = context => {
    const formatTime = this.refs.pickerTime.value.replace(/AM|PM/ig, '').trim() + ':00';
    const newCopyOhMyGod = {
      ...this.state,
      reservation: {
        ...this.state.reservation,
        startingTime: formatTime
      }
    };
    this.setState(newCopyOhMyGod);
  };

  openPackages = event => {
    event.stopPropagation();

    const newCopyData = {
      ...this.state,
      reservation: {
        ...this.state.reservation,
        package: {
          ...this.state.reservation.package,
          opened: !this.state.reservation.package.opened
        }
      }
    };
    this.setState(newCopyData);
  };

  componentDidMount() {
    const that = this;
    window.$(function() {
      window.$('.input-start-date-lalala').pickadate({
        onSet: that.selectedDateHandler
      });

      window.$('.input-start-time-lalala').pickatime({
        format: 'HH:i A',
        onSet: that.selectedTimeHandler
      });
    });
  }

  render() {
    const {
      photographerServiceInformation: { data: { packagesPrice }, loading },
    } = this.props;

    const {
      reservation: { credit, package: { value: packageValueItem }, serviceFee },
    } = this.state;

    return (
      <div>
        <div id="photographer-reservation-bg" />
        <div className="card" id="photographer-reservation">
          <h3>Reservation form</h3>
          <StartServicePrice packagesPrice={packagesPrice}/>

          <div id="reservation-starting-time">
            <input
              ref="pickerDate"
              type="text"
              className="input-start-date-lalala"
              placeholder="Choose start date"
            />
            <input
              ref="pickerTime"
              type="text"
              className="input-start-time-lalala"
              placeholder="Choose start time"
            />
          </div>

          <div
            className="reservation-opt"
            id="reservation-package"
            onClick={(e) => this.openPackages(e)}
          >
            <div
              className="card-popup"
              style={{ display: this.state.reservation.package.opened ? 'block' : 'none' }}
            >
              {
                !loading && packagesPrice.map((data, key) => (
                  <i
                    className={ this.state.reservation.package.value === key ? ('active') : ('') }
                    onClick={event => this.choosePackage(event, key)}
                    key={key}
                  >
                    {data.packageName}
                  </i>
                ))
              }
            </div>
            {
              !loading && packagesPrice
                ? <span>{ packagesPrice[this.state.reservation.package.value].packageName } Package</span>
                : null
            }
          </div>

          <div id="photographer-reservation-calc">
            <div>
              Photographer Fee&nbsp;
              {
                !loading && packagesPrice
                  ? <span>( { packagesPrice[this.state.reservation.package.value].packageName } )</span>
                  : null
              }

              {
                !loading && packagesPrice
                  ? <i>${packagesPrice[this.state.reservation.package.value].price}</i>
                  : null
              }
            </div>

            <div>
              Service fee
              {
                !loading && packagesPrice
                  ? <i>${ packagesPrice[this.state.reservation.package.value].price * this.state.reservation.serviceFee }</i>
                  : null
              }
            </div>

            <div>
              Credit <i>${this.state.reservation.credit}</i>
            </div>
          </div>

          <div id="photographer-reservation-calc-total">
            <CalculationTotal
              loading={loading}
              packagesPrice={packagesPrice}
              reservationCredit={credit}
              reservationPackageValue={packageValueItem}
              reservationServiceFee={serviceFee}
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
              <a href="">Contact to your photographer</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PhotographerDetailReservationForm);
