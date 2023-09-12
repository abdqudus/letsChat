import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import {
  User,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import {
  getFirestore,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";
import { ContactInfoType } from "./store/contacts/contact-actions";
const firebaseConfig = {
  apiKey: "AIzaSyB-qO_fcMMdnEV4HnZtUg7LF-_bhzqKmUM",
  authDomain: "letschat-ad03f.firebaseapp.com",
  projectId: "letschat-ad03f",
  storageBucket: "letschat-ad03f.appspot.com",
  messagingSenderId: "551083578094",
  appId: "1:551083578094:web:2d218e3ac24984115299ff",
  measurementId: "G-L6HVRBL031",
  databaseURL: "https://letschat-ad03f-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
export const firestoredb = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});
export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth();
export const db = getFirestore();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
export const sendVerification = (user: User) => sendEmailVerification(user);

export const getChatId = (
  currentUser: User,
  contactInfo: ContactInfoType
): string => {
  const chatId =
    currentUser.uid > contactInfo.uid
      ? currentUser.uid + "@" + contactInfo.uid
      : contactInfo.uid + "@" + currentUser.uid;
  return chatId;
};
