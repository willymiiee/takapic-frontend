import axios from "axios";
import { database } from "../../services/firebase";

export const updateCameraEquipment = params => {
  return dispatch => {
    const { reference, bodies, lenses } = params;

    dispatch({ type: "UPDATE_PROFILE_CAMERA_EQUIPMENT" });
    console.error("updated");
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
          payload: { status: "OK", message: "Data saved" }
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
