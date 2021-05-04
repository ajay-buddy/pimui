import { all, call } from "redux-saga/effects";
import { watchAuthSaga } from "./authSlice/saga";
import { watchPaSaga } from "./paSlice/saga";

export default function* rootSaga() {
  yield all([call(watchAuthSaga), call(watchPaSaga)]);
}
