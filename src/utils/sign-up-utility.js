import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, firestoredb, storage } from "..";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import setDatabase from "./setDatabase";

export const signUpUtility = async (email, password, displayName, img) => {
  try {
    console.log(email, password, displayName, img);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (img) {
      const imgRef = ref(
        storage,
        `images/${userCredential.user.uid}/${displayName}`
      );
      await uploadBytes(imgRef, img);
      const url = await getDownloadURL(imgRef);
      await updateProfile(userCredential.user, {
        displayName,
        photoURL: url,
      });
      await setDoc(doc(firestoredb, "users", userCredential.user.uid), {
        about: "Hey there, i'm using chatApp",
        uid: userCredential.user.uid,
        displayName,
        email,
        photoURL: url,
      });
    } else {
      console.log("none");
      await updateProfile(userCredential.user, {
        displayName,
        photoURL: "",
      });
      await setDoc(doc(firestoredb, "users", userCredential.user.uid), {
        about: "Hey there, i'm using chatApp",
        uid: userCredential.user.uid,
        displayName,
        email,
        photoURL: "",
      });
    }

    await setDoc(doc(firestoredb, "userChats", userCredential.user.uid), {});
    setDatabase(userCredential.user.uid, displayName);
    if (!userCredential.user.emailVerified) {
      sendEmailVerification(userCredential.user);
    }
    return userCredential;
  } catch (error) {
    throw new Error(error);
  }
};
