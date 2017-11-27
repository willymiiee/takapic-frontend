import uuidv4 from 'uuid/v4';
import { database } from "../../services/firebase";
import { fetchPhotographerServiceInformation } from './photographerServiceInfoActions'

export const updateBasicInformation = params => {
  return dispatch => {
    dispatch({ type: "UPDATE_PROFILE_BASIC_INFORMATION" });
    dispatch(setActiveTab(1));
    dispatch(updateBasicInformationUser(params));
    dispatch(updateBasicInformationPhotographer(params));
  }
};

export const updateBasicInformationUser = params => {
  return dispatch => {
    const { reference, state } = params;

    dispatch({ type: "UPDATE_PROFILE_BASIC_INFORMATION_USER" });

    const db = database.database();
    const ref = db.ref("/user_metadata");
    const metadataRef = ref.child(reference);
    metadataRef
      .update({
        displayName: state.values.name,
        phoneNumber: state.values.phoneNumber,
      })
      .then(() => {
        dispatch({
          type: "UPDATE_PROFILE_BASIC_INFORMATION_USER_SUCCESS",
          payload: { status: "OK", message: "Data updated" }
        });
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_PROFILE_BASIC_INFORMATION_USER_ERROR",
          error
        });
      });
  };
};

export const updateBasicInformationPhotographer = params => {
  return dispatch => {
    const { reference, state } = params;

    let languagesObject = {};
    if (state.selected.languages) {
      state.selected.languages.forEach(item => languagesObject[uuidv4()] = item);
    }

    dispatch({ type: "UPDATE_PROFILE_BASIC_INFORMATION_PHOTOGRAPHER" });

    const db = database.database();
    const ref = db.ref("/photographer_service_information");
    const metadataRef = ref.child(reference);
    metadataRef
      .update({
        selfDescription: state.values.selfDescription,
        languages: languagesObject,
      })
      .then(() => {
        dispatch({
          type: "UPDATE_PROFILE_BASIC_INFORMATION_PHOTOGRAPHER_SUCCESS",
          payload: { status: "OK", message: "Data updated" }
        });
        dispatch(fetchPhotographerServiceInformation(params.uid));
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_PROFILE_BASIC_INFORMATION_PHOTOGRAPHER_ERROR",
          error
        });
      });
  };
};

export const updateCameraEquipment = (params) => {
  return dispatch => {
    const { reference, bodies, lenses } = params;

    dispatch({ type: "UPDATE_PROFILE_CAMERA_EQUIPMENT" });
    dispatch(setActiveTab(2));

    const db = database.database();
    const ref = db.ref("/photographer_service_information");
    const metadataRef = ref.child(reference);
    metadataRef
      .update({
        cameraEquipment: { body: bodies, lens: lenses },
      })
      .then(() => {
        dispatch({
          type: "UPDATE_PROFILE_CAMERA_EQUIPMENT_SUCCESS",
          payload: { status: "OK", message: "Data updated" }
        });
        dispatch(fetchPhotographerServiceInformation(params.uid))
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_PROFILE_CAMERA_EQUIPMENT_ERROR",
          error
        });
      });
  };
};

export const setActiveTab = (tabNumber) => {
  return {
    type: 'UPDATE_ACTIVE_TAB',
    payload: tabNumber
  }
}
