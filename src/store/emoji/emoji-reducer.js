import { EMOJI_ACTION_TYPES } from "./emoji-types";

const INITIAL_STATE = {
  showEmoji: false,
};

export const emojiReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case EMOJI_ACTION_TYPES.SHOW_EMOJI:
      return { ...state, showEmoji: payload };

    default:
      return state;
  }
};
