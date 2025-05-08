// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp }  from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuiZWtS8Ggz-OIJ8SrKvUcq_hYWuKCpEg",
  authDomain: "tasktree-c6911.firebaseapp.com",
  projectId: "tasktree-c6911",
  storageBucket: "tasktree-c6911.firebasestorage.app",
  messagingSenderId: "650846877951",
  appId: "1:650846877951:web:b4342fabd811d731e0b4ca",
  measurementId: "G-16GH86VEDK"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const analytics = getAnalytics(app);
export {app,db,analytics};
