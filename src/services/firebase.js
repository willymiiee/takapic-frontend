import Firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyA6rziL0mwPU2exw5W6vIhxy_hWwe0f-HY',
  authDomain: 'your-world-1c7db.firebaseapp.com',
  databaseURL: 'https://your-world-1c7db.firebaseio.com',
  projectId: 'your-world-1c7db',
  storageBucket: 'your-world-1c7db.appspot.com',
  messagingSenderId: '1026062948078',
};
Firebase.initializeApp(config);

let googleAuthProvider = new Firebase.auth.GoogleAuthProvider();

let facebookAuthProvider = new Firebase.auth.FacebookAuthProvider();
facebookAuthProvider.addScope('email');

export const firebase = Firebase;
export const googleProvider = googleAuthProvider;
export const facebookProvider = facebookAuthProvider;
