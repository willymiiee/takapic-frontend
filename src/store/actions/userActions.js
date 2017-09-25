import { database } from 'services/firebase';
import history from '../../services/history';
import { userSignupByEmailPasswordService } from '../../services/auth';
import { USER_PHOTOGRAPHER } from '../../services/userTypes';

export const userSignupByEmailPassword = (
  email,
  password,
  displayName,
  userType
) => {
  return dispatch => {
    dispatch({ type: 'PHOTOGRAPHER_SIGNUP_START' });
    userSignupByEmailPasswordService(
      email,
      password,
      displayName,
      userType
    ).then(
      result => {
        if (result.status === 'OK' && result.uid) {
          dispatch({
            type: 'PHOTOGRAPHER_SIGNUP_SUCCESS',
            payload: result,
          });

          history.push('/photographer-registration/s1-checkmail');
        } else {
          dispatch({
            type: 'PHOTOGRAPHER_SIGNUP_ERROR',
            payload: result,
          });
        }
      },
      error => {
        dispatch({
          type: 'PHOTOGRAPHER_SIGNUP_ERROR',
          payload: error,
        });
      }
    );
  };
};

const createUIDChars = strEmail => {
  const rgxPatt = /[._@]+/g;
  return strEmail.replace(rgxPatt, '-');
};

const fetchUserMetadata = (email, dispatch) => {
  const db = database.database();
  db
    .ref('/user_metadata/' + createUIDChars(email))
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      dispatch({
        type: 'USER_LOGIN_SUCCESS_FETCH_USER_METADATA',
        payload: data,
      });
      if (data.userType === USER_PHOTOGRAPHER && data.firstLogin) {
        history.push('/photographer-registration/s2');
      } else {
        history.push('/');
      }
    });
};

export const loggingIn = (email, password) => {
  return dispatch => {
    dispatch({ type: 'USER_LOGIN_START', payload: { loggingIn: true } });

    const firebaseAuth = database.auth();
    firebaseAuth.signInWithEmailAndPassword(email, password).catch(error => {
      dispatch({ type: 'USER_LOGIN_ERROR', payload: error });
    });

    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        if (!user.emailVerified) {
          user.sendEmailVerification().then(() => {
            dispatch({
              type: 'USER_LOGIN_ERROR',
              payload: { message: 'User not verified.' },
            });
          });
        } else {
          dispatch({ type: 'USER_LOGIN_SUCCESS', payload: user });
          fetchUserMetadata(email, dispatch);
        }
      }
    });
  };
};

export const loggingOut = () => {
  return dispatch => {
    dispatch({ type: 'USER_LOGOUT_START' });

    const firebaseAuth = database.auth();
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch({ type: 'USER_LOGOUT_SUCCESS' });
        history.push('/');
        window.location.reload(true);
      })
      .catch(error => {
        dispatch({ type: 'USER_LOGOUT_ERROR' });
        history.push('/');
        window.location.reload(true);
      });
  };
};
