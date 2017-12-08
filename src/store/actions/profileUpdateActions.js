import firebase from 'firebase';
import uuidv4 from 'uuid/v4';
import moment from "moment/moment";
import { database } from "../../services/firebase";
import { updateUserMetadataPriceStartFrom } from "./photographerServiceInfoActionsStep2";
import {
  fetchPhotographerServiceInformation,
  tellThemThatWasSuccessOrFailed
} from './photographerServiceInfoActions'

export const updateBasicInformation = (params) => {
  return dispatch => {
    dispatch({ type: "UPDATE_PROFILE_BASIC_INFORMATION" });
    dispatch(setActiveTab(1));

    // Update Photo Profile when file exist
    if (params.state.values.fileImage) {
      dispatch(updatePhotoProfile(params));
      dispatch(fetchPhotographerServiceInformation(params.uid));
    }

    dispatch(updateBasicInformationUser(params));
    dispatch(updateBasicInformationPhotographer(params));
  }
};

const updateUserMetadataPhotoProfile = (reference, photoProfileUrl) => {
  const db = database.database();
  const ref = db.ref('user_metadata');
  const userRef = ref.child(reference);

  userRef.update({ photoProfileUrl });
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

export const updatePhotoProfile = (params) => {
  return dispatch => {
    let { uid, state } = params;
    let { values: { fileImage, name } } = state;

    let fileExt = '.jpg';
    if (fileImage.type === 'image/jpeg') {
      fileExt = '.jpg';
    } else if (fileImage.type === 'image/png') {
      fileExt = '.png';
    }

    const storageRef = database.storage().ref();
    const photoPath = `pictures/user-photo-profile/${uid}${fileExt}`;
    const pictureRef = storageRef.child(photoPath);

    pictureRef
      .put(fileImage, { contentType: fileImage.type })
      .then(snapshot => {
        const downloadURL = snapshot.downloadURL;

        database.auth().currentUser.updateProfile({
          displayName: name,
          photoURL: downloadURL,
        });

        updateUserMetadataPhotoProfile(uid, downloadURL);

      })
  };
};

export const updateBasicInformationUser = (params) => {
  return dispatch => {
    const { uid, state } = params;

    dispatch({ type: "UPDATE_PROFILE_BASIC_INFORMATION_USER" });

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

export const updateBasicInformationPhotographer = (params) => {
  return dispatch => {
    const { uid, state } = params;

    dispatch({ type: "UPDATE_PROFILE_BASIC_INFORMATION_PHOTOGRAPHER" });

    const db = database.database();
    const ref = db.ref("/photographer_service_information");
    const metadataRef = ref.child(uid);
    metadataRef
      .update({
        selfDescription: state.values.selfDescription,
        languages: state.selected.languages,
        location: state.location,
      })
      .then(() => {
        dispatch({
          type: "UPDATE_PROFILE_BASIC_INFORMATION_PHOTOGRAPHER_SUCCESS",
          payload: { status: "OK", message: "Data updated" }
        });
        dispatch(fetchPhotographerServiceInformation(params.uid));
      })
      .then(() => {
        dispatch(tellThemThatWasSuccessOrFailed('success'));
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
    const { uid, bodies, lenses } = params;

    dispatch({ type: "UPDATE_PROFILE_CAMERA_EQUIPMENT" });
    dispatch(setActiveTab(2));

    const db = database.database();
    const ref = db.ref("photographer_service_information");
    const metadataRef = ref.child(uid);
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
        meetingPoints: state.meetingPoints
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
      .update({ photosPortofolio: photosPortofolio })
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
      .update({ notAvailableDates: notAvailableDatesAsDateStringList })
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
