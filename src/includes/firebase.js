/* eslint-disable object-curly-newline */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// eslint-disable-next-line operator-linebreak, object-curly-newline
const {
  VUE_APP_API_KEY: apiKey,
  VUE_APP_AUTH_DOMAIN: authDomain,
  VUE_APP_PROJECT_ID: projectId,
  VUE_APP_STORAGE_BUCKET: storageBucket,
  VUE_APP_APP_ID: appId,
} = process.env;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  appId,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const userCollection = db.collection('users');
const songsCollection = db.collection('songs');

export { auth, db, userCollection, songsCollection, storage };
