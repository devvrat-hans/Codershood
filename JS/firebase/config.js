import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD5iyQX6Lw9qOcqHNAja3GZVAanvjWPzBI",
    authDomain: "codershood.netlify.app", // Replace with your domain
    projectId: "codershood19",
    storageBucket: "codershood19.appspot.com",
    messagingSenderId: "200999819648",
    appId: "1:200999819648:web:ca9437d4f39c496123c965"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };