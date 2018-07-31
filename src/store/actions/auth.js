import axios from 'axios'

import {signUpUrl, signInUrl} from '../../axios-auth'
import * as actionTypes from './actionTypes'

export function authStart() {
  return {
    type: actionTypes.AUTH_START,
  };
}

export function authSuccess(authData) {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  };
}

export function authFail(error) {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
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
        dispatch(authSuccess(response.data))
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error))
      });
  };
}