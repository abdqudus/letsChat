import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { showEmojiContext } from "../Contexts/ShowEmojiContext";
import { v4 as uuid } from "uuid";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();
  const { state } = useContext(showEmojiContext);
  useEffect(() => {
    const handleScroll = async () => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    handleScroll();
  }, [message, state]);

  const time = new Date(message.date.seconds * 1000).toLocaleString("en-US", {
    hour12: true,
    timeStyle: "short",
  });
  return (
    <div
      ref={ref}
      className={message.senderId === currentUser.uid ? "owner" : "friend"}
    >
      {message.url && <img src={message.url} />}
      {message.text.split("\n").map((m) => (
        <p key={uuid()}>{m}</p>
      ))}

      <span>{time}</span>
    </div>
  );
};

export default Message;
