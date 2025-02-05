import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";

export const initializeFirebase = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};