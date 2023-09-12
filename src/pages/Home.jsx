import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import ChatInterface from "../Components/ChatInterface";
import { selectCurrentUser } from "../store/user/user.selector.js";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentWindowSize } from "../store/window-size/window.selector";
import { doc, onSnapshot } from "firebase/firestore";
import { firestoredb } from "..";
import { getUserChats } from "../utils/getUserChats";
import { selectUserChats } from "../store/user-chats/user-chats.actions";
import Verification from "./Verification";
const Home = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const userChatsRef = doc(firestoredb, "userChats", currentUser.uid);
  useEffect(() => {
    const onNext = async (doc) => {
      const contactData = await getUserChats(doc.data());
      dispatch(selectUserChats(contactData));
    };
    const getChats = async () => {
      const unsub = onSnapshot(userChatsRef, onNext);
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const { isMobileDevice, showMobileMessages } = useSelector(
    selectCurrentWindowSize
  );
  if (
    currentUser.email !== "undefined" &&
    currentUser.emailVerified === false
  ) {
    return <Verification />;
  }

  if (currentUser.emailVerified) {
    if (isMobileDevice) {
      return (
        <div className="homepage-wrapper">
          <div>{showMobileMessages ? <ChatInterface /> : <Sidebar />}</div>
        </div>
      );
    }
    return (
      <div className="homepage-wrapper">
        <div>
          <Sidebar />
          <ChatInterface />
        </div>
      </div>
    );
  }
};

export default Home;
