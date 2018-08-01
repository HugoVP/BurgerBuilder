import axios from 'axios'

import {signUpUrl, signInUrl} from '../../axios-auth'
import * as actionTypes from './actionTypes'

export function authStart() {
  return {
    type: actionTypes.AUTH_START,
  };
}

export function authSuccess(idToken, userId) {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
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
    type: actionTypes.AUTH_LOGOUT,
  }
}

export function checkAuthTimeout(expirationTime) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
        console.log(response);
        
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error))
      });
  };
}