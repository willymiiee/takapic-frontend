import { database } from '../../services/firebase';
import history from '../../services/history';

const updateUserMetadataPhotoProfile = (reference, photoProfileUrl) => {
  const db = database.database();
  const ref = db.ref('/user_metadata');
  const userRef = ref.child(reference);

  userRef.update({ photoProfileUrl });
};

export const imageSelectedAction = fileObject => {
  return dispatch => {
    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      dispatch({
        type: 'USER_INIT_PROFILE_UPLOAD_PHOTO_PROFILE_IMAGE_SELECTED',
        payload: {
          file: fileObject,
          imagePreviewUrl: fileReader.result
        }
      });
    };
    fileReader.readAsDataURL(fileObject);
  };
};

export const uploadPhotoProfile = (fileObject, uid, displayName) => {
  return dispatch => {
    dispatch({ type: 'USER_INIT_PROFILE_UPLOAD_PHOTO_PROFILE_START' });

    let fileExt = '.jpg';
    if (fileObject.type === 'image/jpeg') {
      fileExt = '.jpg';
    } else if (fileObject.type === 'image/png') {
      fileExt = '.png';
    }

    const storageRef = database.storage().ref();
    const photoPath = `pictures/user-photo-profile/${uid}${fileExt}`;
    const pictureRef = storageRef.child(photoPath);

    pictureRef
      .put(fileObject, { contentType: fileObject.type })
      .then(snapshot => {
        const downloadURL = snapshot.downloadURL;
        dispatch({
          type: 'USER_INIT_PROFILE_UPLOAD_PHOTO_PROFILE_SUCCESS',
          payload: downloadURL,
        });

        database.auth().currentUser.updateProfile({
          displayName: displayName,
          photoURL: downloadURL,
        });

        updateUserMetadataPhotoProfile(uid, downloadURL);

        dispatch({
          type: 'USER_AUTH_UPDATE_PROFILE',
          payload: { photoURL: downloadURL },
        });

        history.push('/photographer-registration/s3');
      })
      .catch(error => {
        dispatch({
          type: 'USER_INIT_PROFILE_UPLOAD_PHOTO_PROFILE_ERROR',
          payload: error,
        });
      });
  };
};

export const uploadPhonenumber = (phoneNumberCountryCode, phoneNumber, reference) => {
  return dispatch => {
    dispatch({ type: 'USER_INIT_PROFILE_UPLOAD_PHONENUMBER_START ' });

    const ref = database.database().ref('/user_metadata');
    const metadataRef = ref.child(reference);
    metadataRef
      .update({
        phoneDialCode: phoneNumberCountryCode,
        phoneNumber,
        firstLogin: false,
      })
      .then(() => {
        dispatch({ type: 'USER_INIT_PROFILE_UPLOAD_PHONENUMBER_SUCCESS ' });
        dispatch({
          type: 'USER_AUTH_UPDATE_METADATA',
          payload: { phoneDialCode: phoneNumberCountryCode, phoneNumber, firstLogin: false },
        });
        history.push('/photographer-registration/finish');
      })
      .catch(error => {
        dispatch({
          type: 'USER_INIT_PROFILE_UPLOAD_PHONENUMBER_ERROR',
          payload: error,
        });
      });
  };
};
