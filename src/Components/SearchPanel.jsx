import React, { useRef, useState } from "react";

import { Contacts } from "./Contacts";
import {
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAt,
  updateDoc,
} from "firebase/firestore";
import { firestoredb } from "../index";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { ChatContext } from "../Contexts/ChatContext";
import { showChatContext } from "../Contexts/ShowChatContext";
import defaultDP from "../img/user.png";
import { mobileDeviceChatContext } from "../Contexts/ShowMobileDeviceChat";
const SearchPanel = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const secondDispatch = useContext(showChatContext).dispatch;
  const [username, setUsername] = useState([]);
  const { setShowMobileChat, width } = useContext(mobileDeviceChatContext);
  const user = useRef(null);
  const handleSearch = async (e) => {
    if (e.target.value) {
      const userName = e.target.value.toLowerCase();
      const q = query(
        collection(firestoredb, "users"),
        orderBy("displayName"),
        startAt(userName),
        endAt(userName + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      const myArr = [];
      querySnapshot.forEach((doc) => {
        myArr.push(doc.data());
      });
      setUsername(myArr);
    } else {
      setUsername([]);
    }
  };
  const handleSelect = async (e) => {
    const element = e.target.id ? e.target : e.target.parentElement;
    user.current = username.find((u) => u.uid === element.id);
    dispatch({ type: "change_user", payload: user.current });
    secondDispatch({ type: "show chat", payload: true });
    if (width <= 600) {
      setShowMobileChat(true);
    }
    setUsername([user.current]);

    const combinedId =
      currentUser.uid > user.current.uid
        ? currentUser.uid + user.current.uid
        : user.current.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(firestoredb, "chats", combinedId));
      if (!res.exists() && currentUser.uid !== user.current.uid) {
        await setDoc(doc(firestoredb, "chats", combinedId), { messages: [] });
        await updateDoc(doc(firestoredb, "userChats", user.current.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(firestoredb, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.current.uid,
            displayName: user.current.displayName,
            photoURL: user.current.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="searchpanel-input">
        <input
          type="search"
          name="username"
          placeholder="Find a user"
          onChange={handleSearch}
        />
      </div>
      {username.map((u) => (
        <div
          className="searched-user-div"
          onClick={(e) => {
            handleSelect(e);
          }}
          key={u.uid}
          id={u.uid}
        >
          <img src={u.photoURL ? u.photoURL : defaultDP} />
          <h4>{u.displayName}</h4>
        </div>
      ))}
      <Contacts />
    </>
  );
};

export default SearchPanel;
