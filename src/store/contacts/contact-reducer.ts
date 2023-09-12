import { AnyAction } from "@reduxjs/toolkit";
import { ContactDataType, selectContact } from "./contact-actions";

type ContactState = ContactDataType & { showChat: boolean };

const INITIAL_STATE: ContactState = {
  contactInfo: { displayName: "", photoURL: null, uid: "" },
  chatId: "",
  showChat: false,
};

export const contactsReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): ContactState => {
  if (selectContact.match(action)) {
    return {
      showChat: true,
      contactInfo: action.payload.contactInfo,
      chatId: action.payload.chatId,
    };
  }
  return state;
};
