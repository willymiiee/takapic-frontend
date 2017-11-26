import { database, facebookAuthProvider, googleAuthProvider } from '../../services/firebase';
import history from '../../services/history';
import { dashify } from '../../helpers/helpers';
import { USER_PHOTOGRAPHER } from '../../services/userTypes';

const createUserMetadata = async (accountProviderType, uid, reference, userType, displayName) => {
  try {
    let referenceFix = reference;
    if (referenceFix !== 'google.com') {
      referenceFix = dashify(reference);
    }

    const db = database.database();
    const child = db.ref('/user_metadata').child(dashify(referenceFix));
    const result_data = await child.once('value');
    const data = await result_data.val();
    let initialMetadata = {
      uid,
      accountProviderType,
      email: reference === 'google.com' ? '-' : reference,
      userType,
      firstLogin: true,
      displayName
    };

    if (userType === USER_PHOTOGRAPHER) {
      initialMetadata.phoneNumber = '-';
      initialMetadata.defaultDisplayPictureUrl = '-';
      initialMetadata.priceStartFrom = 0;
      initialMetadata.rating = 0;
    }

    if (data === null) {
      await child.set(initialMetadata);
      return true;
    }
  } catch (error) {
    return new Error('Failed to create user metadata, ' + error.message);
  }
};

export const userSignupByEmailPassword = (
  email,
  password,
  displayName,
  userType
) => {
  return dispatch => {
    database
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(result) {
        result.sendEmailVerification();
        createUserMetadata('email', result.uid, email, userType, displayName)
          .then(() => {

            // Logout Implicitly
            database
              .auth()
              .signOut()
              .then(() => {
                console.log('Logout implicitly');
              })
              .catch(error => {
                console.log('Error logging out', error);
              });
            // End Logout

          })
          .catch(error => {
            console.log(error);
          });

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
          payload: { ...error, completeName: displayName, email, password },
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

        createUserMetadata('facebook.com', result.user.uid, email, userType, displayName)
          .then(() => {
            const payload = {
              uid: result.user.uid,
              email: result.user.providerData[0].email,
              emailVerified: result.user.emailVerified,
              displayName,
              photoURL: result.user.photoURL,
              providerId: 'facebok.com',
              refreshToken: result.user.refreshToken
            };

            dispatch({ type: 'USER_AUTH_LOGIN_SUCCESS', payload });
          })
          .then(() => {
            fetchUserMetadata('facebook.com', email, dispatch);
          })
          .catch(error => {
            console.log(error);
          });
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

export const userSignupByGoogle = userType => {
  return dispatch => {
    dispatch({ type: 'USER_AUTH_LOGIN_START' });
    googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    database
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(result => {
        const uid = result.user.uid;
        const reference = 'googlecom-' + uid;
        const displayName = result.user.displayName;

        createUserMetadata('google.com', uid, reference, userType, displayName)
          .then(() => {
            const payload = {
              uid,
              email: '-',
              emailVerified: true,
              displayName,
              photoURL: result.user.photoURL,
              providerId: 'google.com',
              refreshToken: result.user.refreshToken
            };

            dispatch({ type: 'USER_AUTH_LOGIN_SUCCESS', payload });
          })
          .then(() => {
            fetchUserMetadata('google.com', reference, dispatch);
          })
          .catch(error => {
            console.log(error);
          });
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

const fetchUserMetadata = (accountProviderType, reference, dispatch) => {
  let referenceFix = reference;
  if (accountProviderType !== 'google.com') {
    referenceFix = dashify(reference);
  }

  const db = database.database();
  db
    .ref('/user_metadata')
    .child(referenceFix)
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
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebaseAuth.onAuthStateChanged(user => {
          if (user) {
            const payload = {
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              displayName: user.displayName,
              photoURL: user.photoURL,
              providerId: 'email',
              refreshToken: user.refreshToken
            };

            dispatch({ type: 'USER_AUTH_LOGIN_SUCCESS', payload });
            fetchUserMetadata('email', email, dispatch);

            /*if (!user.emailVerified) {
              dispatch({
                type: 'USER_AUTH_LOGIN_ERROR',
                payload: { message: 'User not verified.' },
              });
            } else {
              dispatch({ type: 'USER_AUTH_LOGIN_SUCCESS', payload });
              fetchUserMetadata('email', email, dispatch);
            }*/
          }
        });
      })
      .catch(error => {
        dispatch({
          type: 'USER_AUTH_LOGIN_ERROR',
          payload: error,
        });
    });
  };
};

export const loggingOut = () => {
  return dispatch => {
    const firebaseAuth = database.auth();
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch({ type: 'USER_AUTH_LOGOUT_SUCCESS' });
        history.push('/');
        window.location.reload(true);
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: 'USER_AUTH_LOGOUT_ERROR' });
        history.push('/');
        window.location.reload(true);
      });
  };
};
