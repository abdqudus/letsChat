import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestoredb } from "../index";
import { useNavigate } from "react-router-dom";
import defaultDP from "../img/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import { showSmallScreenMessage } from "../store/window-size/window.action";
import { selectContact } from "../store/contacts/contact-actions";
export const Contacts = () => {
  const photo = <FontAwesomeIcon icon={faCameraRetro} />;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    const getChats = async () => {
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

  const handleSelect = (contactInfo) => {
    const chatId =
      currentUser.uid > contactInfo.uid
        ? currentUser.uid + "@" + contactInfo.uid
        : contactInfo.uid + "@" + currentUser.uid;
    dispatch(showSmallScreenMessage());
    dispatch(selectContact({ contactInfo, chatId }));
  };

  if (chats) {
    return (
      <div className="contacts-panel">
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date) //this ensures the contacts are arranged in terms of latest message
          .filter((chat) => {
            return chat[1].lastMessage;
          }) //this ensures that the contacts rendered are only those the user has chatted with
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
              <h3>{chat[1].userInfo.displayName}</h3>
              {!chat[1].lastMessage.url && (
                <p>
                  {chat[1].lastMessage.text.length > 24
                    ? chat[1].lastMessage.text.substr(0, 25) + "..."
                    : chat[1].lastMessage.text}
                </p>
              )}
              {chat[1].lastMessage.url && (
                <div className="last-msg-div">
                  {photo}
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
  } else {
    navigate("bad-network");
  }
};
