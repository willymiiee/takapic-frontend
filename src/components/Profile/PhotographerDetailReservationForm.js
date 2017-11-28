import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { reservationInitializeAction } from "../../store/actions/reservationActions";

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
    total = Math.round(total + packagesPrice[reservationPackageValue].price * reservationServiceFee);

    return (
      <span>
        Total <span className="float-right">USD {total}</span>
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
        From <strong>USD { minPrice }</strong>
      </h4>
    );
  }
  return null;
};

class PhotographerDetailReservationForm extends Component {
  constructor() {
    super();
    this.state = {
      packagesPrice: [],
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
    const {
      photographerServiceInformation: { data: { userMetadata: { uid } } },
      reservationInitializeAction
    } = this.props;

    const {
      reservation: {
        startingDate,
        startingTime,
        photographerFee,
        serviceFee,
        credit,
        total
      }
    } = this.state;

    const information = {
      packageSelectedIndex: this.state.reservation.package.value,
      startDateTime: startingDate + ' ' + startingTime,
      photographerFee,
      serviceFee: Math.round(this.state.reservation.photographerFee * serviceFee),
      credit,
      total
    };

    reservationInitializeAction(information);
    this.props.history.push(`/booking/${uid}`);
  };

  calculateTotal(indexValue) {
    const { packagesPrice, reservation: { credit, serviceFee } } = this.state;
    let calculate = Math.round(parseInt(packagesPrice[indexValue].price) + packagesPrice[indexValue].price * serviceFee);
    calculate = calculate - credit;
    return calculate;
  }

  choosePackage = (event, value) => {
    event.stopPropagation();
    const { packagesPrice } = this.state;
    const total = this.calculateTotal(value);
    const newCopyData = {
      ...this.state,
      reservation: {
        ...this.state.reservation,
        package: {
          value,
          opened: false
        },
        photographerFee: packagesPrice[value].price,
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

  selectedTimeHandler = () => {
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

  componentWillMount() {
    const {
      photographerServiceInformation: {
        data: { packagesPrice, userMetadata: { currency } }
      },
      currenciesRates
    } = this.props;

    const packagesPriceConvertPrice = packagesPrice.map(item => {
      const USDRates = currenciesRates['USD' + currency];
      const convertedPrice = Math.round(item.price / USDRates);
      return { ...item, price: convertedPrice };
    });

    const { reservation: { credit, serviceFee } } = this.state;
    let calcTotal = Math.round(parseInt(packagesPriceConvertPrice[0].price) + packagesPriceConvertPrice[0].price * serviceFee);
    calcTotal = calcTotal - credit;

    this.setState({
      packagesPrice: packagesPriceConvertPrice,
      reservation: {
        ...this.state.reservation,
        photographerFee: packagesPriceConvertPrice[0].price,
        total: calcTotal
      }
    });
  }

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
    const { photographerServiceInformation: { loading } } = this.props;

    const {
      packagesPrice: packagesPriceProcessed,
      reservation: { credit, package: { value: packageValueItem }, serviceFee },
    } = this.state;

    return (
      <div>
        <div id="photographer-reservation-bg" />
        <div className="card" id="photographer-reservation">
          <h3>Reservation form</h3>
          <StartServicePrice packagesPrice={packagesPriceProcessed}/>

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
                !loading && packagesPriceProcessed.map((data, key) => (
                  <i
                    className={ packageValueItem === key ? ('active') : ('') }
                    onClick={event => this.choosePackage(event, key)}
                    key={key}
                  >
                    { data.packageName }
                  </i>
                ))
              }
            </div>
            {
              !loading && packagesPriceProcessed
                ? <span>{ packagesPriceProcessed[packageValueItem].packageName } Package</span>
                : null
            }
          </div>

          <div id="photographer-reservation-calc">
            <div>
              Photographer Fee&nbsp;
              {
                !loading && packagesPriceProcessed
                  ? <span>( { packagesPriceProcessed[packageValueItem].packageName } )</span>
                  : null
              }

              {
                !loading && packagesPriceProcessed
                  ? <i>USD { packagesPriceProcessed[packageValueItem].price }</i>
                  : null
              }
            </div>

            <div>
              Service fee
              {
                !loading && packagesPriceProcessed
                  ? <i>USD { Math.round(packagesPriceProcessed[packageValueItem].price * this.state.reservation.serviceFee) }</i>
                  : null
              }
            </div>

            <div>
              Credit <i>USD { this.state.reservation.credit }</i>
            </div>
          </div>

          <div id="photographer-reservation-calc-total">
            <CalculationTotal
              loading={loading}
              packagesPrice={packagesPriceProcessed}
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
            <div style={{color:'#999'}}>
              or<br />
              <a style={{color:'#999', textDecoration:'underline'}} href="#!">Contact to your photographer</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photographerServiceInformation: state.photographerServiceInformation,
  currenciesRates: state.currenciesRates
});

const mapDispatchToProps = dispatch => ({
  reservationInitializeAction: information => dispatch(reservationInitializeAction(information))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhotographerDetailReservationForm)
);
