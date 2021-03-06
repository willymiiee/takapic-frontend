import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';
// import { Link } from 'react-router-dom';
import { database } from "../../services/firebase";

import 'react-day-picker/lib/style.css';
import Page from '../Page';

class Step2DateAvailability extends Component {
  constructor() {
    super();
    this.state = {
      selectedDays: [],
      isUploading: false
    };
  }

  dayClickHandle = (day, {selected}) => {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay => DateUtils.isSameDay(selectedDay, day));
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  };

  submitHandle = (evt) => {
    evt.preventDefault();
    this.setState({ isUploading: true });

    const db = database.database();
    const notAvailableDatesAsDateStringList = this.state.selectedDays.map(item => moment(item).format('YYYY-MM-DD'));

    db
      .ref('photographer_service_information')
      .child(this.props.user.uid)
      .update({
        notAvailableDates: notAvailableDatesAsDateStringList,
        updated: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        db
          .ref('user_metadata')
          .child(this.props.user.uid)
          .update({ notAvailableDates: notAvailableDatesAsDateStringList })
          .then(() => {
            this.setState({ isUploading: false });
          });
      })
      .then(() => {
        this.props.history.push('/become-our-photographer/step-2-3');
      })
      .catch((error) => {
        this.setState({ isUploading: false });
        console.log(error);
      });
  };

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-4">
            <div/>
            <div className="active"/>
            <div/>
            <div/>
          </div>
          <hr/>

          <h3 style={{fontWeight:'bold',marginBottom:'24px'}}>Please let travellers know when you are <strong>NOT</strong> available for them</h3>

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
          </div>

          <hr/>

          <button
            type="button"
            className="button key-color radius-5 width1 margin-top-40 margin-bottom-15"
            onClick={(evt) => !this.state.isUploading ? this.submitHandle(evt) : false}
            disabled={this.state.isUploading}
          >
            { this.state.isUploading ? 'Processing...' : 'Next' }
          </button>
        </div>
      </Page>
    );
  }
}

export default connect(
  state => ({
    user: state.userAuth
  })
)(Step2DateAvailability);
