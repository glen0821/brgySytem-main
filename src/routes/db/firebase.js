// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSzKdyIc8d9Ica73Vbtq7ssVbkIMzcX1cr",
  authDomain: "barangaysystem-ea148.firebaseapp.com",
  projectId: "barangaysystem-ea148",
  storageBucket: "barangaysystem-ea148.appspot.com",
  messagingSenderId: "912893823823",
  appId: "1:912893823823:web:f258783102343dc3e1d33a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


