import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Page from 'components/Page';
import { setMeetingPoint } from '../../store/actions/photographerServiceInfoActionsStep2';

class Step2SetupMeetingPointA extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const {
      photographerServiceInfoStep2: { detailMasterPackage },
      user: { email },
    } = this.props;
    const n = detailMasterPackage;
    let packagesPrice = [];

    for (let key in n) {
      // check also if property is not inherited from prototype
      if (n.hasOwnProperty(key)) {
        let value = n[key];
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
    this.props.setMeetingPoint(params);
  };

  render() {
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
            <div className="col-lg-7 margin-top-15 margin-bottom-30">
              <div id="meeting-points">
                <div>
                  <input type="text" />
                  <input type="text" />
                  <Link
                    to="/become-our-photographer/step-2-4"
                    className="button"
                  >
                    Confirm
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5 margin-top-15 margin-bottom-30">
              <div className="card tips">
                <b>Why important to set the meeting points</b>
                <p>
                  The information will be shown to the costumers when they book.
                </p>
                <b>Tips for setting meeting points</b>
                <p>Blah blah.</p>
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
