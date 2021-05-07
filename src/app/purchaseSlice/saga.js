import { call, put, takeEvery } from "redux-saga/effects";
import {
  addPurchaseRequest,
  addPurchaseSuccess,
  addPurchaseFailed,
  getPurchaseRequest,
  getPurchaseSuccess,
  getPurchaseFailed,
  editPurchaseRequest,
  editPurchaseSuccess,
  editPurchaseFailed,
  deletePurchaseRequest,
  deletePurchaseSuccess,
  deletePurchaseFailed,
} from "./index";
import axios from "../axios";

async function addPurchaseAPI(payload) {
  const resp = await axios.post("purchase", payload);
  return resp.data;
}

export function* addPurchaseSaga({ payload }) {
  try {
    const purchase = yield call(addPurchaseAPI, payload);
    yield put(addPurchaseSuccess(purchase));
    yield put(getPurchaseRequest());
  } catch (e) {
    yield put(addPurchaseFailed(e.message));
  }
}

async function editPurchaseAPI({ id, name, SKU, price }) {
  const resp = await axios.post(`purchase/${id}`, { name, SKU, price });
  return resp.data;
}

export function* editPurchaseSaga({ payload }) {
  try {
    const purchase = yield call(editPurchaseAPI, payload);
    yield put(editPurchaseSuccess(purchase));
  } catch (e) {
    yield put(editPurchaseFailed(e.message));
  }
}

async function deletePurchaseAPI({ id }) {
  const resp = await axios.delete(`purchase/${id}`);
  return resp.data;
}

export function* deletePurchaseSaga({ payload }) {
  try {
    const purchase = yield call(deletePurchaseAPI, payload);
    yield put(deletePurchaseSuccess(purchase));
  } catch (e) {
    yield put(deletePurchaseFailed(e.message));
  }
}

async function getPurchaseAPI() {
  const resp = await axios.get("purchase");
  return resp.data;
}

export function* getPurchaseSaga() {
  try {
    const purchases = yield call(getPurchaseAPI);
    yield put(getPurchaseSuccess(purchases));
  } catch (e) {
    yield put(getPurchaseFailed(e.message));
  }
}

export function* watchPurchaseSaga() {
  yield takeEvery(addPurchaseRequest, addPurchaseSaga);
  yield takeEvery(getPurchaseRequest, getPurchaseSaga);
  yield takeEvery(editPurchaseRequest, editPurchaseSaga);
  yield takeEvery(deletePurchaseRequest, deletePurchaseSaga);
}
