import React from "react";
import EmojiPicker from "emoji-picker-react";

export default function Emoji({ handleEmoji }) {
  const previewConfig = { showPreview: false };
  return (
    <div>
      <EmojiPicker
        onEmojiClick={(obj) => handleEmoji(obj.emoji)}
        height={"calc(40vh)"}
        width={"100%"}
        previewConfig={previewConfig}
      />
    </div>
  );
}
