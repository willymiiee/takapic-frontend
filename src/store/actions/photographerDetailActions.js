import { database } from 'services/firebase';
import { dashify } from '../../helpers/helpers';

export const fetchPhotographerDetail = email => {
  return dispatch => {
    const db = database.database();
    db
      .ref('/photographer_service_information/' + dashify(email))
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        dispatch({
          type: 'PHOTOGRAPHER_DETAIL_FETCH_SUCCESS',
          payload: data,
        });
      });
  };
};
