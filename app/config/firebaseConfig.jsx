// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl81Blb8jra1vhwk8XfiMBFpLQPmLdIa4",
  authDomain: "project-2025-40dab.firebaseapp.com",
  projectId: "project-2025-40dab",
  storageBucket: "project-2025-40dab.firebasestorage.app",
  messagingSenderId: "174045646037",
  appId: "1:174045646037:web:40786e10c6198bd962e65c",
  measurementId: "G-KG6K1RTNJV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
export const analytics = getAnalytics(app);
