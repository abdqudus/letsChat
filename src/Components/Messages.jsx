import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestoredb } from "..";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectContactSlice } from "../store/contacts/contact-selector";
import { selectEmojiSlice } from "../store/emoji/emoji-selector";
const Messages = () => {
  const { showEmoji } = useSelector(selectEmojiSlice);
  const data = useSelector(selectContactSlice);
  // data is used here to know the specific friend one just clicked
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
    <div className={showEmoji ? "messages small" : "messages"}>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
