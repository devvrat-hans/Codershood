import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD5iyQX6Lw9qOcqHNAja3GZVAanvjWPzBI",
    authDomain: "codershood19.firebaseapp.com",
    projectId: "codershood19",
    storageBucket: "codershood19.firebasestorage.app",
    messagingSenderId: "200999819648",
    appId: "1:200999819648:web:ca9437d4f39c496123c965",
    measurementId: "G-MRN7CNTEY0"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);