import { call, put, takeEvery } from "redux-saga/effects";
import {
  addProductRequest,
  addProductSuccess,
  addProductFailed,
  getProductRequest,
  getProductSuccess,
  getProductFailed,
  editProductRequest,
  editProductSuccess,
  editProductFailed,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailed,
} from "./index";
import axios from "../axios";

async function addProductAPI(payload) {
  const resp = await axios.post("products", payload);
  return resp.data;
}

export function* addProductSaga({ payload }) {
  try {
    const product = yield call(addProductAPI, payload);
    yield put(addProductSuccess(product));
    yield put(getProductRequest());
  } catch (e) {
    yield put(addProductFailed(e.message));
  }
}

async function editProductAPI({ id, name, SKU, price }) {
  const resp = await axios.post(`products/${id}`, { name, SKU, price });
  return resp.data;
}

export function* editProductSaga({ payload }) {
  try {
    const product = yield call(editProductAPI, payload);
    yield put(editProductSuccess(product));
  } catch (e) {
    yield put(editProductFailed(e.message));
  }
}

async function deleteProductAPI({ id }) {
  const resp = await axios.delete(`products/${id}`);
  return resp.data;
}

export function* deleteProductSaga({ payload }) {
  try {
    const product = yield call(deleteProductAPI, payload);
    yield put(deleteProductSuccess(product));
  } catch (e) {
    yield put(deleteProductFailed(e.message));
  }
}

async function getProductAPI() {
  const resp = await axios.get("products");
  return resp.data;
}

export function* getProductSaga() {
  try {
    const products = yield call(getProductAPI);
    yield put(getProductSuccess(products));
  } catch (e) {
    yield put(getProductFailed(e.message));
  }
}

export function* watchProductSaga() {
  yield takeEvery(addProductRequest, addProductSaga);
  yield takeEvery(getProductRequest, getProductSaga);
  yield takeEvery(editProductRequest, editProductSaga);
  yield takeEvery(deleteProductRequest, deleteProductSaga);
}
