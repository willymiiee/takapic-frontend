import { database } from 'services/firebase';
import history from '../../services/history';
import { dashify } from '../../helpers/helpers';
// import { USER_PHOTOGRAPHER } from '../../services/userTypes';

export const selfDescription = description => {
  return dispatch => {
    dispatch({
      type: 'BECOME_OUR_PHOTOGRAPHER_SELF_INTRO',
      payload: { selfDescription: description },
    });
  };
};

export const submitCameraEquipment = params => {
  const {
    email,
    bodies,
    lenses,
    languages,
    speciality,
    location,
    selfDescription,
  } = params;
  return dispatch => {
    dispatch({ type: 'SUBMIT_CAMERA_EQUIPMENT' });
    const db = database.database();
    const ref = db.ref('/photographer_service_information');
    const metadataRef = ref.child(dashify(email));
    metadataRef
      .update({
        cameraEquipment: { body: bodies, lens: lenses },
        languages,
        location,
        selfDescription,
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
          error,
        });
      });
  };
};
