import { storage } from './config.js';
import { 
    ref, 
    uploadBytes, 
    getDownloadURL, 
    deleteObject 
} from 'firebase/storage';

export const storageService = {
    async uploadProfilePicture(userId, file) {
        try {
            const storageRef = ref(storage, `users/${userId}/profile.jpg`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            throw error;
        }
    },

    async uploadSubmissionFile(userId, problemId, file) {
        try {
            const fileName = `${Date.now()}_${file.name}`;
            const storageRef = ref(storage, `submissions/${userId}/${problemId}/${fileName}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            throw error;
        }
    },

    async deleteFile(path) {
        try {
            const storageRef = ref(storage, path);
            await deleteObject(storageRef);
        } catch (error) {
            throw error;
        }
    },

    async getFileURL(path) {
        try {
            const storageRef = ref(storage, path);
            return await getDownloadURL(storageRef);
        } catch (error) {
            throw error;
        }
    }
};