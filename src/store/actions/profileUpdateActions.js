import axios from "axios";
import { database } from "../../services/firebase";

export const updateBasicInformation = params => {
  return dispatch => {
    const { reference, state } = params;

    dispatch({ type: "UPDATE_PROFILE_BASIC_INFORMATION" });

    const db = database.database();
    const ref = db.ref("/user_metadata");
    const metadataRef = ref.child(reference);
    metadataRef
      .update({
        displayName: state.values.name,
      })
      .then(() => {
        dispatch({
          type: "UPDATE_PROFILE_BASIC_INFORMATION_SUCCESS",
          payload: { status: "OK", message: "Data updated" }
        });
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_PROFILE_BASIC_INFORMATION_ERROR",
          error
        });
      });
  };
};

export const updateCameraEquipment = params => {
  return dispatch => {
    const { reference, bodies, lenses } = params;

    dispatch({ type: "UPDATE_PROFILE_CAMERA_EQUIPMENT" });

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
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_PROFILE_CAMERA_EQUIPMENT_ERROR",
          error
        });
      });
  };
};