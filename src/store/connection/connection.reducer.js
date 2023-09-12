import { CONNECTION_TYPES } from "./connection.types";

const INITIAL_STATE = {
  isOnline: false,
  lastOnline: "",
};
export const connectionStatusReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONNECTION_TYPES.CONNECTION_STATUS_SUCCESS:
      return { ...payload };
    default:
      return state;
  }
};
