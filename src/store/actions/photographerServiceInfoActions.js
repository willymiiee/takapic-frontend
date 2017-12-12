import axios from 'axios';
import get from 'lodash/get';
import firebase from 'firebase';
import { database } from '../../services/firebase';
import history from '../../services/history';
import queryString from "query-string";

export const selfDescription = description => {
  return dispatch => {
    dispatch({
      type: 'BECOME_OUR_PHOTOGRAPHER_SELF_INTRO',
      payload: { selfDescription: description },
    });
  };
};

export const tellThemThatWasSuccessOrFailed = (whatsup) => {
  return dispatch => {
    dispatch({
      type: 'PROFILE_MANAGER_TELL_THEM_THAT_WAS_SUCCESS_OR_FAILED',
      payload: whatsup
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
        updated: firebase.database.ServerValue.TIMESTAMP,
        // speciality
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

export const resetPhotographerServiceInformationData = () => {
  return dispatch => {
    dispatch({ type: 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_DATA_RESET' })
  };
};

export const fetchPhotographerListings = searchInfo => {
  return dispatch => {
    let { destination, date } = queryString.parse(searchInfo);
    const queryParams = `filter[destination]=${destination}&filter[date]=${date}`;

    dispatch({ type: 'FETCH_PHOTOGRAPHERS_LISTING_START' });

    axios
      .get(`${process.env.REACT_APP_API_HOSTNAME}/api/photographers/?${queryParams}`)
      .then(response => {
        dispatch({
          type: 'FETCH_PHOTOGRAPHERS_LISTING_SUCCESS',
          payload: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const resetListings = () => {
  return dispatch => {
    dispatch({ type: 'EMPTY_PHOTOGRAPHER_LISTINGS' });
  };
};
