// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATQrU5F6BK6EdzcINY84lOQHWNn2bc1uQ",
  authDomain: "react-cursos-28b68.firebaseapp.com",
  projectId: "react-cursos-28b68",
  storageBucket: "react-cursos-28b68.appspot.com",
  messagingSenderId: "830034809680",
  appId: "1:830034809680:web:820dbc477f58eedf989255"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp) // funcionalidades de auth
export const FirebaseDB = getFirestore(FirebaseApp) // configuración de DB