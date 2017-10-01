import { database } from 'services/firebase';
import history from '../../services/history';
import { dashify } from '../../helpers/helpers';
import { USER_PHOTOGRAPHER } from '../../services/userTypes';

const createCameraEquipment = (
  dispatch,
  email,
  body,
  lens,
  languages,
  speciality
) => {
  console.log(speciality);
  const db = database.database();
  const ref = db.ref('/photographer_service_information');
  const metadataRef = ref.child(dashify(email));
  metadataRef
    .update({
      cameraEquipment: { body, lens },
      languages,
      speciality,
    })
    .then(result => {
      dispatch({
        type: 'SUBMIT_CAMERA_EQUIPMENT_SUCCESS',
        payload: { status: 'OK', message: 'Data saved' },
      });
      history.push('/become-our-photographer/welcome-2');
    })
    .catch(error => {
      dispatch({
        type: 'SUBMIT_CAMERA_EQUIPMENT_ERROR',
        payload: error,
      });
    });
};

export const submitCameraEquipment = params => {
  const { email, bodies, lenses, languages, speciality } = params;
  console.log('params', params);
  return dispatch => {
    console.log(languages);
    dispatch({ type: 'SUBMIT_CAMERA_EQUIPMENT' });
    // database
    //   .auth()
    // .createUserWithEmailAndPassword(email, password)
    // .then(result => {
    //   console.log('result', result);
    createCameraEquipment(
      dispatch,
      email,
      bodies,
      lenses,
      languages,
      speciality
    );
    //     result.sendEmailVerification();
    // })
    // .catch(error => {
    //   console.log(error);
    //   dispatch({
    //     type: 'SUBMIT_CAMERA_EQUIPMENT_ERROR',
    //     payload: error,
    //   });
    // });
  };
};
