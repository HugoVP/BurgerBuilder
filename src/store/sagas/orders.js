import { put } from 'redux-saga/effects';

import axios from '../../axios-orders'

import {
  purchaseBurgerStart,
  purchaseBurgerSuccess,
  purchaseBurgerFail,
  fetchOrderStart,
  fetchOrdersSuccess,
  fetchOrdersFail,
} from "../actions";

export function* purchaseBurgerSaga({orderData, token}) {
  yield put(purchaseBurgerStart());
  
  try {
    const { data } = yield axios.post(`/orders.json?auth=${token}`, orderData);
    yield put(purchaseBurgerSuccess(data.name, orderData));
  }

  catch (error) {
    yield put(purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga({token, userId}) {
  yield put(fetchOrderStart());
  const queryParams = `auth=${token}&orderBy="userId"&equalTo="${userId}"`;

  try {
    const { data } = yield axios.get(`/orders.json?${queryParams}`);
    
    const orders = Object.keys(data).map((key) => ({
      ...data[key],
      id: key,
    }));
    
    yield put(fetchOrdersSuccess(orders));
  }

  catch (error) {
    yield put(fetchOrdersFail(error));
  }}