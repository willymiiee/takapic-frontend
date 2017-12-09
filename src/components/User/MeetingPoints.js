import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import { Button } from "react-bootstrap";
import get from 'lodash/get';
import { updateMeetingPoints } from '../../store/actions/profileUpdateActions';

import MapWithASearchBox from './../MapWithASearchBox';

class MeetingPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingPoints: []
    };
  }

  componentDidMount() {
    this.setLocalState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { photographerServiceInformation : { data: { meetingPoints } } } = nextProps;
    if (meetingPoints !== this.state.meetingPoints) {
      this.setLocalState(nextProps);
    }
  }

  setLocalState(props) {
    const { photographerServiceInformation : { data: { meetingPoints } } } = props;
    if (meetingPoints) {
      this.setState({ meetingPoints });
    }
  }

  handleAddition = params => {
    let generalLocation = get(params, 'generalLocation');
    const specificLocation = get(params, 'specificLocation', '-');

    if (generalLocation && this.state.meetingPoints.length < 3) {
      let uuid = uuidv4();
      let meetingPointsLocal = Object.assign(generalLocation, { placeLocationNotes: specificLocation, id: uuid });
      const meetingPoints = [...this.state.meetingPoints, meetingPointsLocal];
      this.setState({ meetingPoints });
    }
  };

  handleUpdate = event => {
    event.preventDefault();
    const {
      photographerServiceInformation: {
        data: { userMetadata: { uid } }
      }
    } = this.props;

    const params = { state: this.state, uid };
    this.props.updateMeetingPoints(params);

  };

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-md-8" style={{paddingLeft:'15px',paddingRight:'15px'}}>
            <h4>Please choose three different meeting points</h4>
            <hr/>
            <MapWithASearchBox handleAddition={this.handleAddition}/>
          </div>

          <div className="col-md-4 list-of-meeting-points" style={{paddingLeft:'15px',paddingRight:'15px'}}>
            <h4>Your Created Point</h4>
            <hr/>
            {
              this.state.meetingPoints.map((p, key) => (
                <div key={key}>
                  {/* ini list number meeting point */}
                  <div className="row">
                    <div className="number-of-meetpoint col-xs-2">{key + 1}</div>
                    <div className="detail-of-meetpoint col-xs-8">
                      <stong>{p.meetingPointName}</stong>
                      <p>{p.formattedAddress}</p>
                      <h6>{p.placeLocationNotes}</h6>
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
        </div>
        <div className="row" style={{ marginTop: '60px' }}>
          <hr/>
          <Button onClick={this.handleUpdate} style={{float:'right'}} className="button">Update</Button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    updateMeetingPoints: paramsObject => dispatch(updateMeetingPoints(paramsObject))
  })
)(MeetingPoints);
