import firebase from 'firebase';

import { database } from '../../services/firebase';


export const updateUserMetadataPriceStartFrom = (reference, price) => {
  const db = database.database();
  const ref = db.ref('/user_metadata');
  const userRef = ref.child(reference);

  userRef.update({ priceStartFrom: price, updated: firebase.database.ServerValue.TIMESTAMP });
};
