import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes'

export function* logoutSaga(action) {
  yield delete localStorage.token;
  yield delete localStorage.expirationDate;
  yield delete localStorage.userId;

  yield put({
    type: actionTypes.AUTH_LOGOUT,
  });
}