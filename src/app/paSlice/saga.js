import { call, put, takeEvery } from "redux-saga/effects";
import {
  getClientBindingRequest,
  getClientBindingSuccess,
  getClientBindingFailed,
  addClientBindingRequest,
  addClientBindingSuccess,
  addClientBindingFailed,
  getFeatureBindingRequest,
  getFeatureBindingSuccess,
  getFeatureBindingFailed,
  addFeatureBindingRequest,
  addFeatureBindingSuccess,
  addFeatureBindingFailed,
  getMatrixBindingRequest,
  getMatrixBindingSuccess,
  getMatrixBindingFailed,
  addMatrixBindingRequest,
  addMatrixBindingSuccess,
  addMatrixBindingFailed,
} from "./index";
import axios from "../axios";

async function getClientBindingApi(clientId) {
  const resp = await axios.get(`/pa/client-binding?client_id=${clientId}`);
  return resp.data;
}

export function* getClientBindingSaga({ payload }) {
  console.log("----->", payload);
  try {
    const data = yield call(getClientBindingApi, payload);
    console.log("----->", data);
    yield put(getClientBindingSuccess(data.data));
  } catch (e) {
    yield put(getClientBindingFailed(e.message));
  }
}

export function* watchPaSaga() {
  yield takeEvery(getClientBindingRequest, getClientBindingSaga);
}
