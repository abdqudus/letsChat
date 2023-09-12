import React from "react";
import defaultDP from "../img/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import { showSmallScreenMessage } from "../store/window-size/window.action";
import { selectContact } from "../store/contacts/contact-actions";
import { selectUserChatsSlice } from "../store/user-chats/user-chat.selector";
import { database as db, getChatId } from "..";
import { ref } from "firebase/database";
import { getFriendConnectionStatus } from "../store/connection/connection.actions";

export const Contacts = () => {
  const photo = <FontAwesomeIcon icon={faCameraRetro} />;
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const chats = useSelector(selectUserChatsSlice);

  const handleSelect = (contactInfo) => {
    // const friendStatusRef = ref(db, `users/${contactInfo.uid}`);
    dispatch(getFriendConnectionStatus(contactInfo.uid));
    const chatId = getChatId(currentUser, contactInfo);
    dispatch(showSmallScreenMessage());
    dispatch(selectContact({ contactInfo, chatId }));
  };

  if (chats.length) {
    return (
      <div className="contacts-panel">
        {chats.map((chat) => {
          const { chatId, displayName, lastMessage, url, photoURL, uid } = chat;
          return (
            <div
              className="contacts"
              key={chatId}
              onClick={() => handleSelect({ displayName, photoURL, uid })}
            >
              <img src={photoURL ? photoURL : defaultDP} />
              <h3>{displayName}</h3>
              {!url && (
                <p>
                  {lastMessage > 24
                    ? lastMessage.substr(0, 25) + "..."
                    : lastMessage}
                </p>
              )}
              {url && (
                <div className="last-msg-div">
                  {photo}
                  <p>
                    {lastMessage && lastMessage > 25
                      ? lastMessage.substr(0, 25) + "..."
                      : lastMessage.length < 25
                      ? lastMessage
                      : "Photo"}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
};
