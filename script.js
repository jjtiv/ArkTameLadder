// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnRP12nXtY10cetd5lX6AmgBVZmRol_sE",
  authDomain: "atljjtiv.firebaseapp.com",
  projectId: "atljjtiv",
  storageBucket: "atljjtiv.firebasestorage.app",
  messagingSenderId: "726975353449",
  appId: "1:726975353449:web:7e0e8ea399e4e5c4ca48f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);