// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3lD_qe3A5_9ncQ5ypkOo-Fklx2u8ot5Q",
  authDomain: "taskly-89c42.firebaseapp.com",
  projectId: "taskly-89c42",
  storageBucket: "taskly-89c42.appspot.com",
  messagingSenderId: "652915399360",
  appId: "1:652915399360:web:c53e2b8e25ec6ff5ae2b25",
  measurementId: "G-JLB3NKMBK9",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
// export const analytics = getAnalytics(app);
