import { database } from '../../services/firebase';
import history from '../../services/history';
import get from 'lodash/get';

export const selfDescription = description => {
  return dispatch => {
    dispatch({
      type: 'BECOME_OUR_PHOTOGRAPHER_SELF_INTRO',
      payload: { selfDescription: description },
    });
  };
};

const updateUserMetadataLocationAndSpeciality = (reference, location, speciality) => {
  const db = database.database();
  const ref = db.ref('/user_metadata');
  const userRef = ref.child(reference);
  const updateData = {
    country: get(location, 'country', '-'),
    countryName: get(location, 'countryName', ''),
    locationAdmLevel1: get(location, 'locationAdmLevel1', '-'),
    locationAdmLevel2: get(location, 'locationAdmLevel2', '-'),
    locationMerge: get(location, 'locationMerge', '-'),
    speciality
  };

  userRef.update(updateData);
};

export const submitCameraEquipment = params => {
  const {
    reference,
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
    const metadataRef = ref.child(reference);
    metadataRef
      .update({
        cameraEquipment: { body: bodies, lens: lenses },
        languages,
        location,
        selfDescription,
        speciality,
        serviceReviews: {
          rating: {
            label: 'Common',
            value: 3
          },
          impressions: [
            { label: 'Friendly', value: 0.5 },
            { label: 'Skillful', value: 0.5 },
            { label: 'Comprehensive', value: 0.5 }
          ]
        }
      })
      .then(() => {
        dispatch({
          type: 'SUBMIT_CAMERA_EQUIPMENT_SUCCESS',
          payload: { status: 'OK', message: 'Data saved' },
        });

        updateUserMetadataLocationAndSpeciality(reference, location, speciality);

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
