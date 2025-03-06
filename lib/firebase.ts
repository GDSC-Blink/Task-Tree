// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnnib7Uwv-P2jHl8D43WJUiab9T52SZkk",
  authDomain: "tasktree-dc33f.firebaseapp.com",
  projectId: "tasktree-dc33f",
  storageBucket: "tasktree-dc33f.firebasestorage.app",
  messagingSenderId: "520379536861",
  appId: "1:520379536861:web:c8febba7eb026866d55234",
  measurementId: "G-6K5SRLRG4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;