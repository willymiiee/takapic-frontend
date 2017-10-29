import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
  const { packagesPrice } = props;
  return (
    <h4>
      From <strong>$100</strong>
    </h4>
  );
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

  handleReserve = () => {
    const {
      photographerServiceInformation: { data: { packagesPrice } },
    } = this.props;

    const {
      reservation: { credit, package: { value }, serviceFee },
    } = this.state;

    const total = credit + parseInt(packagesPrice[value].price) + packagesPrice[value].price * serviceFee;
    this.setState({ total });
    this.props.history.push('/booking');
  };

  choosePackage = (event, value) => {
    event.stopPropagation();
    let { reservation } = this.state;
    reservation.package = { value, opened: false };
    this.setState({ reservation });
  };

  openPackages = event => {
    event.stopPropagation();
    let { reservation } = this.state;
    reservation.package.opened ? reservation.package.opened = false : reservation.package.opened = true;
    this.setState({ reservation });
  };

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
                  ? <span>({ packagesPrice[this.state.reservation.package.value].packageName }</span>
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
