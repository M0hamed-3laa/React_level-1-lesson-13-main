// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDN1F7vZ2YeRpPDwNn7Hxs339T_3TRucz8",
  authDomain: "react2-d0557.firebaseapp.com",
  projectId: "react2-d0557",
  storageBucket: "react2-d0557.appspot.com",
  messagingSenderId: "825122315193",
  appId: "1:825122315193:web:803efdd31bf3471b43b468",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
