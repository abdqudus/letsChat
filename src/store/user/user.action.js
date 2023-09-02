import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const signInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_START, { email, password });
export const signInFailure = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);
export const signOutFailure = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);
export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);