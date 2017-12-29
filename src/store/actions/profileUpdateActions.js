import firebase from 'firebase';
import uuidv4 from 'uuid/v4';
import moment from "moment/moment";
import { database } from "../../services/firebase";
import { updateUserMetadataPriceStartFrom } from "./photographerServiceInfoActionsStep2";
import {
  fetchPhotographerServiceInformation,
  tellThemThatWasSuccessOrFailed
} from './photographerServiceInfoActions'
import axios from "axios/index";

export const updateBasicInformation = (params) => {
  return dispatch => {
    const tasks = [];
    tasks.push(dispatch(updateBasicInformationUser(params)));
    tasks.push(dispatch(updateBasicInformationPhotographer(params)));
    tasks.push(dispatch(setActiveTab(1)));
    return Promise.all(tasks);
  }
};

const updateUserMetadataPhotoProfile = (reference, photoProfileUrl) => {
  const db = database.database();
  const ref = db.ref('user_metadata');
  const userRef = ref.child(reference);
  userRef.update({ photoProfileUrl, updated: firebase.database.ServerValue.TIMESTAMP });
};

const deletePhotoPortofolios = (uid, photos) => {
  if (photos.length > 0) {
    const fullDirectory = `pictures/portofolio-photos/${uid}`;
    const storageRef = firebase.storage().ref();
    let tasks = [];

    for (let itemPhoto in photos) {
      tasks = [ ...tasks, storageRef.child(fullDirectory + '/' + photos[itemPhoto].fileName).delete() ];
    }

    Promise.all(tasks);
  }
};

export const updateBasicInformationUser = (params) => {
  return dispatch => {
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
  return dispatch => {
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
    const { uid, bodies, lenses } = params;

    dispatch({ type: "UPDATE_PROFILE_CAMERA_EQUIPMENT" });
    dispatch(setActiveTab(2));

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
          type: "UPDATE_PROFILE_CAMERA_EQUIPMENT_SUCCESS",
          payload: { status: "OK", message: "Data updated" }
        });
        dispatch(fetchPhotographerServiceInformation(params.uid))
      })
      .then(() => {
        dispatch(tellThemThatWasSuccessOrFailed('success'));
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_PROFILE_CAMERA_EQUIPMENT_ERROR",
          error
        });
      });
  };
};

export const updateMeetingPoints = (params) => {
  return dispatch => {
    const { uid, state } = params;

    dispatch({ type: "UPDATE_PROFILE_MEETING_POINT" });
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
          type: "UPDATE_PROFILE_MEETING_POINT_SUCCESS",
          payload: { status: "OK", message: "Data updated" }
        });
        dispatch(fetchPhotographerServiceInformation(params.uid))
      })
      .then(() => {
        dispatch(tellThemThatWasSuccessOrFailed('success'));
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_PROFILE_MEETING_POINT_ERROR",
          error
        });
      });
  };
};

export const uploadPhotosPortfolio = (params) => {
  return dispatch => {
    const { uid, state: { selectedPhotos, photosPortofolioDeleted } } = params;
    let files = selectedPhotos;
    let percentages = files.map(f => 0);
    let tasks = [];
    let dataImages = [];

    for (let fileItem in files) {
      const fullDirectory = `pictures/portofolio-photos/${uid}`;
      const imageFile = files[fileItem].file;
      let storageRef = firebase
        .storage()
        .ref(fullDirectory + '/' + imageFile.name);

      // Upload file
      tasks = [ ...tasks, storageRef.put(imageFile) ];
      tasks[fileItem].on(
        'state_changed',
        function progress(snapshot) {
          percentages[fileItem] = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          dispatch({
            type: 'PROFILE_MANAGER_UPLOAD_IMAGE_PHOTOS_PORTOFOLIO',
            percentages
          });
        },
        function error(err) {},
        // eslint-disable-next-line
        function complete() {
          let downloadURL = tasks[fileItem].snapshot.downloadURL;
          let payload = {
            id: uuidv4(),
            fileName: imageFile.name,
            url: downloadURL,
            theme: '-',
          };
          dataImages = [ ...dataImages, payload ];
        }
      );
    }

    return Promise.all(tasks)
      .then(() => {
        deletePhotoPortofolios(uid, photosPortofolioDeleted);
      })
      .then(() => {
        dispatch(updatePhotosPortfolio(params, dataImages));
      })
      .then(() => {
        dispatch({ type: "PROFILE_MANAGER_UPDATE_PHOTOS_PORTOFOLIO" });
        dispatch(setActiveTab(4));
      })
      .then(() => {
        dispatch(tellThemThatWasSuccessOrFailed('success'));
      });
  };
};

export const updatePhotosPortfolio = (params, dataImages) => {
  return dispatch => {
    const db = database.database();
    const ref = db.ref('photographer_service_information');
    let { uid, state: { photosPortofolio } } = params;
    const item = ref.child(uid);

    photosPortofolio = photosPortofolio.concat(dataImages);

    item
      .update({ photosPortofolio: photosPortofolio, updated: firebase.database.ServerValue.TIMESTAMP })
      .then(() => {
        dispatch({
          type: "PROFILE_MANAGER_UPDATE_PHOTOS_PORTOFOLIO_SUCCESS",
          payload: { status: "OK", message: "Data updated" }
        });
      })
      .then(() => {
        dispatch(fetchPhotographerServiceInformation(uid));
      })
      .catch(error => {
        dispatch({
          type: "PROFILE_MANAGER_UPDATE_PHOTOS_PORTOFOLIO_ERROR",
          error
        });
      });
  };
};

export const updatePackagesPrice = (params) => {
  return dispatch => {
    const { uid, state } = params;

    let packagesPrice = Object.keys(state.packagesPrice).map(item => (state.packagesPrice[item]));

    dispatch({ type: "UPDATE_PROFILE_PACKAGES_PRICE" });
    dispatch(setActiveTab(5));

    const db = database.database();
    const ref = db.ref("photographer_service_information");
    const metadataRef = ref.child(uid);
    metadataRef
      .update({
        packagesPrice: packagesPrice,
        updated: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        dispatch({
          type: "UPDATE_PROFILE_PACKAGES_PRICE_SUCCESS",
          payload: { status: "OK", message: "Data updated" }
        });
        updateUserMetadataPriceStartFrom(uid, packagesPrice[0].price);
        dispatch(fetchPhotographerServiceInformation(params.uid));
      })
      .then(() => {
        dispatch(tellThemThatWasSuccessOrFailed('success'));
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_PROFILE_PACKAGES_PRICE_ERROR",
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
};

export const updateScheduleNotAvailableDates = (uid, notAvailableDates) => {
  return dispatch => {
    dispatch({ type: 'PROFILE_MANAGER_GLOBAL_UPDATING_ANYTHING_START' });
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
        dispatch({ type: 'PROFILE_MANAGER_GLOBAL_UPDATING_ANYTHING_SUCCESS' });
      })
      .then(() => {
        dispatch(fetchPhotographerServiceInformation(uid));
      })
      .then(() => {
        dispatch(tellThemThatWasSuccessOrFailed('success'));
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: 'PROFILE_MANAGER_GLOBAL_UPDATING_ANYTHING_ERROR' });
      })
  };
};
