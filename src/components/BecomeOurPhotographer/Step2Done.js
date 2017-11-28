import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { database } from '../../services/firebase';
import { dashify } from '../../helpers/helpers';

import Page from '../Page';

const updatePhotographerServiceInfoPhotosPortofolio = (reference, data) => {
  return dispatch => {
    dispatch({ type: 'FOO_STEP2_DONE' });
    const db = database.database();
    const ref = db.ref('/photographer_service_information');
    const item = ref.child(reference);

    item.update({ photosPortofolio: data });
  };
};

class Step2Done extends Component {
  componentWillMount() {
    const {
      user: { uid, email, userMetadata: { accountProviderType } },
      photographerPhotosPortofolio: data
    } = this.props;

    let reference = '';
    if (accountProviderType === 'google.com') {
      reference = 'googlecom-' + uid;
    } else {
      reference = dashify(email);
    }

    if (data.length > 0) {
      this.props.updatePhotographerServiceInfoPhotosPortofolio(reference, data);
    }
  }

  render() {
    return (
      <Page>
        <div className="container" id="photographer-landing">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              <p
                className="text-center margin-top-60"
                style={{ fontSize: '1em' }}
              >
                Thanks!<br />
                Now, it's time for you as a Takapic photographer to wow
                travellers with your beautiful photography! Let's go to your <Link to={`/photographer/${this.props.user.uid}`}> Portofolio Page </Link>
              </p>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default connect(
  state => ({
    user: state.userAuth,
    photographerPhotosPortofolio: state.photographerPhotosPortofolio,
  }),
  dispatch => ({
    updatePhotographerServiceInfoPhotosPortofolio: (email, data) =>
      dispatch(updatePhotographerServiceInfoPhotosPortofolio(email, data)),
  })
)(Step2Done);
