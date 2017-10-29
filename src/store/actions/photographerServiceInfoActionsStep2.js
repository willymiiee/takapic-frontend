import firebase from 'firebase';
import { database } from 'services/firebase';
import history from './../../services/history';
import { dashify } from '../../helpers/helpers';

const updateUserMetadataPriceStartFrom = (email, price) => {
  const db = database.database();
  const ref = db.ref('/user_metadata');
  const userRef = ref.child(dashify(email));

  userRef.update({ priceStartFrom: price });
};

export const setPricing = payload => {
  return dispatch => {
    dispatch({
      type: 'BECOME_OUR_PHOTOGRAPHER_PRICING_CHANGED',
      payload,
    });
  };
};

export const setMeetingPoint = params => {
  const { email, packagesPrice, meetingPoints } = params;
  return dispatch => {
    dispatch({ type: 'SUBMIT_MEETING_POINT' });
    const db = database.database();
    const ref = db.ref('/photographer_service_information');
    const metadataRef = ref.child(dashify(email));
    metadataRef
      .update({
        packagesPrice,
        meetingPoints,
      })
      .then(result => {
        updateUserMetadataPriceStartFrom(email, packagesPrice[0].price);
        dispatch({
          type: 'SUBMIT_MEETING_POINT_SUCCESS',
          payload: { status: 'OK', message: 'Data saved' },
        });
        history.push('/become-our-photographer/step-2-4');
      })
      .catch(error => {
        dispatch({
          type: 'SUBMIT_MEETING_POINT_ERROR',
          error,
        });
      });
  };
};

export const submitUploadPhotosPortfolio = params => {
  const { email, files } = params;
  return dispatch => {
    let percentages = files.map(f => 0);
    let tasks = [];

    for (let i in files) {
      const fullDirectory = `pictures/portofolio-photos/${dashify(email)}`;
      const imageFile = files[i].file;
      var storageRef = firebase
        .storage()
        .ref(fullDirectory + '/' + imageFile.name);

      //Upload file
      tasks = [...tasks, storageRef.put(imageFile)];
      tasks[i].on(
        'state_changed',
        function progress(snapshot) {
          var percentage =
            snapshot.bytesTransferred / snapshot.totalBytes * 100;
          percentages[i] = percentage;
          dispatch({
            type: 'SUBMIT_UPLOAD_PHOTOS_PORTFOLIO',
            files,
            percentages,
          });
        },
        function error(err) {},
        function complete() {
          var downloadURL = tasks[i].snapshot.downloadURL;
          dispatch({
            type: 'SUBMIT_UPLOAD_PHOTOS_PORTFOLIO_ITEM_SUCCESS',
            payload: {
              url: downloadURL,
              theme: '-',
            },
          });
        }
      );
    }
    return Promise.all(tasks).then(
      data => {
        dispatch({ type: 'SUBMIT_UPLOAD_PHOTOS_PORTFOLIO_SUCCESS' });
        history.push('/become-our-photographer/step-2-5');
      },
      error => {
        dispatch({ type: 'SUBMIT_UPLOAD_PHOTOS_PORTFOLIO_ERROR' });
      }
    );
  };
};
