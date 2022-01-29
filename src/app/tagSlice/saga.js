import { call, put, takeEvery } from "redux-saga/effects";
import {
  tagCreateRequest,
  tagDeleteRequest,
  tagListRequest,
  tagRequest,
  tagListSuccess,
  tagRequestSuccess,
  tagError,
} from "./index";
import history from "../../history";
import { ROUTES } from "../../routes";
import axios from "../axios";

async function tagCreateApi(name) {
  const resp = await axios.post(`tag/create/`, { name });
  return resp.data;
}

export function* tagCreateSaga({ payload }) {
  try {
    const user = yield call(tagCreateApi, payload);
    yield put(tagListRequest(payload.name));
  } catch (e) {
    yield put(tagError(e.message));
  }
}

async function tagListApi(data) {
  const resp = await axios.get(`tag/find/?name=${data}`);
  return resp.data;
}

export function* tagListSaga({ payload }) {
  if (!payload) return;
  try {
    const user = yield call(tagListApi, payload);
    yield put(tagListSuccess(user));
  } catch (e) {
    yield put(tagError(e.message));
  }
}

export function* watchTagSaga() {
  yield takeEvery(tagListRequest, tagListSaga);
  yield takeEvery(tagCreateRequest, tagCreateSaga);
}
