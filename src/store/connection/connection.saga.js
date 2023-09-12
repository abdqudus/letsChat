import { all, call, put, takeLatest } from "redux-saga/effects";
import { getFriendOnlineStatus } from "../../utils/onlineStatus";
import { CONNECTION_TYPES } from "./connection.types";
import {
  connectionStatusError,
  connectionStatusSuccess,
} from "./connection.actions";
function* getStatus({ payload }) {
  const userRef = payload;
  try {
    const status = yield call(getFriendOnlineStatus, userRef);
    yield put(connectionStatusSuccess(status));
  } catch (error) {
    yield put(connectionStatusError(error));
  }
}
export function* onGetFriendConnection() {
  yield takeLatest(CONNECTION_TYPES.GET_FRIEND_CONNECTION_STATUS, getStatus);
}
export function* setFriendConnectionStatus({ payload }) {
  try {
    yield put(connectionStatusSuccess(payload));
  } catch (error) {
    yield put(connectionStatusError(error));
  }
}
export function* onFriendConnectionStatusChange() {
  yield takeLatest(
    CONNECTION_TYPES.SET_FRIEND_CONNECTION_STATUS,
    setFriendConnectionStatus
  );
}
export function* connectionSagas() {
  yield all([
    call(onGetFriendConnection),
    call(onFriendConnectionStatusChange),
  ]);
}
