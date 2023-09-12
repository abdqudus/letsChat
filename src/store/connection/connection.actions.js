import { createAction } from "../../utils/reducer/reducer.utils";
import { CONNECTION_TYPES } from "./connection.types";
export const getFriendConnectionStatus = (userReference) =>
  createAction(CONNECTION_TYPES.GET_FRIEND_CONNECTION_STATUS, userReference);
export const connectionStatusSuccess = (status) => {
  console.log(status);
  return createAction(CONNECTION_TYPES.CONNECTION_STATUS_SUCCESS, status);
};
export const connectionStatusError = (error) =>
  createAction(CONNECTION_TYPES.CONNECTION_STATUS_ERROR, error);
