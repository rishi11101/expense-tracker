// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider} from 'firebase/auth'

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUFbOic9eB3gGF8HKpAqfrizcp80WF3mI",
  authDomain: "expense-tracker-b64af.firebaseapp.com",
  projectId: "expense-tracker-b64af",
  storageBucket: "expense-tracker-b64af.appspot.com",
  messagingSenderId: "851694096022",
  appId: "1:851694096022:web:5181240a58d0b38a023cb7",
  measurementId: "G-TH3VL4TLBD"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

export const db = getFirestore(app)      //ref to database