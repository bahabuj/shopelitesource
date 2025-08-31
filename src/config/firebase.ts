// Import the functions you need from the SDKs you need 
import { initializeApp } from "firebase/app"; 
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration 
const firebaseConfig = { 
  apiKey: "AIzaSyBXEVuxxgCip7_ys869jznIf5Sd4c9jVN8", 
  authDomain: "elitesource-d491c.firebaseapp.com", 
  projectId: "elitesource-d491c", 
  storageBucket: "elitesource-d491c.firebasestorage.app", 
  messagingSenderId: "638148210007", 
  appId: "1:638148210007:web:e7e9b0015a8681685c2212" 
}; 

// Initialize Firebase 
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const provider = new GoogleAuthProvider();