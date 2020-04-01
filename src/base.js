import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyCDYVSWCA_qwexbRcnn8hI9kCAUepx1ZCo',
  authDomain: 'whatsfordinner3-1da9c.firebaseapp.com',
  databaseURL: 'https://whatsfordinner3-1da9c.firebaseio.com',
  projectId: 'whatsfordinner3-1da9c',
  storageBucket: 'whatsfordinner3-1da9c.appspot.com',
  messagingSenderId: '244213751470',
  appId: '1:244213751470:web:ff156c97caf5d38a94173f'
  // apiKey: process.env.REACT_APP_FIREBASE_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APPID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
});

firebase.firestore();

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;
