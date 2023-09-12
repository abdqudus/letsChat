import { AnyAction } from "@reduxjs/toolkit";
import { selectEmoji } from "./emoji-actions";
type EmojiState = {
  readonly showEmoji: boolean;
};
const INITIAL_STATE: EmojiState = {
  showEmoji: false,
};

export const emojiReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): EmojiState => {
  const { payload } = action;

  if (selectEmoji.match(action)) {
    return { showEmoji: payload };
  }

  return state;
};
