import { USER_CHAT_ACTION_TYPES } from "./user-chat.types";
const INITIAL_STATE = [];
export const userChatsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_CHAT_ACTION_TYPES.GET_USER_CHATS:
      console.log(payload);
      return [...payload];
    default:
      return state;
  }
};
