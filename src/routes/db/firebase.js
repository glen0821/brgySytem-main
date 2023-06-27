// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSzKdyIc8d9Ica73Vbtq7ssVbkIMzcX1c",
  authDomain: "barangaysn3.firebaseapp.com",
  projectId: "barangaysn3",
  storageBucket: "barangaysn3.appspot.com",
  messagingSenderId: "973238776470",
  appId: "1:973238776470:web:4418abb366fcd442ef88b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


