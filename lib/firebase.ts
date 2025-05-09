// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN688C85dhFzUVNzS_d7zFCugwcfTa4xw",
  authDomain: "taskt-e5321.firebaseapp.com",
  projectId: "taskt-e5321",
  storageBucket: "taskt-e5321.firebasestorage.app",
  messagingSenderId: "252194454609",
  appId: "1:252194454609:web:b68e83b143d6fd43c9cc70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };