import { database } from '../../services/firebase';
import { dashify } from '../../helpers/helpers';
import history from '../../services/history';

export const uploadPhotoProfile = (fileObject, email, displayName) => {
  return dispatch => {
    dispatch({ type: 'USER_INIT_PROFILE_UPLOAD_PHOTO_PROFILE_START' });

    let fileExt = '.jpg';
    if (fileObject.type === 'image/jpeg') {
      fileExt = '.jpg';
    } else if (fileObject.type === 'image/png') {
      fileExt = '.png';
    }

    const storageRef = database.storage().ref();
    const photoPath = `pictures/user-photo-profile/${dashify(email)}${fileExt}`;
    const pictureRef = storageRef.child(photoPath);

    pictureRef
      .put(fileObject, { contentType: fileObject.type })
      .then(snapshot => {
        console.log('Uploaded', snapshot.totalBytes, 'bytes');
        const downloadURL = snapshot.downloadURL;
        dispatch({
          type: 'USER_INIT_PROFILE_UPLOAD_PHOTO_PROFILE_SUCCESS',
          payload: downloadURL,
        });

        database.auth().currentUser.updateProfile({
          displayName: displayName,
          photoURL: downloadURL,
        });

        dispatch({
          type: 'USER_AUTH_UPDATE_PROFILE',
          payload: { photoURL: downloadURL },
        });

        history.push('/photographer-registration/s3');
      })
      .catch(error => {
        console.log('Upload failed: ', error);
        dispatch({
          type: 'USER_INIT_PROFILE_UPLOAD_PHOTO_PROFILE_ERROR',
          payload: error,
        });
      });
  };
};

export const uploadPhonenumber = (phonenumber, email) => {
  return dispatch => {
    dispatch({ type: 'USER_INIT_PROFILE_UPLOAD_PHONENUMBER_START ' });

    const ref = database.database().ref('/user_metadata');
    const metadataRef = ref.child(dashify(email));
    metadataRef
      .update({
        phoneNumber: phonenumber,
        firstLogin: false,
      })
      .then(() => {
        dispatch({ type: 'USER_INIT_PROFILE_UPLOAD_PHONENUMBER_SUCCESS ' });
        dispatch({
          type: 'USER_AUTH_UPDATE_METADATA',
          payload: { phoneNumber: phonenumber, firstLogin: false },
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
