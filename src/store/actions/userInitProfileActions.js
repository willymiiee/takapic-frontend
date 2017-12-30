import firebase from 'firebase';
import { database } from '../../services/firebase';
import history from '../../services/history';

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
        updated: firebase.database.ServerValue.TIMESTAMP
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
