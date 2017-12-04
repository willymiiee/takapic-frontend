import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash/get';
import uuidv4 from 'uuid/v4';
import { setMeetingPoint } from '../../store/actions/photographerServiceInfoActionsStep2';

import MapWithASearchBox from './../MapWithASearchBox';
import Page from '../Page';

class Step2SetupMeetingPointA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingPoints: [],
      mapLoaded: false,
    };
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  handleSubmit = event => {
    event.preventDefault();
    let { meetingPoints } = this.state;
    if (meetingPoints.length < 1) {
      alert('Please create at least one meeting point. You cannot leave this empty');
      return false;
    } else {
      const {
        photographerServiceInfoStep2: { detailMasterPackage },
        user: { uid },
        userInitProfile: { notAvailableDates }
      } = this.props;

      let { meetingPoints } = this.state;
      meetingPoints = meetingPoints.map(p => {
        return {
          id: uuidv4(),
          lat: p.generalLocation.lat,
          long: p.generalLocation.long,
          meetingPointName: p.generalLocation.meetingPointName,
          placeLocationNotes: p.specificLocation || '-',
          formattedAddress: p.generalLocation.formattedAddress
        };
      });

      const params = {
        reference: uid,
        packagesPrice: detailMasterPackage,
        meetingPoints,
        notAvailableDates
      };

      this.props.setMeetingPoint(params);
    }
  };

  handleAddition = params => {
    const generalLocation = get(params, 'generalLocation');
    const specificLocation = get(params, 'specificLocation', '-');

    if (generalLocation && this.state.meetingPoints.length < 3) {
      const meetingPoints = [ ...this.state.meetingPoints, { generalLocation, specificLocation } ];
      this.setState({ meetingPoints });
    }
  };

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div/>
            <div/>
            <div className="active"/>
            <div/>
          </div>

          <br/>

          <div className="row">
            <div className="col-md-8">
              <h4>Please choose three different meeting points</h4>
              {
                this.state.mapLoaded && (
                  <MapWithASearchBox
                    handleAddition={this.handleAddition}
                  />)
              }
            </div>

            <div className="col-md-4 create-point-wrapper">
              <h4>Your Created Point</h4>
              <hr/>
              {
                this.state.meetingPoints.map((p, key) => (
                  <div key={key}>
                    {/* ini list number meeting point */}
                    <div className="row">
                      <div className="number-of-meetpoint col-xs-2">{key + 1}</div>
                      <div className="detail-of-meetpoint col-xs-8">
                        <stong>{p.generalLocation.meetingPointName}</stong>
                        <p>{p.generalLocation.formattedAddress}</p>
                        <h6>{p.specificLocation}</h6>
                      </div>
                      <button
                        className="delete-button col-xs-2"
                        onClick={event => {
                          let {meetingPoints} = this.state;
                          meetingPoints = [
                            ...meetingPoints.slice(0, key),
                            ...meetingPoints.slice(key + 1),
                          ];
                          this.setState({meetingPoints});
                        }}>
                        <i className="fa fa-close"/>
                      </button>
                    </div>
                    <hr/>
                  </div>
                ))
              }
            </div>

            <div style={{ clear: 'both' }}/>

          </div>

          <div style={{ marginTop: '60px' }}>
            <hr />
            <Link
              to="/become-our-photographer/step-2-4"
              className="button"
              onClick={this.handleSubmit}
              style={{float: 'right'}}
            >
              Next
            </Link>

            {/*<Link
              style={{float: 'right'}}
              to="/become-our-photographer/step-2-2" className="button">
              Back
            </Link>*/}
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userAuth,
  photographerServiceInfoStep2: state.photographerServiceInfoStep2,
  userInitProfile: state.userInitProfile
});

const mapDispatchToProps = dispatch => ({
  setMeetingPoint: payload => dispatch(setMeetingPoint(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Step2SetupMeetingPointA)
);
