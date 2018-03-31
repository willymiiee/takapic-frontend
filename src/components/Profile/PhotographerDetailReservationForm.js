import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { reservationInitializeAction } from "../../store/actions/reservationActions";
import { searchInformationLog } from "../../store/actions/userActions";
import {emailNotificationEndpoint, generateReservationNumber} from "../../helpers/helpers";
import{ RESERVATION_UNPAID, USER_TRAVELLER, SERVICE_FEE } from "../../services/userTypes";

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
        photographerFeeIDR: 0,
        photographerFeeUSD: 0,
        serviceFee: SERVICE_FEE,
        credit: 0,
        totalPrice: 0,
        totalPriceIDR: 0,
        totalPriceUSD: 0
      },
      submitting: false
    };
  }

  componentWillMount() {
    const {
      photographerServiceInformation: { data: { packagesPrice } }
    } = this.props;

    const { reservation: { package: { value: packageId } } } = this.state;
    const firstPackagePick = packagesPrice.filter(item => item.id === packageId)[0];

    this.setState({
      packagesPrice: packagesPrice,
      reservation: {
        ...this.state.reservation,
        photographerFee: firstPackagePick.price,
        photographerFeeIDR: firstPackagePick.priceIDR,
        photographerFeeUSD: firstPackagePick.priceUSD,
        totalPrice: this.calculateTotal(firstPackagePick.price),
        totalPriceIDR: this.calculateTotal(firstPackagePick.priceIDR),
        totalPriceUSD: this.calculateTotal(firstPackagePick.priceUSD)
      }
    });
  }

  componentDidMount() {
    const {
      photographerServiceInformation: {
        data: { notAvailableDates }
      }
    } = this.props;

    const notAvailableDatesFix = typeof notAvailableDates === 'undefined' ? [] : notAvailableDates;
    const notAvailableDatesFormatted = notAvailableDatesFix
      .map((item) => item.split('-'))
      .map((item) => {
        const d = new Date(item);
        return [d.getFullYear(), d.getMonth(), d.getDate()];
      });

    const that = this;
    window.$(function() {
      window.$('.input-start-date-lalala').pickadate({
        min: new Date(),
        disable: notAvailableDatesFormatted,
        onSet: that.selectedDateHandler
      });

      window.$('.input-start-time-lalala').pickatime({
        format: 'HH:i A',
        onSet: that.selectedTimeHandler
      });
    });
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

        this.setState({ submitting: true });

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
          user: { userMetadata: { displayName: travellerName } },
          reservationInitializeAction,
          searchInformationLog
        } = this.props;

        const {
          reservation: {
            startingDate,
            startingTime,
            photographerFee,
            photographerFeeIDR,
            photographerFeeUSD,
            totalPrice,
            totalPriceIDR,
            totalPriceUSD,
            credit,
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
          photographerFeeIDR,
          photographerFeeUSD,
          totalPrice,
          totalPriceIDR,
          totalPriceUSD,
          credit,
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

        // Start - Send notification email
        const tableStr = "Congratulations! you have a new booking!<br />Please review and accept if you are ok" +
          "<br /><br /><br />" +
          "<table border='1'>" +
          "<tr><td>Customer Name</td><td>Joerock loe coy</td></tr>" +
          "<tr><td>Destination</td><td>Italia</td></tr>" +
          "</table>";

        const messageData = {
          receiverName: photographerName,
          receiverEmail: "okaprinarjaya@gmail.com",
          emailSubject: "New Booking for you created!",
          emailContent: tableStr
        };

        axios.post(emailNotificationEndpoint(), messageData)
          .then(result => {
            console.log(result);
            this.setState({ submitting: false }, () => {
              this.props.history.push(`/booking/${photographerId}/${reservationId}`);
            });
          });
        // End - Send notification email
      }

    } else {
      this.props.history.push('/sign-in');
    }
  };

  calculateTotal(price) {
    const { reservation: { credit, serviceFee } } = this.state;
    let calculate = Math.round(price + (price * serviceFee));
    calculate = calculate - credit;
    return calculate;
  }

  choosePackage = (event, value) => {
    event.stopPropagation();
    const packageSelected = this.state.packagesPrice.filter(item => item.id === value)[0];
    const newCopyData = {
      ...this.state,
      reservation: {
        ...this.state.reservation,
        package: {
          value,
          opened: false
        },
        photographerFee: packageSelected.price,
        photographerFeeIDR: packageSelected.priceIDR,
        photographerFeeUSD: packageSelected.priceUSD,
        // eslint-disable-next-line
        totalPrice: this.calculateTotal(parseInt(packageSelected.price)),
        // eslint-disable-next-line
        totalPriceIDR: this.calculateTotal(parseInt(packageSelected.priceIDR)),
        // eslint-disable-next-line
        totalPriceUSD: this.calculateTotal(parseInt(packageSelected.priceUSD))
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

  render() {
    const {
      photographerServiceInformation: {
        data: { userMetadata: { priceStartFrom } },
        loading
      }
    } = this.props;

    const {
      packagesPrice,
      reservation: { package: { value: packageId } },
    } = this.state;

    const currency = window.TAKAPIC_USE_CURRENCY;
    const nf = new Intl.NumberFormat();
    const packageSelected = packagesPrice.filter(item => item.id === packageId)[0];
    const pricePackageSelected = packageSelected['price' + currency];
    const userType = get(this.props.user, 'userMetadata.userType', null);
    const usrmd = this.props.photographerServiceInformation.data.userMetadata;
    let priceStartFix = typeof priceStartFrom === 'undefined' ? null : usrmd['priceStartFrom' + currency];
    priceStartFix = nf.format(priceStartFix);

    return (
      <div>
        <div id="photographer-reservation-bg" />
        <div className="card" id="photographer-reservation">
          <h3>Reservation form</h3>

          <h4>
            From <strong>{`${currency} ${priceStartFix}`}</strong>
          </h4>

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
                !loading && packagesPrice.map((data, index) => (
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
                  ? <i>{`${currency} ${nf.format(pricePackageSelected)}`}</i>
                  : null
              }
            </div>

            <div>
              Service fee
              {
                !loading && packageSelected
                  ? <i>{`${currency} ${nf.format(Math.round(pricePackageSelected * this.state.reservation.serviceFee))}`}</i>
                  : null
              }
            </div>

            <div>
              Credit <i>{`${currency} ${this.state.reservation.credit}`}</i>
            </div>
          </div>

          <div id="photographer-reservation-calc-total">
            <span>
              Total <span className="float-right">{`${currency} ${nf.format(this.calculateTotal(pricePackageSelected))}`}</span>
            </span>
          </div>

          <div id="photographer-reservation-botton">
            {
              !userType || userType === USER_TRAVELLER
                ? (
                  <button
                    onClick={this.handleReserve}
                    id="photographer-reservation-btn"
                    className="button radius-8 key-color"
                  >
                    { this.state.submitting ? 'Submitting, Please wait...' : 'Reserve' }
                  </button>
                )
                : null
            }
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
