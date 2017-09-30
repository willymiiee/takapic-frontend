import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selfDescription } from '../../store/actions/photographerServiceInfoActions';

import Page from 'components/Page';

class Step1GrabInterestingSelfIntroduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selfDescription: '',
    };

    this.nextStepHandler = this.nextStepHandler.bind(this);
    this.selfDescriptionChangeHandler = this.selfDescriptionChangeHandler.bind(
      this
    );
  }

  nextStepHandler(evt) {
    this.props.selfDescription(this.state.selfDescription);
  }

  selfDescriptionChangeHandler(evt) {
    this.setState({ selfDescription: evt.target.value });
  }

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="steps steps-3">
            <div />
            <div className="active" />
            <div />
          </div>
          <hr />
          <h3>Tell travellers something interesting about yourself</h3>
          <div className="row">
            <div className="col-sm-8 col-lg-6">
              <textarea
                defaultValue={this.state.selfDescription}
                onChange={this.selfDescriptionChangeHandler}
              />
            </div>
          </div>
          <hr />
          <Link
            to="/become-our-photographer/step-1-1"
            className="button button-white-no-shadow u"
          >
            Back
          </Link>
          <Link
            to="/become-our-photographer/step-1-3"
            className="button"
            onClick={this.nextStepHandler}
          >
            Next
          </Link>
        </div>
      </Page>
    );
  }
}

export default connect(null, dispatch => ({
  selfDescription: description => dispatch(selfDescription(description)),
}))(Step1GrabInterestingSelfIntroduction);
