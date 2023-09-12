import { AnyAction } from "@reduxjs/toolkit";
import {
  UserState,
  reInitializeUser,
  signInFailure,
  signInSuccess,
  signOutSuccess,
  signUpFailure,
} from "./user.action";

export const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  const { payload } = action;

  if (signInSuccess.match(action)) {
    return { ...state, currentUser: payload, isLoading: false };
  }
  if (reInitializeUser.match(action)) {
    return payload;
  }
  if (signInFailure.match(action) || signUpFailure.match(action)) {
    return { ...state, error: payload, isLoading: false };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  return state;
};
