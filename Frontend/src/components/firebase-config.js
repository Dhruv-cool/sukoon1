// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVS3904m_nPD0SYKNiIw7fjV1CcoEBI5o",
  authDomain: "sukoon-app-98987.firebaseapp.com",
  projectId: "sukoon-app-98987",
  storageBucket: "sukoon-app-98987.firebasestorage.app",
  messagingSenderId: "858381221211",
  appId: "1:858381221211:web:bd4bcacfb6682c33d36e7e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
