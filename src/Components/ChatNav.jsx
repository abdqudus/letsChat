import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ref,
  onValue,
  onDisconnect,
  set,
  serverTimestamp,
  remove,
  get,
  child,
  getDatabase,
} from "firebase/database";
import BackArrow from "../img/back.png";
import { ChatContext } from "../Contexts/ChatContext";
import { database as db } from "..";
import { AuthContext } from "../Contexts/AuthContext";
import dateChecker from "../utils/dateChecker";
import { mobileDeviceChatContext } from "../Contexts/ShowMobileDeviceChat";
import defaultDP from "../img/user.png";
const ChatNav = () => {
  const [status, setStatus] = useState({ isOnline: false, lastSeen: null });
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const statusRef = useRef({});
  const friendStatusRef = ref(db, `users/${data.user.uid}`);
  const connectedRef = ref(db, ".info/connected");
  const lastOnlineRef = ref(db, `users/${currentUser.uid}/lastOnline`);
  const isOnlineRef = ref(db, `users/${currentUser.uid}/isOnline`);
  const { setShowMobileChat } = useContext(mobileDeviceChatContext);
  const handleClick = () => {
    setShowMobileChat(false);
  };
  useEffect(() => {
    if (data.chatId !== "null") {
      const unsubscribeConnected = onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
          set(ref(db, `users/${currentUser.uid}`), {
            isOnline: true,
            time: serverTimestamp(),
            name: currentUser.displayName,
          });
          remove(lastOnlineRef);
          onDisconnect(lastOnlineRef).set(serverTimestamp());
          onDisconnect(isOnlineRef).set(false);
        }
      });
      return () => {
        unsubscribeConnected();
      };
    }
  }, []);
  onValue(friendStatusRef, (snapshot) => {
    if (snapshot.val().isOnline) {
      statusRef.current = { isOnline: snapshot.val().isOnline };
    } else {
      const date = new Date(snapshot.val().lastOnline).toLocaleString("en-US", {
        hour12: true,
        timeStyle: "short",
        dateStyle: "medium",
      });
      statusRef.current = { isOnline: false, lastSeen: date };
    }
  });
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${data.user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setStatus(snapshot.val());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [statusRef.current.isOnline, data.user.uid]);
  let lastSeen = statusRef.current?.lastSeen;
  let lastSeenString;
  if (lastSeen) {
    const day = dateChecker(lastSeen);
    const time = statusRef.current.lastSeen.slice(13);
    if (day === "today" || day === "yesterday") {
      lastSeenString = `last seen ${day} at ${time} `;
    } else {
      lastSeenString = `last seen on ${day}  `;
    }
  }

  return (
    <>
      <nav>
        <div>
          <img
            className="back-arrow hide"
            src={BackArrow}
            alt="back arrow"
            onClick={handleClick}
          />
          <img
            className="dp"
            src={data.user.photoURL ? data.user.photoURL : defaultDP}
            alt="display picture"
          />
          <p>{data.user.displayName}</p>
          {statusRef.current.isOnline && <span> online</span>}
          {lastSeenString && <span> {lastSeenString}</span>}
        </div>
      </nav>
    </>
  );
};

export default ChatNav;
