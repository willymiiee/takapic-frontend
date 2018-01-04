import firebase from 'firebase';
import moment from "moment/moment";
import { database } from "../../services/firebase";
import {
  fetchPhotographerServiceInformation,
  tellThemThatWasSuccessOrFailed
} from './photographerServiceInfoActions'

export const updateBasicInformation = (params) => {
  return dispatch => {
    const tasks = [];
    tasks.push(dispatch(updateBasicInformationUser(params)));
    tasks.push(dispatch(updateBasicInformationPhotographer(params)));
    tasks.push(dispatch(setActiveTab(1)));
    return Promise.all(tasks);
  }
};

export const updateBasicInformationUser = (params) => {
  return (dispatch) => {
    const { uid, state } = params;
    const db = database.database();
    const ref = db.ref("/user_metadata");
    const metadataRef = ref.child(uid);

    metadataRef
      .update({
        displayName: state.values.name,
        phoneNumber: state.values.phoneNumber,
        country: state.location.country,
        countryName: state.location.countryName,
        currency: state.values.currency,
        locationAdmLevel1: state.location.locationAdmLevel1,
        locationAdmLevel2: state.location.locationAdmLevel2,
        locationMerge: state.location.locationMerge,
        updated: firebase.database.ServerValue.TIMESTAMP
      });
  };
};

export const updateBasicInformationPhotographer = (params) => {
  return (dispatch) => {
    const { uid, state } = params;
    const db = database.database();
    const ref = db.ref("photographer_service_information");
    const metadataRef = ref.child(uid);

    metadataRef
      .update({
        selfDescription: state.values.selfDescription,
        languages: state.selected.languages,
        location: state.location,
        updated: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        dispatch(fetchPhotographerServiceInformation(params.uid));
      })
      .then(() => {
        dispatch(tellThemThatWasSuccessOrFailed('success'));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const updateCameraEquipment = (params) => {
  return dispatch => {
    dispatch({ type: "PROFILE_MANAGER_UPDATING_START" });
    dispatch(setActiveTab(2));

    const { uid, bodies, lenses } = params;
    const db = database.database();
    const ref = db.ref("photographer_service_information");
    const metadataRef = ref.child(uid);

    metadataRef
      .update({
        cameraEquipment: { body: bodies, lens: lenses },
        updated: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        dispatch({
          type: "PROFILE_MANAGER_UPDATING_SUCCESS",
          payload: { status: "OK", message: "Data updated" }
        });
        dispatch(fetchPhotographerServiceInformation(params.uid))
      })
      .then(() => {
        dispatch(tellThemThatWasSuccessOrFailed('success'));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const updateMeetingPoints = (params) => {
  return dispatch => {
    const { uid, state } = params;

    dispatch({ type: "PROFILE_MANAGER_UPDATING_START" });
    dispatch(setActiveTab(3));

    const db = database.database();
    const ref = db.ref("/photographer_service_information");
    const metadataRef = ref.child(uid);

    metadataRef
      .update({
        meetingPoints: state.meetingPoints,
        updated: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        dispatch({
          type: "PROFILE_MANAGER_UPDATING_SUCCESS",
          payload: { status: "OK", message: "Data updated" }
        });
        dispatch(fetchPhotographerServiceInformation(params.uid))
      })
      .then(() => {
        dispatch(tellThemThatWasSuccessOrFailed('success'));
      })
      .catch(error => {
        console.error(error)
      });
  };
};

export const updatePackagesPrice = (params) => {
  return dispatch => {
    dispatch({ type: "PROFILE_MANAGER_UPDATING_START" });
    dispatch(setActiveTab(5));

    const { uid, state } = params;
    let packagesPrice = Object.keys(state.packagesPrice).map(item => (state.packagesPrice[item]));
    const db = database.database();

    db
      .ref('photographer_service_information')
      .child(uid)
      .update({
        packagesPrice: packagesPrice,
        updated: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        db
          .ref('user_metadata')
          .child(uid)
          .update({
            priceStartFrom: packagesPrice[0].price,
            updated: firebase.database.ServerValue.TIMESTAMP
          })
          .then(() => {
            dispatch({
              type: "PROFILE_MANAGER_UPDATING_SUCCESS",
              payload: { status: "OK", message: "Data updated" }
            });
          });
      })
      .then(() => {
        dispatch(fetchPhotographerServiceInformation(uid));
      })
      .then(() => {
        dispatch(tellThemThatWasSuccessOrFailed('success'));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const setActiveTab = (tabNumber) => {
  return {
    type: 'UPDATE_ACTIVE_TAB',
    payload: tabNumber
  }
};

export const updateScheduleNotAvailableDates = (uid, notAvailableDates) => {
  return dispatch => {
    dispatch({ type: 'PROFILE_MANAGER_UPDATING_START' });
    dispatch(setActiveTab(6));

    const notAvailableDatesAsDateStringList = notAvailableDates.map(item => moment(item).format('YYYY-MM-DD'));
    database
      .database()
      .ref('photographer_service_information')
      .child(uid)
      .update({
        notAvailableDates: notAvailableDatesAsDateStringList,
        updated: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        dispatch({ type: 'PROFILE_MANAGER_UPDATING_SUCCESS' });
      })
      .then(() => {
        dispatch(fetchPhotographerServiceInformation(uid));
      })
      .then(() => {
        dispatch(tellThemThatWasSuccessOrFailed('success'));
      })
      .catch((error) => {
        console.log(error);
      })
  };
};
