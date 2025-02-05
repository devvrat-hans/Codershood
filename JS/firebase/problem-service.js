import { db } from './firebase-config.js';
import { 
    collection, 
    getDocs, 
    query, 
    where,
    orderBy,
    limit 
} from "firebase/firestore";

export const problemService = {
    async getProblems(filters = {}) {
        try {
            let q = collection(db, "problems");
            
            if (filters.difficulty) {
                q = query(q, where("difficulty", "==", filters.difficulty));
            }
            
            if (filters.category) {
                q = query(q, where("category", "==", filters.category));
            }
            
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