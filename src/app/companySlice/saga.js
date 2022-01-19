import { call, put, takeEvery } from "redux-saga/effects";
import {
  companyCreateRequest,
  companyDeleteRequest,
  companyListRequest,
  companyRequest,
  companyListSuccess,
  companyRequestSuccess,
  companyError,
} from "./index";
import history from "../../history";
import { ROUTES } from "../../routes";
import axios from "../axios";
import { isFulfilled } from "@reduxjs/toolkit";

async function companyListApi(data) {
  if (!data) return;
  const resp = await axios.get(`company/all?name=${data ? data : ""}`);
  return resp.data;
}

export function* companyListSaga({ payload }) {
  if (!payload) return;
  try {
    const user = yield call(companyListApi, payload);
    yield put(companyListSuccess(user));
  } catch (e) {
    yield put(companyError(e.message));
  }
}

async function companyDeleteApi(data) {
  const resp = await axios.post(`company/delete/${data}`);
  return resp.data;
}

export function* companyDeleteSaga({ payload }) {
  try {
    const user = yield call(companyDeleteApi, payload);
    console.log(user);
    yield put(companyListRequest());
  } catch (e) {
    yield put(companyError(e.message));
  }
}

async function companyCreateApi(data) {
  const resp = await axios.post(`company/create/`, { ...data });
  return resp.data;
}

export function* companyCreateSaga({ payload }) {
  try {
    const user = yield call(companyCreateApi, payload);
    console.log(user);
    yield put(companyListRequest());
  } catch (e) {
    yield put(companyError(e.message));
  }
}

export function* watchCompanySaga() {
  yield takeEvery(companyListRequest, companyListSaga);
  yield takeEvery(companyDeleteRequest, companyDeleteSaga);
  yield takeEvery(companyCreateRequest, companyCreateSaga);
}
