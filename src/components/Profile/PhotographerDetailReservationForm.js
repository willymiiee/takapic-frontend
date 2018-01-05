import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { reservationInitializeAction } from "../../store/actions/reservationActions";
import { searchInformationLog } from "../../store/actions/userActions";
import { generateReservationNumber } from "../../helpers/helpers";
import{ RESERVATION_UNPAID } from "../../services/userTypes";

const StartServicePrice = props => {
  const { loading, packagesPrice } = props;
  if (!loading && packagesPrice) {
    // eslint-disable-next-line
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
          value: 'PKG1',
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

  makeSureDestinationLocation() {
    const { searchInformation } = this.props;
    let location = get(searchInformation, 'location');

    if (!location) {
      const {
        photographerServiceInformation: {
          data: {
            userMetadata: { countryName, locationAdmLevel2 }
          }
        }
      } = this.props;

      location = locationAdmLevel2 || '';
      location = location + ', ' + countryName;
    }
    return location;
  }

  handleReserve = () => {
    const travellerId = get(this.props, 'user.uid', null);

    if (travellerId) {
      if (!this.state.reservation.startingDate && !this.state.reservation.startingTime) {
        alert('Please choose starting date and starting time');
      } else {
        const {
          photographerServiceInformation: {
            data: {
              userMetadata: {
                uid: photographerId,
                displayName: photographerName,
                photoProfileUrl: photographerPhotoProfileUrl
              }
            }
          },
          user: {
            userMetadata: { displayName: travellerName }
          },
          reservationInitializeAction,
          searchInformationLog
        } = this.props;

        const {
          reservation: {
            startingDate,
            startingTime,
            photographerFee,
            serviceFee,
            credit,
            total,
            package: {value: packageId}
          }
        } = this.state;

        const locationDestinationFix = this.makeSureDestinationLocation();
        const reservationId = generateReservationNumber(travellerId);

        const information = {
          reservationId,
          travellerId,
          photographerId,
          packageId,
          startDateTime: startingDate + ' ' + startingTime,
          photographerFee,
          serviceFee: Math.round(photographerFee * serviceFee),
          credit,
          total,
          status: RESERVATION_UNPAID,
          destination: locationDestinationFix
        };

        const uidMapping = {};
        uidMapping[photographerId] = {
          displayName: photographerName,
          photoProfileUrl: photographerPhotoProfileUrl
        };

        uidMapping[travellerId] = {
          displayName: travellerName,
          photoProfileUrl: '-'
        };

        information.uidMapping = uidMapping;

        const datetime = startingDate + ' ' + startingTime;
        searchInformationLog(locationDestinationFix, datetime);
        reservationInitializeAction(reservationId, information);

        this.props.history.push(`/booking/${photographerId}/${reservationId}`);
      }

    } else {
      this.props.history.push('/sign-in');
    }
  };

  calculateTotal(packageId) {
    const { packagesPrice, reservation: { credit, serviceFee } } = this.state;
    const packageSelected = packagesPrice.filter(item => item.id === packageId)[0];
    // eslint-disable-next-line
    let calculate = Math.round(parseInt(packageSelected.price) + packageSelected.price * serviceFee);
    calculate = calculate - credit;
    return calculate;
  }

  choosePackage = (event, value) => {
    event.stopPropagation();
    const packageSelected = this.state.packagesPrice.filter(item => item.id === value)[0];
    const total = this.calculateTotal(value);
    const newCopyData = {
      ...this.state,
      reservation: {
        ...this.state.reservation,
        package: {
          value,
          opened: false
        },
        photographerFee: packageSelected.price,
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

    const { reservation: { credit, serviceFee, package: { value: packageId } } } = this.state;
    const firstPackagePick = packagesPriceConvertPrice.filter(item => item.id === packageId)[0];
    // eslint-disable-next-line
    let calcTotal = Math.round(parseInt(firstPackagePick.price) + firstPackagePick.price * serviceFee);
    calcTotal = calcTotal - credit;

    this.setState({
      packagesPrice: packagesPriceConvertPrice,
      reservation: {
        ...this.state.reservation,
        photographerFee: firstPackagePick.price,
        total: calcTotal
      }
    });
  }

  componentDidMount() {
    const that = this;
    window.$(function() {
      window.$('.input-start-date-lalala').pickadate({
        min: new Date(),
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
      reservation: { package: { value: packageId } },
    } = this.state;

    const packageSelected = packagesPriceProcessed.filter(item => item.id === packageId)[0];

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
                !loading && packagesPriceProcessed.map((data, index) => (
                  <i
                    className={ packageId === data.id ? ('active') : ('') }
                    onClick={event => this.choosePackage(event, data.id)}
                    key={index}
                  >
                    { data.packageName }
                  </i>
                ))
              }
            </div>
            {
              !loading && packageSelected
                ? <span className="text-capitalize">{ packageSelected.packageName } Package</span>
                : null
            }
          </div>

          <div id="photographer-reservation-calc">
            <div>
              Photographer Fee&nbsp;
              {
                !loading && packageSelected
                  ? <span>( { packageSelected.packageName } )</span>
                  : null
              }

              {
                !loading && packageSelected
                  ? <i>USD { packageSelected.price }</i>
                  : null
              }
            </div>

            <div>
              Service fee
              {
                !loading && packageSelected
                  ? <i>USD { Math.round(packageSelected.price * this.state.reservation.serviceFee) }</i>
                  : null
              }
            </div>

            <div>
              Credit <i>USD { this.state.reservation.credit }</i>
            </div>
          </div>

          <div id="photographer-reservation-calc-total">
            <span>
              Total <span className="float-right">USD { this.calculateTotal(packageId) }</span>
            </span>
          </div>

          <div id="photographer-reservation-botton">
            <button
              onClick={this.handleReserve}
              id="photographer-reservation-btn"
              className="button radius-8 key-color"
            >
              Reserve
            </button>
            {/*<div style={{color:'#999'}}>
              or<br />
              <a style={{color:'#999', textDecoration:'underline'}} href="/">Contact to your photographer</a>
            </div>*/}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userAuth,
  photographerServiceInformation: state.photographerServiceInformation,
  currenciesRates: state.currenciesRates,
  searchInformation: state.searchInformation
});

const mapDispatchToProps = dispatch => ({
  reservationInitializeAction: (reservationId, information) => dispatch(reservationInitializeAction(reservationId, information)),
  searchInformationLog: (location, datetime) => dispatch(searchInformationLog(location, datetime))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PhotographerDetailReservationForm)
);
