import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from 'components/Page';
import { setMeetingPoint } from '../../store/actions/photographerServiceInfoActionsStep2';
import MapWithASearchBox from './../MapWithASearchBox';
/*
 * https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
class Step2SetupMeetingPointA extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const {
      photographerServiceInfoStep2: { detailMasterPackage },
      user: { email },
    } = this.props;
    const n = detailMasterPackage;
    let packagesPrice = [];
    console.log('n', n);
    for (var key in n) {
      // check also if property is not inherited from prototype
      if (n.hasOwnProperty(key)) {
        var value = n[key];
        packagesPrice = [
          ...packagesPrice,
          {
            currency: value.currency,
            packageName: value.packageName,
            price: value.price,
            requirement: value.requirement,
          },
        ];
      }
    }
    const params = {
      email,
      packagesPrice,
    };
    console.log(params);
    this.props.setMeetingPoint(params);
  };

  render() {
    console.log(this.props.photographerServiceInfoStep2);
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div />
            <div />
            <div className="active" />
            <div />
          </div>
          <hr />
          <h3>Please choose three different meeting points</h3>
          <div className="row">
            <div className="col-lg-12">
              <div id="meeting-points">
                <div>
                  <input type="text" />
                  <input type="text" />
                  <Link
                    to="/become-our-photographer/step-2-4"
                    className="button"
                  >
                    Add +
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-12 margin-top-15">
              <MapWithASearchBox />
              <div className="container">
                <h3>Your Created Point</h3>
                <div>
                  {/* ini list number meeting point */}
                  <div className="margin-top-30">
                    <button
                      type="button"
                      className="btn btn-primary btn-circle btn-lg"
                    >
                      1
                    </button>
                    <div id="line-number">
                      <div className="margin-left-20">
                        ini alamatnya
                        <div id="delete-button">
                          <button className="delete-button">
                            {' '}
                            <strong>x</strong>{' '}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <Link
            to="/become-our-photographer/step-2-2"
            className="button button-white-no-shadow u"
          >
            Back
          </Link>
          <Link
            to="/become-our-photographer/step-2-4"
            className="button"
            onClick={this.handleSubmit}
          >
            Next
          </Link>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userAuth,
  photographerServiceInfoStep2: state.photographerServiceInfoStep2,
});

const mapDispatchToProps = dispatch => ({
  setMeetingPoint: payload => dispatch(setMeetingPoint(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  Step2SetupMeetingPointA
);
