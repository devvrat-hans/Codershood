import { auth, db } from './firebase-config.js';
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const authService = {
    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    },

    async register(email, password, username) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", userCredential.user.uid), {
                username,
                email,
                problemsSolved: 0,
                joinedDate: new Date()
            });
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    },

    async logout() {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    }
};