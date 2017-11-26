import firebase from 'firebase';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import { database } from '../../services/firebase';
import history from './../../services/history';

const updateUserMetadataPriceStartFrom = (reference, price) => {
  const db = database.database();
  const ref = db.ref('/user_metadata');
  const userRef = ref.child(reference);

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
  const { reference, packagesPrice, meetingPoints, notAvailableDates } = params;
  return dispatch => {
    dispatch({ type: 'SUBMIT_MEETING_POINT' });
    const db = database.database();
    const ref = db.ref('/photographer_service_information');
    const metadataRef = ref.child(reference);

    const notAvailableDatesObjects = {};
    notAvailableDates.forEach(item => {
      notAvailableDatesObjects[uuidv4()] = moment(item).format('YYYY-MM-DD');
    });

    let meetingPointsObjects = {};
    let packagesPriceObjects = {};
    meetingPoints.forEach(item => meetingPointsObjects[uuidv4()] = item);
    packagesPrice.forEach(item => packagesPriceObjects[uuidv4()] = item);

    metadataRef
      .update({
        packagesPrice: packagesPriceObjects,
        meetingPoints: meetingPointsObjects,
        notAvailableDates: notAvailableDatesObjects
      })
      .then(() => {
        updateUserMetadataPriceStartFrom(reference, packagesPrice[0].price);
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
  const { reference, files } = params;
  return dispatch => {
    let percentages = files.map(f => 0);
    let tasks = [];

    for (let i in files) {
      const fullDirectory = `pictures/portofolio-photos/${reference}`;
      const imageFile = files[i].file;
      let storageRef = firebase
        .storage()
        .ref(fullDirectory + '/' + imageFile.name);

      //Upload file
      tasks = [...tasks, storageRef.put(imageFile)];
      tasks[i].on(
        'state_changed',
        function progress(snapshot) {
          let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          percentages[i] = percentage;
          dispatch({
            type: 'SUBMIT_UPLOAD_PHOTOS_PORTFOLIO',
            files,
            percentages,
          });
        },
        function error(err) {},
        // eslint-disable-next-line
        function complete() {
          let downloadURL = tasks[i].snapshot.downloadURL;
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
      () => {
        dispatch({ type: 'SUBMIT_UPLOAD_PHOTOS_PORTFOLIO_SUCCESS' });
        history.push('/become-our-photographer/step-2-5');
      },
      () => {
        dispatch({ type: 'SUBMIT_UPLOAD_PHOTOS_PORTFOLIO_ERROR' });
      }
    );
  };
};
