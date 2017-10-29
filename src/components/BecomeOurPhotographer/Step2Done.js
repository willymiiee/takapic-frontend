import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../services/firebase';
import { dashify } from '../../helpers/helpers';

import Page from 'components/Page';

const updatePhotographerServiceInfoPhotosPortofolio = (email, data) => {
  return dispatch => {
    dispatch({ type: 'FOO_STEP2_DONE' });
    const db = database.database();
    const ref = db.ref('/photographer_service_information');
    const item = ref.child(dashify(email));

    item.update({ photosPortofolio: data });
  };
};

class Step2Done extends Component {
  componentWillMount() {
    const { email, photographerPhotosPortofolio: data } = this.props;
    this.props.updatePhotographerServiceInfoPhotosPortofolio(email, data);
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
                travellers with your beautiful photography!
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
    email: state.userAuth.email,
    photographerPhotosPortofolio: state.photographerPhotosPortofolio,
  }),
  dispatch => ({
    updatePhotographerServiceInfoPhotosPortofolio: (email, data) =>
      dispatch(updatePhotographerServiceInfoPhotosPortofolio(email, data)),
  })
)(Step2Done);
