import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
	// apiKey: 'AIzaSyD6vA7rr68uDCsGdIwoKMj6QPflFDK_deE',
	// authDomain: 'whatsfordinner-a595e.firebaseapp.com',
	// databaseURL: 'https://whatsfordinner-a595e.firebaseio.com',
	// projectId: 'whatsfordinner-a595e',
	// storageBucket: 'whatsfordinner-a595e.appspot.com',
	// messagingSenderId: '236985381389',
	// appId: '1:236985381389:web:f554fef55a4350face5b44',
	// measurementId: 'G-VRG26JJQWZ'
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APPID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
});

// firebase.analytics();
firebase.firestore();

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;
