import { call, put, takeEvery } from "redux-saga/effects";
import {
  actionCreateRequest,
  actionDeleteRequest,
  actionListRequest,
  actionRequest,
  actionListSuccess,
  actionRequestSuccess,
  actionError,
} from "./index";
import history from "../../history";
import { ROUTES } from "../../routes";
import axios from "../axios";

async function actionListApi(data) {
  const resp = await axios.get("action/all");
  return resp.data;
}

export function* actionListSaga({ payload }) {
  try {
    const user = yield call(actionListApi, payload);
    yield put(actionListSuccess(user));
  } catch (e) {
    yield put(actionError(e.message));
  }
}

async function actionDeleteApi(data) {
  const resp = await axios.post(`action/delete/${data}`);
  return resp.data;
}

export function* actionDeleteSaga({ payload }) {
  try {
    const user = yield call(actionDeleteApi, payload);
    yield put(actionListRequest());
  } catch (e) {
    yield put(actionError(e.message));
  }
}

async function actionCreateApi(data) {
  const resp = await axios.post(`action/create/`, { ...data });
  return resp.data;
}

export function* actionCreateSaga({ payload }) {
  try {
    const user = yield call(actionCreateApi, payload);
    yield put(actionListRequest());
  } catch (e) {
    yield put(actionError(e.message));
  }
}

export function* watchActionSaga() {
  yield takeEvery(actionListRequest, actionListSaga);
  yield takeEvery(actionDeleteRequest, actionDeleteSaga);
  yield takeEvery(actionCreateRequest, actionCreateSaga);
}
