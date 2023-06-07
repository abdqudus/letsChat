import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function EmojiPicker({ handleEmoji }) {
  console.log(handleEmoji);
  return (
    <div className="picker">
      <Picker data={data} onEmojiSelect={console.log} />
    </div>
  );
}
