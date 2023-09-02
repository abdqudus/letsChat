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
import { database as db } from "..";
import dateChecker from "../utils/dateChecker";
import defaultDP from "../img/user.png";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import { selectCurrentWindowSize } from "../store/window-size/window.selector";
import { showSmallScreenMessage } from "../store/window-size/window.action";
import { selectContactSlice } from "../store/contacts/contact-selector";
const ChatNav = () => {
  const [status, setStatus] = useState({ isOnline: false, lastSeen: null });
  const data = useSelector(selectContactSlice);
  const currentUser = useSelector(selectCurrentUser);
  const statusRef = useRef({});
  const friendStatusRef = ref(db, `users/${data.contact.uid}`);
  const connectedRef = ref(db, ".info/connected");
  const lastOnlineRef = ref(db, `users/${currentUser.uid}/lastOnline`);
  const isOnlineRef = ref(db, `users/${currentUser.uid}/isOnline`);
  const { isMobileDevice } = useSelector(selectCurrentWindowSize);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(showSmallScreenMessage());
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
    if (snapshot.val()?.isOnline) {
      statusRef.current = { isOnline: snapshot.val()?.isOnline };
    } else {
      const date = new Date(snapshot.val()?.lastOnline).toLocaleString(
        "en-US",
        {
          hour12: true,
          timeStyle: "short",
          dateStyle: "medium",
        }
      );
      statusRef.current = { isOnline: false, lastSeen: date };
    }
  });
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${data.contact.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setStatus(snapshot.val());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [statusRef.current.isOnline, data.contact.uid]);
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
            src={data.contact.photoURL ? data.contact.photoURL : defaultDP}
            alt="display picture"
          />
          <h3>{data.contact.displayName}</h3>
          {statusRef.current.isOnline && <span> online</span>}
          {lastSeenString && <span> {lastSeenString}</span>}
        </div>
      </nav>
    </>
  );
};

export default ChatNav;
