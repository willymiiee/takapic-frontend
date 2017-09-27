import { database, facebookAuthProvider } from 'services/firebase';
import history from '../../services/history';
import { dashify } from '../../helpers/helpers';
import { USER_PHOTOGRAPHER } from '../../services/userTypes';

const createUserMetadata = (email, userType, displayName) => {
  const db = database.database();
  const ref = db.ref('/user_metadata');
  const metadataRef = ref.child(dashify(email));
  metadataRef.set({
    userType: userType,
    firstLogin: true,
    displayName: displayName,
    phoneNumber: '-',
  });
};

export const userSignupByEmailPassword = (
  email,
  password,
  displayName,
  userType
) => {
  return dispatch => {
    dispatch({ type: 'USER_SIGNUP_START' });
    database
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(result) {
        createUserMetadata(email, userType, displayName);
        result.sendEmailVerification();

        dispatch({
          type: 'USER_SIGNUP_SUCCESS',
          payload: { status: 'OK', message: 'User created', uid: result.uid },
        });

        history.push('/photographer-registration/s1-checkmail');
      })
      .catch(function(error) {
        console.log(error);
        dispatch({
          type: 'USER_SIGNUP_ERROR',
          payload: error,
        });
      });
  };
};

export const userSignupByFacebook = userType => {
  return dispatch => {
    dispatch({ type: 'USER_AUTH_LOGIN_START' });
    facebookAuthProvider.addScope('public_profile,email');
    database
      .auth()
      .signInWithPopup(facebookAuthProvider)
      .then(result => {
        const email = result.additionalUserInfo.profile.email;
        const displayName = result.additionalUserInfo.profile.name;
        createUserMetadata(email, userType, displayName);
        dispatch({ type: 'USER_AUTH_LOGIN_SUCCESS', payload: result.user });
        fetchUserMetadata(email, dispatch);
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: 'USER_AUTH_LOGIN_ERROR',
          payload: error,
        });
      });
  };
};

const fetchUserMetadata = (email, dispatch) => {
  const db = database.database();
  db
    .ref('/user_metadata/' + dashify(email))
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      dispatch({
        type: 'USER_AUTH_LOGIN_SUCCESS_FETCH_USER_METADATA',
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
    dispatch({
      type: 'USER_AUTH_LOGIN_START',
      payload: { loggingIn: true },
    });

    const firebaseAuth = database.auth();
    firebaseAuth.signInWithEmailAndPassword(email, password).catch(error => {
      dispatch({
        type: 'USER_AUTH_LOGIN_ERROR',
        payload: error,
      });
    });

    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        if (!user.emailVerified) {
          dispatch({
            type: 'USER_AUTH_LOGIN_ERROR',
            payload: { message: 'User not verified.' },
          });
        } else {
          dispatch({ type: 'USER_AUTH_LOGIN_SUCCESS', payload: user });
          fetchUserMetadata(email, dispatch);
        }
      }
    });
  };
};

export const loggingOut = () => {
  return dispatch => {
    dispatch({ type: 'USER_AUTH_LOGOUT_START' });

    const firebaseAuth = database.auth();
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch({ type: 'USER_AUTH_LOGOUT_SUCCESS' });
        history.push('/');
        window.location.reload(true);
      })
      .catch(error => {
        dispatch({ type: 'USER_AUTH_LOGOUT_ERROR' });
        history.push('/');
        window.location.reload(true);
      });
  };
};
