// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnh-PTcZbB3hwfpjBaalp6rrc05PfW4HA",
  authDomain: "learning-management-syst-45ef3.firebaseapp.com",
  projectId: "learning-management-syst-45ef3",
  storageBucket: "learning-management-syst-45ef3.appspot.com",
  messagingSenderId: "976452343870",
  appId: "1:976452343870:web:a692050a6f3751780d196f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentication
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
