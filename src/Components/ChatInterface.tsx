import Input from "./Input";
import Messages from "./Messages";
import ChatNav from "./ChatNav";
import Emoji from "./emoji";
import { useState } from "react";
import SelectedImg from "./selectedImg";
import { useSelector } from "react-redux";
import { selectCurrentWindowSize } from "../store/window-size/window.selector";
import { selectContactSlice } from "../store/contacts/contact-selector";
import { selectedImgSlice } from "../store/selectedImg/selected-img-selector";
import { selectEmojiSlice } from "../store/emoji/emoji-selector";
const ChatInterface = () => {
  const { isMobileDevice } = useSelector(selectCurrentWindowSize);
  const [emoji, setEmoji] = useState("");
  const { showChat } = useSelector(selectContactSlice);
  const { showEmoji } = useSelector(selectEmojiSlice);
  const { showSelectedImg } = useSelector(selectedImgSlice);
  const handleEmoji = (emoji: string) => {
    setEmoji(emoji);
  };
  if (showChat) {
    const size = isMobileDevice ? "small" : "big";
    return (
      <>
        <div className={`chat-interface ${size}`}>
          <ChatNav />
          {!showSelectedImg && <Messages />}
          {showEmoji && <Emoji handleEmoji={handleEmoji} />}
          {!showSelectedImg && <Input emoji={emoji} />}
          {showSelectedImg && <SelectedImg />}
        </div>
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
