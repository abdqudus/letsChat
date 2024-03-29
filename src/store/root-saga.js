import { all, call } from "redux-saga/effects";
import { usersSagas } from "./user/user.saga";
import { windowSizeSaga } from "./window-size/window-saga";
import { connectionSagas } from "./connection/connection.saga";
export function* rootSaga() {
  yield all([call(usersSagas), call(windowSizeSaga), call(connectionSagas)]);
}
