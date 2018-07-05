import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export function purchaseBurgerSuccess(orderId, orderData) {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData,
  };
}

export function purchaseBurgerFail(error) {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
}

export function purchaseBurgerStart() {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
}

export function purchaseBurger(orderData) {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    
    axios.post('/orders.json', orderData)
      .then(({data}) => {
        console.log(orderData);
        dispatch(purchaseBurgerSuccess(data.name, orderData))
      })
      .catch((error) => {
        purchaseBurgerFail(error);
      })
  };
}