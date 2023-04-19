// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PUBLIC_DATABASE_URL,
  projectId: process.env.REACT_APP_PUBLIC_PROJECTID,
  storageBucket: process.env.REACT_APP_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_SENDER_ID,
  appId: process.env.REACT_APP_PUBLIC_APPID,
  measurementId: process.env.REACT_APP_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
