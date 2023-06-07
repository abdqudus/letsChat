import { getDatabase, ref, serverTimestamp, set } from "firebase/database";
export default function setDatabase(userId, name) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    name,
    lastOnline: serverTimestamp(),
    isOnline: false,
  });
}
