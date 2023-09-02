import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { USER_ACTION_TYPES } from "./user.types";

import { auth, getCurrentUser } from "../..";
import {
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
} from "./user.action";
import { all, call, put, takeLatest } from "redux-saga/effects";

function* signIn({ payload }) {
  const { email, password } = payload;
  try {
    const user = yield call(signInWithEmailAndPassword, auth, email, password);
    yield put(signInSuccess(user.user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_START, signIn);
}

export function* handleSignOut() {
  try {
    const auth = getAuth();
    yield call(signOut, auth);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, handleSignOut);
}
export function* signInLoggedInUser() {
  try {
    const user = yield call(getCurrentUser);
    if (!user) return;
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, signInLoggedInUser);
}

export function* usersSagas() {
  yield all([
    call(onCheckUserSession),
    call(onSignInStart),
    call(onSignOutStart),
  ]);
}
