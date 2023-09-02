import { CONTACT_ACTION_TYPES } from "./contact-action-types";
const INITIAL_STATE = {
  contact: null,
  chatId: null,
  showChat: false,
};
export const contactsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONTACT_ACTION_TYPES.SELECT_CONTACT:
      return {
        showChat: true,
        contact: payload.contactInfo,
        chatId: payload.chatId,
      };
    default:
      return state;
  }
};
