import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayPicker, { DateUtils } from 'react-day-picker';
import { Button } from 'react-bootstrap'
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import { updateScheduleNotAvailableDates } from "../../store/actions/profileUpdateActions";

import 'react-day-picker/lib/style.css';

class ScheduleNotAvailable extends Component {
  constructor() {
    super();
    this.state = {
      selectedDays: []
    };
  }

  componentDidMount() {
    this.setLocalState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { photographerServiceInformation: { data: { notAvailableDates: notAvailableDatesNext } } } = nextProps;
    const { photographerServiceInformation: { data: { notAvailableDates: notAvailableDatesPrev } } } = this.props;
    if (typeof notAvailableDatesNext !== 'undefined') {
      if (!isEqual(notAvailableDatesNext, notAvailableDatesPrev)) {
        this.setLocalState(nextProps);
      }
    }
  }

  dayClickHandle = (day, { selected }) => {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay => DateUtils.isSameDay(selectedDay, day));
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  };

  updateHandle = () => {
    const { photographerServiceInformation: { data: { userMetadata: { uid } } } } = this.props;
    this.props.updateScheduleNotAvailableDates(uid, this.state.selectedDays);
  };

  setLocalState(props) {
    const { photographerServiceInformation: { data: { notAvailableDates } } } = props;
    if (typeof notAvailableDates !== 'undefined') {
      const notAvailableDatesAsDateObjectList = notAvailableDates.map(item => new Date(item));
      this.setState({ selectedDays: notAvailableDatesAsDateObjectList });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-7 margin-top-15 margin-bottom-30">
            <div id="schedule" className="card tips">
              <DayPicker
                selectedDays={this.state.selectedDays}
                onDayClick={this.dayClickHandle}
              />
            </div>

            <div className="not-availables-dates-list" style={{ marginTop: '25px' }}>
              <table className="basic-table">
                <tbody>
                  <tr>
                    <th>You are NOT available on these dates</th>
                  </tr>

                  {
                    this.state.selectedDays && this.state.selectedDays.map((item, index) => (
                      <tr key={`tr${index}`}>
                        <td>{ moment(item).format('MMMM Do YYYY') }</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-sm-5 margin-top-15 margin-bottom-30">
            <div className="card tips" style={{height: '340px'}}>
              <h3>About setting your schedule</h3>
              <p>
                Please block out days which you are <strong>NOT</strong> available. The default setting is all days
                are
                open to customers.
              </p>

              <h3>Tips for Scheduling</h3>
              <p>
                You can change your schedule anytime you like. It is good to update your schedule regularly to
                maximize your chances of customers choosing you.
              </p>
            </div>
          </div>

          <div className="row">
            <hr/>
            <Button onClick={this.updateHandle} style={{float: 'right'}} className="button">
              Update
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ photographerServiceInformation: state.photographerServiceInformation }),
  dispatch => ({
    updateScheduleNotAvailableDates: (uid, notAvailableDates) => dispatch(updateScheduleNotAvailableDates(uid, notAvailableDates))
  })
)(ScheduleNotAvailable);
