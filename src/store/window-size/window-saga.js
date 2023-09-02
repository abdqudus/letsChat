import { all, call, put, takeEvery } from "redux-saga/effects";
import { WINDOW_ACTION_TYPES } from "./window-.action-types";
import { windowSizeActionCreator } from "./window.action";

function* dispatchWindowSize() {
  const screenSize = window.innerWidth;

  yield put(windowSizeActionCreator(screenSize));
}
export function* onWindowResize() {
  yield takeEvery(WINDOW_ACTION_TYPES.RESIZE_WINDOW_START, dispatchWindowSize);
}
export function* windowSizeSaga() {
  yield all([call(onWindowResize)]);
}
