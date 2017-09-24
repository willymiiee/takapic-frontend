import { database } from 'services/firebase';

export const uploadPhotoProfile = () => {
  return dispatch => {
    dispatch({ type: 'PHOTOGRAPHER_UPLOAD_PHOTO_PROFILE_START' });

    const ppRef = database.database().ref('user_photo_profile');
    ppRef
      .update({
        'eksa-aja-gmail-com': {
          photo_path: 'https://data.cloudinary.com/eksa-aja/eksa-aja.png',
        },
      })
      .then(
        result => {
          dispatch({
            type: 'PHOTOGRAPHER_UPLOAD_PHOTO_PROFILE_SUCCESS',
          });
        },
        error => {
          dispatch({
            type: 'PHOTOGRAPHER_UPLOAD_PHOTO_PROFILE_ERROR',
            payload: error,
          });
        }
      );
  };
};
