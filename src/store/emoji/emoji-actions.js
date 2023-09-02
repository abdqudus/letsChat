import { createAction } from "../../utils/reducer/reducer.utils";
import { EMOJI_ACTION_TYPES } from "./emoji-types";

export const emojiAction = (boolean) =>
  createAction(EMOJI_ACTION_TYPES.SHOW_EMOJI, boolean);
