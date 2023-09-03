import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const signInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_START, { email, password });
export const signUpStart = (email, password, displayName, img) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
    img,
  });
export const ReInitializeUser = (payload) =>
  createAction(USER_ACTION_TYPES.REINITIALIZE_USER, payload);
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
export const signUpSuccess = (credentials) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, credentials);
export const signUpFailure = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);
