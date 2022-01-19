import { call, put, takeEvery } from "redux-saga/effects";
import {
  jobCreateRequest,
  jobDeleteRequest,
  jobListRequest,
  jobRequest,
  jobListSuccess,
  jobRequestSuccess,
  jobError,
  bulkJobRequest,
  bulkJobSuccess,
  jobSearchListRequest,
  jobSearchListSuccess,
} from "./index";
import history from "../../history";
import { ROUTES } from "../../routes";
import axios from "../axios";

async function jobListApi({ query }) {
  const resp = await axios.get(`job/all${query ? query : ""}`);
  return resp.data;
}

export function* jobListSaga({ payload }) {
  try {
    const user = yield call(jobListApi, payload);
    yield put(jobListSuccess(user));
  } catch (e) {
    yield put(jobError(e.message));
  }
}
export function* jobSearchListSaga({ payload }) {
  try {
    const user = yield call(jobListApi, payload);
    yield put(jobSearchListSuccess(user));
  } catch (e) {
    yield put(jobError(e.message));
  }
}
async function jobDeleteApi(data) {
  const resp = await axios.post(`job/delete/${data}`);
  return resp.data;
}

export function* jobDeleteSaga({ payload }) {
  try {
    const user = yield call(jobDeleteApi, payload);
    console.log(user);
    yield put(jobListRequest());
  } catch (e) {
    yield put(jobError(e.message));
  }
}

async function jobCreateApi(data) {
  const resp = await axios.post(`job/create/`, { ...data });
  return resp.data;
}

export function* jobCreateSaga({ payload }) {
  try {
    const user = yield call(jobCreateApi, payload);
    console.log(user);
    yield put(jobListRequest());
  } catch (e) {
    yield put(jobError(e.message));
  }
}

async function jobBulkApi(data) {
  const resp = await axios.post("job/create/bulk", data);
  return resp.data;
}

export function* jobBulkSaga({ payload }) {
  try {
    const user = yield call(jobBulkApi, payload);
    yield put(bulkJobSuccess(user));
  } catch (e) {
    yield put(jobError(e.message));
  }
}

export function* watchJobSaga() {
  yield takeEvery(jobListRequest, jobListSaga);
  yield takeEvery(jobSearchListRequest, jobSearchListSaga);
  yield takeEvery(jobDeleteRequest, jobDeleteSaga);
  yield takeEvery(jobCreateRequest, jobCreateSaga);
  yield takeEvery(bulkJobRequest, jobBulkSaga);
}
