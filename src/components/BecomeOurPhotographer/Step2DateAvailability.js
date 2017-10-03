import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from 'components/Page';

export default class Step2DateAvailability extends Component {
  componentDidMount() {
    var schedule = [],
      e_schedule = window.$('#schedule'),
      e_scheduleInput = window.$('#schedule > input');

    function html_scheduleTime() {
      var time = [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
        ],
        i = 0,
        html = '<div id="schedule-time"><div><div>';
      while (i < 9)
        html +=
          '<i' +
          (schedule.indexOf(time[i]) === -1 ? '>' : ' class="active">') +
          time[i++] +
          '</i>';
      html += '</div><div>';
      while (i < 16)
        html +=
          '<i' +
          (schedule.indexOf(time[i]) === -1 ? '>' : ' class="active">') +
          time[i++] +
          '</i>';
      html += '</div></div></div>';
      return html;
    }

    window.$(function() {
      e_scheduleInput
        .datepicker({
          startDate: 'd',
          multidate: true,
        })
        .on('show', function() {
          window
            .$('.datepicker.datepicker-dropdown.dropdown-menu')
            .addClass('schedule')
            .appendTo(e_schedule)
            .css({ top: 0 })
            .on('click', '#schedule-time i', function() {
              window.$(this).toggleClass('active');
            })
            .find('#schedule-time')
            .show();
        })
        .on('hide', function() {
          window.$(this).datepicker('show');
        })
        .datepicker('show');

      window
        .$('.datepicker.datepicker-dropdown.dropdown-menu')
        .prepend(html_scheduleTime());

      window.$(window).resize(function() {
        window
          .$('.datepicker.datepicker-dropdown.dropdown-menu')
          .css({ top: 0 });
      });
    });
  }

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
          <h3>Please let travellers know when you are available for them</h3>
          <div className="row">
            <div className="col-sm-7 margin-top-15 margin-bottom-30">
              <div id="schedule">
                <input type="hidden" />
              </div>
            </div>
            <div className="col-sm-5 margin-top-15 margin-bottom-30">
              <div className="card tips">
                <b>Why need to set your schedule</b>
                <p>Blah blah blah blah.</p>
                <b>Tips for scheduling</b>
                <p>Blah blah.</p>
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
          <Link to="/become-our-photographer/step-2-3" className="button">
            Next
          </Link>
        </div>
      </Page>
    );
  }
}
