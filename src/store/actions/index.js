import { checkUserById } from '../../services/user';
import { firebase } from '../../services/firebase';

export const SET_USER = 'SET_USER';
export const GET_USER = 'GET_USER';

export function setUser(user, from) {
  console.log(from);
  return { type: SET_USER, user };
}

export function getUser() {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        checkUserById(user.uid)
          .then(user => {
            return dispatch(setUser(user, 'dari firebase'));
          })
          .catch(error => {
            return dispatch(setUser(false, 'error cek id'));
          });
      } else {
        dispatch(setUser(false, 'tidak login'));
      }
    });

    // let id = localStorage.getItem('id');
    // if(id === null){
    //   dispatch(setUser(false));
    // } else {
    //   checkUserById(id)
    //   .then((user) => dispatch(setUser(user)))
    //   .catch((error) => {
    //     localStorage.removeItem('id');
    //     dispatch(setUser(false));
    //   });
    // }
  };
}
