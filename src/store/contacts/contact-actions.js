import { createAction } from "../../utils/reducer/reducer.utils";
import { CONTACT_ACTION_TYPES } from "./contact-action-types";

export const selectContact = (data) => {
  return createAction(CONTACT_ACTION_TYPES.SELECT_CONTACT, data);
};
