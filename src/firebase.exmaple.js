// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR_CONFIG",
  authDomain: "YOUR_CONFIG",
  projectId: "YOUR_CONFIG",
  storageBucket: "YOUR_CONFIG",
  messagingSenderId: "YOUR_CONFIG",
  appId: "YOUR_CONFIG",
  measurementId: "YOUR_CONFIG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);