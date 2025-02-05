import { db } from './config.js';
import { 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc, 
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore';

export const dbService = {
    // User operations
    async createUser(userId, userData) {
        try {
            await setDoc(doc(db, "users", userId), {
                ...userData,
                createdAt: new Date(),
                problemsSolved: 0,
                totalSubmissions: 0
            });
        } catch (error) {
            throw error;
        }
    },

    async getUserProfile(userId) {
        try {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            }
            return null;
        } catch (error) {
            throw error;
        }
    },

    async updateUserProfile(userId, updateData) {
        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, updateData);
        } catch (error) {
            throw error;
        }
    },

    // Problem operations
    async submitSolution(userId, problemId, solution) {
        try {
            const submissionRef = collection(db, "submissions");
            await setDoc(doc(submissionRef), {
                userId,
                problemId,
                solution,
                timestamp: new Date(),
                status: "pending"
            });
        } catch (error) {
            throw error;
        }
    },

    async getUserSubmissions(userId) {
        try {
            const submissionsRef = collection(db, "submissions");
            const q = query(submissionsRef, where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw error;
        }
    }
};
