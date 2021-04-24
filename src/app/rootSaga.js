import { all, call } from "redux-saga/effects";
import { watchAuthSaga } from "./authSlice/saga";

export default function* rootSaga() {
  yield all([call(watchAuthSaga)]);
}
