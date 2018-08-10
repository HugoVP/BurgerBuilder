import axios from 'axios'

import {signUpUrl, signInUrl} from '../../axios-auth'
import * as actionTypes from './actionTypes'

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
  delete localStorage.token;
  delete localStorage.expirationDate;
  
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export function checkAuthTimeout(expirationTime) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
}


export function auth(email, password, isSignup) {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    const url = isSignup ? signUpUrl : signInUrl;
    
    axios.post(url, authData)
      .then((response) => {
        const {idToken, localId, expiresIn} = response.data;
        localStorage.token = idToken
        localStorage.expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        localStorage.userId = localId;
        dispatch(authSuccess(idToken, localId));
        dispatch(checkAuthTimeout(expiresIn * 1000));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error))
      });
  };
}

export function setAuthRedirectPath(authRedirectPath) {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    authRedirectPath,
  };
}

export function authCheckState() {
  return (dispatch) => {
    const { token, userId } = localStorage;

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.expirationDate);

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
      }
    }
  };
}