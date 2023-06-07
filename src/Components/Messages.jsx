import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../Contexts/ChatContext";
import { firestoredb } from "..";
import Message from "./Message";
import { showEmojiContext } from "../Contexts/ShowEmojiContext";
const Messages = ({ toggleChatOn }) => {
  const { state } = useContext(showEmojiContext);
  const { data } = useContext(ChatContext); // data is used here to know the specific friend one just clicked
  //This knowledge is important as it is used to fetch messages depending on the selected friend.
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(firestoredb, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      }
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);
  return (
    <div className={state ? "messages small" : "messages"}>
      {messages.map((m) => (
        <Message message={m} key={m.id} toggleChatOn={toggleChatOn} />
      ))}
    </div>
  );
};

export default Messages;
