import firebase from 'firebase';
import history from './../../services/history';
import { dashify } from '../../helpers/helpers';

export const setPricing = payload => {
  return dispatch => {
    dispatch({
      type: 'BECOME_OUR_PHOTOGRAPHER_PRICING_CHANGED',
      payload,
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
