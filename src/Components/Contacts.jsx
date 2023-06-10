import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Contexts/ChatContext";
import { AuthContext } from "../Contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { firestoredb } from "../index";
import { showChatContext } from "../Contexts/ShowChatContext";
import { Navigate } from "react-router-dom";
import { mobileDeviceChatContext } from "../Contexts/ShowMobileDeviceChat";
import defaultDP from "../img/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
export const Contacts = () => {
  const photo = <FontAwesomeIcon icon={faCameraRetro} />;
  const { dispatch } = useContext(ChatContext);
  const secondDispatch = useContext(showChatContext).dispatch;
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { setShowMobileChat, width } = useContext(mobileDeviceChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(firestoredb, "userChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const handleSelect = (info) => {
    dispatch({ type: "change_user", payload: info });
    secondDispatch({ type: "show chat", payload: true });
    if (width <= 600) {
      setShowMobileChat(true);
    }
  };

  if (chats) {
    return (
      <div className="contacts-panel">
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date) //this ensures the contacts are arranged in terms of latest message
          .filter((chat) => chat[1].lastMessage) //this ensures that the contacts rendered are only those the user has chatted with
          .map((chat) => (
            <div
              className="contacts"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img
                src={
                  chat[1].userInfo.photoURL
                    ? chat[1].userInfo.photoURL
                    : defaultDP
                }
              />
              <p>{chat[1].userInfo.displayName}</p>
              {!chat[1].lastMessage.url && (
                <p>
                  {chat[1].lastMessage.text.length > 24
                    ? chat[1].lastMessage.text.substr(0, 25) + "..."
                    : chat[1].lastMessage.text}
                </p>
              )}
              {chat[1].lastMessage.url && (
                <div style={{ display: "flex", gap: ".5em" }}>
                  {photo}{" "}
                  <p>
                    {chat[1].lastMessage.text &&
                    chat[1].lastMessage.text.length > 25
                      ? chat[1].lastMessage.text.substr(0, 25) + "..."
                      : chat[1].lastMessage.text.length < 25
                      ? chat[1].lastMessage.text
                      : "Photo"}
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  }
  return <Navigate to="bad-network" />;
};
