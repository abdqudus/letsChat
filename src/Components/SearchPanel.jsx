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
import { firestoredb, getChatId } from "../index";
import defaultDP from "../img/user.png";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import { selectContact } from "../store/contacts/contact-actions";
import { showSmallScreenMessage } from "../store/window-size/window.action";
const SearchPanel = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [username, setUsername] = useState([]);
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
    const chatId = getChatId(currentUser, contactInfo);
    let contactInfo = user.current;
    dispatch(selectContact({ contactInfo, chatId }));
    dispatch(showSmallScreenMessage());
    setUsername([user.current]);

    // if the have no chat previously, the chatId becomes combinedId for both people
    try {
      const res = await getDoc(doc(firestoredb, "chats", chatId));
      if (!res.exists() && currentUser.uid !== user.current.uid) {
        await setDoc(doc(firestoredb, "chats", chatId), { messages: [] });
        await updateDoc(doc(firestoredb, "userChats", user.current.uid), {
          [chatId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [chatId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(firestoredb, "userChats", currentUser.uid), {
          [chatId + ".userInfo"]: {
            uid: user.current.uid,
            displayName: user.current.displayName,
            photoURL: user.current.photoURL,
          },
          [chatId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
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
      {/* <Contacts /> */}
    </>
  );
};

export default SearchPanel;
