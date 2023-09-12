import { User } from "firebase/auth";
import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
export type UserState = {
  currentUser: null | User;
  isLoading: boolean;
  error: null | Error;
};
// I noticed a bug. When sign up fails, the previous logged in user is logged in back
// I'm reinitializing the user, so that if signup or signin fails,
//  the app will not route directly to a previous logged in account
type UserDetails = {
  email: string;
  password: string;
  displayName?: string;
  img?: string;
};
type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  User
>;

export const signInSuccess = withMatcher(
  (user: User): SignInSuccess =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

type SignInStart = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_START,
  UserDetails
>;
export const signInStart = withMatcher(
  (email: string, password: string): SignInStart =>
    createAction(USER_ACTION_TYPES.SIGN_IN_START, { email, password })
);
type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_START,
  UserDetails
>;

export const signUpStart = withMatcher(
  (
    email: string,
    password: string,
    displayName: string,
    img: string
  ): SignUpStart =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, {
      email,
      password,
      displayName,
      img,
    })
);

type ReinitializeUser = ActionWithPayload<
  USER_ACTION_TYPES.REINITIALIZE_USER,
  UserState
>;
export const reInitializeUser = withMatcher(
  (payload: UserState): ReinitializeUser =>
    createAction(USER_ACTION_TYPES.REINITIALIZE_USER, payload)
);

type SignInFailure = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>;

export const signInFailure = withMatcher(
  (error: Error): SignInFailure =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export const signOutStart = withMatcher(
  (): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

type SignOutFailure = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILED,
  Error
>;

export const signOutFailure = withMatcher(
  (error: Error): SignOutFailure =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);

type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export const signOutSuccess = withMatcher(
  (): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);
type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, User>;

export const signUpSuccess = withMatcher(
  (credentials: User): SignUpSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, credentials)
);

type SignUpFailure = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>;

export const signUpFailure = withMatcher(
  (error: Error): SignUpFailure =>
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);
