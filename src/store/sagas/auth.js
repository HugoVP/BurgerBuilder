import axios from 'axios'
import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import {
  checkAuthTimeout,
  logout,
  logoutSuccess,
  authStart,
  authSuccess,
  authFail,
} from '../actions';

import {signUpUrl, signInUrl} from '../../axios-auth'

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');

  yield put(logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime);
  yield put(logout());
}

export function* authUserSaga({email, password, isSignup}) {
  yield put(authStart());

  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  const url = isSignup ? signUpUrl : signInUrl;    

  try {
    const response = yield axios.post(url, authData);
    const {idToken, localId, expiresIn} = yield response.data;
    
    yield localStorage.token = response.data.idToken
    yield localStorage.expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.userId = response.data.localId;
    
    yield put(authSuccess(idToken, localId));
    yield put(checkAuthTimeout(expiresIn * 1000));
  }
  catch (err) {
    yield put(authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const { token, userId } = yield localStorage;

  if (!token) {
    yield put(logout());
  } else {
    const expirationDate = yield new Date(localStorage.expirationDate);

    if (expirationDate <= new Date()) {
      yield put(logout());
    } else {
      yield put(authSuccess(token, userId));
      yield put(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
    }
  }
}