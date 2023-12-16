
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDKNLrPv-5xXxVosfyJ-iKjGNOGh88M52c",
  authDomain: "gasoline-hack-4d043.firebaseapp.com",
  projectId: "gasoline-hack-4d043",
  storageBucket: "gasoline-hack-4d043.appspot.com",
  messagingSenderId: "1081455038917",
  appId: "1:1081455038917:web:84d777bcc852a391597bac",
  measurementId: "G-K4HVMSSMSH"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)