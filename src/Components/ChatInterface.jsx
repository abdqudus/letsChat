import React, { useContext } from "react";
import Input from "./Input";
import Messages from "./Messages";
import ChatNav from "./ChatNav";
import { showChatContext } from "../Contexts/ShowChatContext";
import { showEmojiContext } from "../Contexts/ShowEmojiContext";
import Emoji from "./emoji";
import { useState } from "react";
import SelectedImg from "./selectedImg";
import { mobileDeviceChatContext } from "../Contexts/ShowMobileDeviceChat";
import { selectedImgContext } from "../Contexts/SelectedImgContext";
const ChatInterface = () => {
  const { showMobileChat } = useContext(mobileDeviceChatContext);

  const [emoji, setEmoji] = useState();
  const showChat = useContext(showChatContext).state;
  const showEmoji = useContext(showEmojiContext).state;
  const showSelectedImg = useContext(selectedImgContext).state;
  const handleEmoji = (emoji) => {
    setEmoji(emoji);
  };
  if (showChat) {
    return (
      <>
        <div className="chat-interface big">
          <ChatNav />
          {!showSelectedImg && <Messages />}
          {showEmoji && <Emoji handleEmoji={handleEmoji} />}
          {!showSelectedImg && <Input emoji={emoji} />}
          {showSelectedImg && <SelectedImg />}
        </div>
        {showMobileChat && (
          <div className="chat-interface small" id="chat-interface-sm">
            <ChatNav />
            {!showSelectedImg && <Messages />}
            {showEmoji && <Emoji handleEmoji={handleEmoji} />}
            {!showSelectedImg && <Input emoji={emoji} />}
            {showSelectedImg && <SelectedImg />}
          </div>
        )}
      </>
    );
  }
  return (
    <div className="start-chatting">
      <h3> Click on a user to start chatting</h3>
    </div>
  );
};

export default ChatInterface;
