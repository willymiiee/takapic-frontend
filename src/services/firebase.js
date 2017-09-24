import firebase from 'firebase';
const DATABASE_URL = 'https://takapic-project.firebaseio.com';

const config = {
  apiKey: 'AIzaSyDSrUpNAUexu_aZe0QdXapw91vZN9PbrfE',
  authDomain: 'takapic-project.firebaseapp.com',
  databaseURL: DATABASE_URL,
  projectId: 'takapic-project',
  storageBucket: 'takapic-project.appspot.com',
  messagingSenderId: '839607725532',
};

export const database = firebase.initializeApp(config);
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
