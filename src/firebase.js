// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore";  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH2K9rZkuc2P6npoXw5sEzRhl3ZJRvmfQ",
  authDomain: "pizzacart-69006.firebaseapp.com",
  projectId: "pizzacart-69006",
  storageBucket: "pizzacart-69006.appspot.com",
  messagingSenderId: "467607741154",
  appId: "1:467607741154:web:b456ed41f65e6b2261b4bb",
  measurementId: "G-WR8V9J8JTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

