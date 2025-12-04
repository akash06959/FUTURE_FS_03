import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// PASTE YOUR FIREBASE KEYS HERE
const firebaseConfig = {
    apiKey: "AIzaSyDPWL2XSHuZM57m4TvKGgXJZOkIrFw2cWQ",
    authDomain: "yale-art-school.firebaseapp.com",
    projectId: "yale-art-school",
    storageBucket: "yale-art-school.firebasestorage.app",
    messagingSenderId: "596211136256",
    appId: "1:596211136256:web:ed56faf607e55357ff65e5",
    measurementId: "G-XE1W5K19YG"
  };

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);