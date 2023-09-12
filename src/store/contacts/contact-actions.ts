import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CONTACT_ACTION_TYPES } from "./contact-action-types";
export type ContactInfoType = {
  photoURL: null | string;
  uid: string;
  displayName: string;
};
export type ContactDataType = {
  chatId: string;
  contactInfo: ContactInfoType;
};
export type StatusRef = {
  isOnline: boolean | null;
  lastSeen?: string;
};

export type SelectContactType = ActionWithPayload<
  CONTACT_ACTION_TYPES.SELECT_CONTACT,
  ContactDataType
>;

export const selectContact = withMatcher(
  (contactData: ContactDataType): SelectContactType => {
    return createAction(CONTACT_ACTION_TYPES.SELECT_CONTACT, contactData);
  }
);

// Here is what happened:
// Normally the selectContact function that returns an action creator is:
// const selectContact=()=> return createAction(CONTACT_ACTION_TYPES.SELECT_CONTACT, contactData);
// However to type it with withMatcher, we first create the type that would be returned fromthe function.
// That is we created a type that will be an object in the form of the object returned by selectContact function
// Then, the selectContact function was now wrapped with withMatcher.
