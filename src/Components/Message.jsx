import React, { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import { selectEmojiSlice } from "../store/emoji/emoji-selector";
const Message = ({ message }) => {
  const currentUser = useSelector(selectCurrentUser);
  const ref = useRef();
  const { showEmoji } = useSelector(selectEmojiSlice);
  useEffect(() => {
    const handleScroll = async () => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    handleScroll();
  }, [message, showEmoji]);

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
