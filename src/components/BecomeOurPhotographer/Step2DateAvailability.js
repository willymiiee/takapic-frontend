import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayPicker, { DateUtils } from 'react-day-picker';
import { Link } from 'react-router-dom';

import 'react-day-picker/lib/style.css';
import Page from '../Page';

const selectedDaysAction = selectedDays => {
  return dispatch => {
    dispatch({
      type: 'USER_INIT_PROFILE_SETUP_SCHEDULE_SUCCESS',
      payload: selectedDays
    });
  };
};

class Step2DateAvailability extends Component {
  constructor() {
    super();
    this.state = {
      selectedDays: []
    };
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

  nextStepHandle = () => {
    this.props.selectedDaysAction(this.state.selectedDays);
  };

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div />
            <div className="active" />
            <div />
            <div />
          </div>
          <hr />

          <h3>Please let travellers know when you are <strong>NOT</strong> available for them</h3>

          <div className="row">
            <div className="col-sm-7 margin-top-15 margin-bottom-30">
              <div id="schedule" className="card tips">
                <DayPicker
                  selectedDays={this.state.selectedDays}
                  onDayClick={this.dayClickHandle}
                />
              </div>
            </div>

            <div className="col-sm-5 margin-top-15 margin-bottom-30">
              <div className="card tips">
                <h3>About setting your schedule</h3>
                <p>
                  Please block out days which you are <strong>NOT</strong> available. The default setting is all days are
                  open to customers.
                </p>

                <h3>Tips for Scheduling</h3>
                <p>
                  You can change your schedule anytime you like. It is good to update your schedule regularly to
                  maximize your chances of customers choosing you.
                </p>
              </div>
            </div>
          </div>
          <hr />
          <Link
            to="/become-our-photographer/step-2-1"
            className="button button-white-no-shadow u"
          >
            Back
          </Link>
          <Link to="/become-our-photographer/step-2-3" className="button" onClick={this.nextStepHandle}>
            Next
          </Link>
        </div>
      </Page>
    );
  }
}

export default connect(
  state => ({
    userInitProfile: state.userInitProfile
  }),
  dispatch => ({
    selectedDaysAction: selectedDays => dispatch(selectedDaysAction(selectedDays))
  })
)(Step2DateAvailability);
