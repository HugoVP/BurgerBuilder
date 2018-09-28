import * as actionTypes from './actionTypes';

export function authStart() {
  return {
    type: actionTypes.AUTH_START,
  };
}

export function authSuccess(token, userId) {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
}

export function authFail(error) {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
}

export function logout() {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  }
}

export function logoutSuccess() {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export function checkAuthTimeout(expirationTime) {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime,
  };
}


export function auth(email, password, isSignup) {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignup,
  };
}

export function setAuthRedirectPath(authRedirectPath) {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    authRedirectPath,
  };
}

export function authCheckState() {
  return {
    type: actionTypes.AUTH_CHECK_STATE,
  };
}