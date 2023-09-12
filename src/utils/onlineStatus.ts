import { User } from "firebase/auth";
import { database } from "..";
import {
  onDisconnect,
  onValue,
  ref,
  remove,
  serverTimestamp,
  set,
  child,
  get,
  getDatabase,
} from "firebase/database";
import { Middleware } from "@reduxjs/toolkit";
import { createAction } from "./reducer/reducer.utils";
import { CONNECTION_TYPES } from "../store/connection/connection.types";
const connectedRef = ref(database, ".info/connected");
export let contactUid: string;

export const setOnlineStatus = (currentUser: User) => {
  const lastOnlineRef = ref(database, `users/${currentUser.uid}/lastOnline`);
  const isOnlineRef = ref(database, `users/${currentUser.uid}/isOnline`);
  return onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      set(ref(database, `users/${currentUser.uid}`), {
        isOnline: true,
        time: serverTimestamp(),
        name: currentUser.displayName,
      });
      remove(lastOnlineRef);
      onDisconnect(lastOnlineRef).set(serverTimestamp());
      onDisconnect(isOnlineRef).set(false);
    }
  });
};

const contactMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === "contacts/SELECT_CONTACT") {
    contactUid = action.payload.contactInfo.uid;
  }

  next(action);
  const friendStatusRef = ref(database, `users/${contactUid}`);
  onValue(friendStatusRef, (snapshot) => {
    if (snapshot.val()?.isOnline) {
      return createAction(CONNECTION_TYPES.GET_FRIEND_CONNECTION_STATUS, {
        isOnline: true,
        lastOnline: "",
      });
    } else {
      return createAction(CONNECTION_TYPES.GET_FRIEND_CONNECTION_STATUS, {
        isOnline: false,
        lastSeen: snapshot.val()?.lastOnline,
      });
    }
  });
};

export const getFriendOnlineStatus = async (userId: string) => {
  const dbRef = ref(getDatabase());
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      console.log(snapshot.val());
      const { isOnline, lastOnline } = snapshot.val();
      return { isOnline, lastOnline };
    }
  } catch (error) {
    console.log(error);
  }
};
export default contactMiddleware;
