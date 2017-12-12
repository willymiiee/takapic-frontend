import firebase from 'firebase';
import { database, facebookAuthProvider, googleAuthProvider } from '../../services/firebase';
import history from '../../services/history';
import { USER_PHOTOGRAPHER } from '../../services/userTypes';

const initialiazePhotographerProfileData = uid => {
  const initialProfileData = {
    serviceReviews: {
      rating: {
        label: 'Common',
        value: 3
      },
      impressions: [
        { label: 'Friendly', value: 0.5 },
        { label: 'Skillful', value: 0.5 },
        { label: 'Comprehensive', value: 0.5 }
      ]
    }
  };

  database
    .database()
    .ref('photographer_service_information')
    .child(uid)
    .set(initialProfileData);
};

const createUserMetadata = async (uid, email, userType, displayName) => {
  try {
    const db = database.database();
    const child = db.ref('user_metadata').child(uid);
    const result_data = await child.once('value');
    const data = await result_data.val();

    if (data === null) {
      let metaData = {
        uid,
        email,
        userType,
        firstLogin: true,
        displayName,
        phoneNumber: '-',
        created: firebase.database.ServerValue.TIMESTAMP
      };

      if (userType === USER_PHOTOGRAPHER) {
        metaData.rating = 3;
        metaData.priceStartFrom = 0;
        metaData.defaultDisplayPictureUrl = '-';
      }

      await child.set(metaData);
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

        // Here we send email the email verification
        result.sendEmailVerification();

        createUserMetadata(result.uid, email, userType, displayName)
          .then(() => {
            if (userType === USER_PHOTOGRAPHER) {
              initialiazePhotographerProfileData(result.uid);
            }

            // Logout Implicitly
            database.auth()
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

        createUserMetadata(result.user.uid, email, userType, displayName)
          .then(() => {
            const payload = {
              uid: result.user.uid,
              email: result.user.providerData[0].email,
              emailVerified: result.user.emailVerified,
              displayName,
              photoURL: result.user.photoURL,
              refreshToken: result.user.refreshToken
            };

            dispatch({ type: 'USER_AUTH_LOGIN_SUCCESS', payload });
          })
          .then(() => {
            fetchUserMetadata(result.user.uid, dispatch);
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
        const email = result.user.email;
        const displayName = result.user.displayName;

        createUserMetadata(uid, email, userType, displayName)
          .then(() => {
            const payload = {
              uid,
              email: '-',
              emailVerified: true,
              displayName,
              photoURL: result.user.photoURL,
              refreshToken: result.user.refreshToken
            };

            dispatch({ type: 'USER_AUTH_LOGIN_SUCCESS', payload });
          })
          .then(() => {
            fetchUserMetadata(uid, dispatch);
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

const fetchUserMetadata = (uid, dispatch) => {
  database.database()
    .ref('user_metadata')
    .child(uid)
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
              refreshToken: user.refreshToken
            };

            dispatch({ type: 'USER_AUTH_LOGIN_SUCCESS', payload });
            fetchUserMetadata(user.uid, dispatch);

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
