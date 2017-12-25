import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import DayPicker, { DateUtils } from 'react-day-picker';
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

    database
      .database()
      .ref('photographer_service_information')
      .child(this.props.user.uid)
      .update({
        notAvailableDates: this.state.selectedDays,
        updated: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        this.setState({ isUploading: false });
      })
      .then(() => {
        this.props.history.push('/become-our-photographer/step-2-3');
      })
      .catch((error) => {
        this.setState({ isUploading: false });
        console.log(error);
      })
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

          <div style={{overflow: 'hidden'}}>
            <button
              type="button"
              className="button"
              onClick={(evt) => !this.state.isUploading ? this.submitHandle(evt) : false}
              style={{float: 'right'}}
              disabled={this.state.isUploading}
            >
              { this.state.isUploading ? 'Processing...' : 'Next' }
            </button>

            {/*<Link
              to="/become-our-photographer/step-2-1"
              className="button button-white-no-shadow u"
              style={{float:'right'}}>
              Back
            </Link>*/}
          </div>
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
