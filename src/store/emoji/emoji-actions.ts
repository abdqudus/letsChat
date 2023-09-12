import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { EMOJI_ACTION_TYPES } from "./emoji-types";

export type EmojiActionType = ActionWithPayload<
  EMOJI_ACTION_TYPES.SHOW_EMOJI,
  boolean
>;
export const selectEmoji = withMatcher(
  (boolean: boolean): EmojiActionType =>
    createAction(EMOJI_ACTION_TYPES.SHOW_EMOJI, boolean)
);
