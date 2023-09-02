import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { firestoredb } from "..";

const removeDp = async (userCredential) => {
  const { displayName } = userCredential;
  await updateProfile(userCredential, {
    displayName,
    photoURL: "",
  });
  await updateDoc(doc(firestoredb, "users", userCredential.uid), {
    photoURL: "",
  });
};
export default removeDp;
