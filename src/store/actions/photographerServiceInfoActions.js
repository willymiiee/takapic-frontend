import axios from 'axios';
import get from 'lodash/get';
import uuidv4 from 'uuid/v4';
import { database } from '../../services/firebase';
import history from '../../services/history';

export const selfDescription = description => {
  return dispatch => {
    dispatch({
      type: 'BECOME_OUR_PHOTOGRAPHER_SELF_INTRO',
      payload: { selfDescription: description },
    });
  };
};

const updateUserMetadataLocationAndSpeciality = (reference, location, speciality, currency) => {
  const db = database.database();
  const ref = db.ref('/user_metadata');
  const userRef = ref.child(reference);
  const updateData = {
    country: get(location, 'country', '-'),
    countryName: get(location, 'countryName', ''),
    locationAdmLevel1: get(location, 'locationAdmLevel1', '-'),
    locationAdmLevel2: get(location, 'locationAdmLevel2', '-'),
    locationMerge: get(location, 'locationMerge', '-'),
    currency,
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
    currency
  } = params;

  let bodiesObject = {};
  let lensesObject = {};
  let languagesObject = {};
  bodies.forEach(item => bodiesObject[uuidv4()] = item);
  lenses.forEach(item => lensesObject[uuidv4()] = item);
  languages.forEach(item => languagesObject[uuidv4()] = item);

  return dispatch => {
    dispatch({ type: 'SUBMIT_CAMERA_EQUIPMENT' });
    const db = database.database();
    const ref = db.ref('/photographer_service_information');
    const metadataRef = ref.child(reference);

    let impressionsObject = {};
    impressionsObject[uuidv4()] = { label: 'Friendly', value: 0.5 };
    impressionsObject[uuidv4()] = { label: 'Skillful', value: 0.5 };
    impressionsObject[uuidv4()] = { label: 'Comprehensive', value: 0.5 };

    metadataRef
      .update({
        cameraEquipment: { body: bodiesObject, lens: lensesObject },
        languages: languagesObject,
        location,
        selfDescription,
        // speciality,
        serviceReviews: {
          rating: {
            label: 'Common',
            value: 3
          },
          impressions: impressionsObject
        }
      })
      .then(() => {
        dispatch({
          type: 'SUBMIT_CAMERA_EQUIPMENT_SUCCESS',
          payload: { status: 'OK', message: 'Data saved' },
        });

        updateUserMetadataLocationAndSpeciality(reference, location, speciality, currency);
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

export const fetchPhotographerServiceInformation = (uid) => {
  return dispatch => {
    dispatch({ type: 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_LOADING' });
    axios
      .get(`${process.env.REACT_APP_API_HOSTNAME}/api/photographers/${uid}`)
      .then(response => {
        dispatch({
          type: 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_SUCCESS',
          payload: response.data.data,
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  };
};
