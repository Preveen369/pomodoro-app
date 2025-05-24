// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmt8cnFLOiBUal6k25rPIMX3gHNyGBQa8",
  authDomain: "pomodoro-app-7b05a.firebaseapp.com",
  projectId: "pomodoro-app-7b05a",
  storageBucket: "pomodoro-app-7b05a.firebasestorage.app",
  messagingSenderId: "211843967366",
  appId: "1:211843967366:web:dd6127c66f90812402e407",
  measurementId: "G-3N0GY8KM08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);