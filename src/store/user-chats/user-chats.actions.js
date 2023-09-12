import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_CHAT_ACTION_TYPES } from "./user-chat.types";

export const selectUserChats = (data) => {
  return createAction(USER_CHAT_ACTION_TYPES.GET_USER_CHATS, data);
};
