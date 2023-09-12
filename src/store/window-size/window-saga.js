import { all, call, put, takeEvery } from "redux-saga/effects";
import { WINDOW_ACTION_TYPES } from "./window-.action-types";
import { setScreenSize } from "./window.action";

function* dispatchWindowSize() {
  const screenSize = window.innerWidth;

  yield put(setScreenSize(screenSize));
}
export function* onWindowResize() {
  yield takeEvery(WINDOW_ACTION_TYPES.RESIZE_WINDOW_START, dispatchWindowSize);
}
export function* windowSizeSaga() {
  yield all([call(onWindowResize)]);
}
